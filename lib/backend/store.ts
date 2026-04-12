import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createDefaultStepProgress,
  type ForumReply,
  type ForumPost,
  type MemberProfile,
  type StepProgress
} from "@/lib/member-state";

export const MEMBER_UPLOAD_BUCKET = "member-uploads";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1)
});

type InterestSubmission = {
  id: string;
  email: string;
  preferred_path: string;
  message: string;
  submitted_at: string;
};

type ProfileRow = {
  id: string;
  email: string;
  handle: string;
  created_at: string;
};

type ProgressRow = {
  user_id: string;
  progress: Omit<StepProgress, "forumPosts">;
  updated_at: string;
};

type ForumPostRow = {
  id: string;
  user_id: string;
  author_handle: string;
  channel: string;
  message: string;
  parent_post_id: string | null;
  created_at: string;
};

function getSupabaseEnv() {
  return envSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
  });
}

function createServiceRoleClient() {
  const env = getSupabaseEnv();

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

function sanitizeProfile(profile: ProfileRow): MemberProfile {
  return {
    id: profile.id,
    email: profile.email,
    handle: profile.handle,
    createdAt: profile.created_at
  };
}

function normalizeProgress(progress: Partial<StepProgress> | null | undefined): StepProgress {
  const base = createDefaultStepProgress();

  return {
    ...base,
    ...(progress || {}),
    completedSteps: progress?.completedSteps || base.completedSteps,
    modules: progress?.modules || base.modules,
    uploads: progress?.uploads || base.uploads,
    checkInHistory: progress?.checkInHistory || base.checkInHistory,
    forumPosts: base.forumPosts
  };
}

function mapForumPosts(rows: ForumPostRow[]): ForumPost[] {
  const repliesByParent = new Map<string, ForumReply[]>();
  const topLevelPosts: ForumPost[] = [];

  for (const row of rows) {
    if (row.parent_post_id) {
      const reply: ForumReply = {
        id: row.id,
        author: row.author_handle,
        message: row.message,
        createdAt: row.created_at,
        parentPostId: row.parent_post_id
      };

      const existingReplies = repliesByParent.get(row.parent_post_id) || [];
      existingReplies.push(reply);
      repliesByParent.set(row.parent_post_id, existingReplies);
      continue;
    }

    topLevelPosts.push({
      id: row.id,
      author: row.author_handle,
      channel: row.channel,
      message: row.message,
      createdAt: row.created_at,
      replies: []
    });
  }

  return topLevelPosts
    .map((post) => ({
      ...post,
      replies: (repliesByParent.get(post.id) || []).sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      )
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function listForumPosts() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("forum_posts")
    .select("id, user_id, author_handle, channel, message, parent_post_id, created_at")
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) {
    throw new Error(error.message);
  }

  return mapForumPosts((data || []) as ForumPostRow[]);
}

export async function createInterestSubmission(input: {
  email: string;
  path: string;
  message: string;
}) {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("interest_submissions")
    .insert({
      email: input.email.trim().toLowerCase(),
      preferred_path: input.path.trim(),
      message: input.message.trim()
    })
    .select("id, email, preferred_path, message, submitted_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as InterestSubmission;
}

export async function upsertProfileForUser(input: {
  id: string;
  email: string;
  handle: string;
}) {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: input.id,
      email: input.email.trim().toLowerCase(),
      handle: input.handle.trim() || "anonymous-member"
    })
    .select("id, email, handle, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return sanitizeProfile(data as ProfileRow);
}

export async function getCurrentSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const serviceClient = createServiceRoleClient();

  let profile: MemberProfile;
  const { data: existingProfile } = await serviceClient
    .from("profiles")
    .select("id, email, handle, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (existingProfile) {
    profile = sanitizeProfile(existingProfile as ProfileRow);
  } else {
    profile = await upsertProfileForUser({
      id: user.id,
      email: user.email || "",
      handle:
        String(user.user_metadata.handle || "").trim() ||
        user.email?.split("@")[0]?.replace(/[^a-zA-Z0-9_-]/g, "") ||
        "anonymous-member"
    });
  }

  const { data: progressRow } = await serviceClient
    .from("member_progress")
    .select("user_id, progress, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  const progress = normalizeProgress((progressRow as ProgressRow | null)?.progress);
  progress.forumPosts = await listForumPosts();

  return {
    user: profile,
    progress
  };
}

export async function requireCurrentSession() {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function saveProgress(userId: string, progress: StepProgress) {
  const supabase = createServiceRoleClient();
  const { forumPosts: _forumPosts, ...progressPayload } = progress;

  const { error } = await supabase.from("member_progress").upsert({
    user_id: userId,
    progress: progressPayload,
    updated_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(error.message);
  }

  const nextProgress = normalizeProgress(progressPayload);
  nextProgress.forumPosts = await listForumPosts();
  return nextProgress;
}

export async function appendUpload(userId: string, stepNumber: number, labels: string[]) {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("member_progress")
    .select("user_id, progress, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const currentProgress = normalizeProgress((data as ProgressRow | null)?.progress);
  currentProgress.uploads[stepNumber] = [
    ...(currentProgress.uploads[stepNumber] || []),
    ...labels
  ];

  return saveProgress(userId, currentProgress);
}

export async function uploadFilesForUser(input: {
  userId: string;
  stepNumber: number;
  files: File[];
}) {
  const supabase = createServiceRoleClient();
  const labels: string[] = [];

  for (const file of input.files) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const storagePath = `${input.userId}/step-${input.stepNumber}/${Date.now()}-${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from(MEMBER_UPLOAD_BUCKET)
      .upload(storagePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false
      });

    if (error) {
      throw new Error(error.message);
    }

    labels.push(file.name);
  }

  return appendUpload(input.userId, input.stepNumber, labels);
}

export async function addForumPost(input: {
  userId: string;
  authorHandle: string;
  channel: string;
  message: string;
  parentPostId?: string;
}) {
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("forum_posts").insert({
    user_id: input.userId,
    author_handle: input.authorHandle,
    channel: input.channel,
    message: input.message.trim(),
    parent_post_id: input.parentPostId || null
  });

  if (error) {
    throw new Error(error.message);
  }

  return listForumPosts();
}
