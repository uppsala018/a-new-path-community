import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
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

type UsageEventRow = {
  id: string;
  event_type: string;
  session_id: string;
  user_id: string | null;
  user_email: string | null;
  user_handle: string | null;
  path: string | null;
  route: string | null;
  method: string | null;
  status_code: number | null;
  duration_ms: number | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export type UsageEventInput = {
  eventType: "page_view" | "page_leave" | "api_request";
  sessionId: string;
  userId?: string | null;
  userEmail?: string | null;
  userHandle?: string | null;
  path?: string | null;
  route?: string | null;
  method?: string | null;
  statusCode?: number | null;
  durationMs?: number | null;
  referrer?: string | null;
  userAgent?: string | null;
};

export type AdminUsageOverview = {
  pageViewsToday: number;
  pageLeavesToday: number;
  apiRequestsToday: number;
  totalActiveMinutesToday: number;
  distinctVisitorsToday: number;
  topPagesToday: {
    path: string;
    views: number;
    minutes: number;
  }[];
  topVisitorsToday: {
    label: string;
    key: string;
    views: number;
    minutes: number;
    apiRequests: number;
    lastSeenAt: string;
    isAdmin: boolean;
  }[];
  recentApiRoutesToday: {
    route: string;
    count: number;
    lastStatusCode: number | null;
  }[];
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

function getStartOfTodayIso() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString();
}

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return null;
  }

  for (const item of cookieHeader.split(";")) {
    const [rawKey, ...rawValue] = item.trim().split("=");
    if (rawKey === name) {
      return decodeURIComponent(rawValue.join("="));
    }
  }

  return null;
}

function sanitizeProfile(profile: ProfileRow, isAdmin = false): MemberProfile {
  return {
    id: profile.id,
    email: profile.email,
    handle: profile.handle,
    createdAt: profile.created_at,
    isAdmin
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

  return sanitizeProfile(data as ProfileRow, isAdminEmail(input.email));
}

export async function recordUsageEvent(input: UsageEventInput) {
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("usage_events").insert({
    event_type: input.eventType,
    session_id: input.sessionId,
    user_id: input.userId || null,
    user_email: input.userEmail || null,
    user_handle: input.userHandle || null,
    path: input.path || null,
    route: input.route || null,
    method: input.method || null,
    status_code: input.statusCode ?? null,
    duration_ms: input.durationMs ?? null,
    referrer: input.referrer || null,
    user_agent: input.userAgent || null
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function recordApiRequest(input: {
  request: Request;
  route: string;
  statusCode: number;
  user?: MemberProfile | null;
  durationMs?: number;
}) {
  try {
    const cookieHeader = input.request.headers.get("cookie");
    const sessionId =
      getCookieValue(cookieHeader, "hh_usage_session") ||
      input.user?.id ||
      crypto.randomUUID();

    await recordUsageEvent({
      eventType: "api_request",
      sessionId,
      userId: input.user?.id || null,
      userEmail: input.user?.email || null,
      userHandle: input.user?.handle || null,
      route: input.route,
      method: input.request.method,
      statusCode: input.statusCode,
      durationMs: input.durationMs ?? null,
      userAgent: input.request.headers.get("user-agent")
    });
  } catch {
    // Analytics must not block auth or saving flows.
  }
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
    profile = sanitizeProfile(existingProfile as ProfileRow, isAdminEmail(user.email));
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

function summarizeUsageEvents(rows: UsageEventRow[]): AdminUsageOverview {
  const topPages = new Map<string, { views: number; minutes: number }>();
  const topVisitors = new Map<
    string,
    {
      label: string;
      key: string;
      views: number;
      minutes: number;
      apiRequests: number;
      lastSeenAt: string;
      isAdmin: boolean;
    }
  >();
  const recentApiRoutes = new Map<
    string,
    { count: number; lastStatusCode: number | null; lastSeenAt: string }
  >();

  let pageViewsToday = 0;
  let pageLeavesToday = 0;
  let apiRequestsToday = 0;
  let totalActiveMinutesToday = 0;

  for (const row of rows) {
    const visitorKey = row.user_id || row.session_id;
    const visitorLabel = row.user_handle || row.user_email || `Anonymous ${row.session_id.slice(0, 8)}`;
    const visitor = topVisitors.get(visitorKey) || {
      label: visitorLabel,
      key: visitorKey,
      views: 0,
      minutes: 0,
      apiRequests: 0,
      lastSeenAt: row.created_at,
      isAdmin: Boolean(row.user_email && isAdminEmail(row.user_email))
    };

    visitor.lastSeenAt = row.created_at > visitor.lastSeenAt ? row.created_at : visitor.lastSeenAt;

    if (row.event_type === "page_view") {
      pageViewsToday += 1;
      visitor.views += 1;
      if (row.path) {
        const current = topPages.get(row.path) || { views: 0, minutes: 0 };
        current.views += 1;
        topPages.set(row.path, current);
      }
    }

    if (row.event_type === "page_leave") {
      pageLeavesToday += 1;
      visitor.minutes += (row.duration_ms || 0) / 60000;
      totalActiveMinutesToday += (row.duration_ms || 0) / 60000;
      if (row.path) {
        const current = topPages.get(row.path) || { views: 0, minutes: 0 };
        current.minutes += (row.duration_ms || 0) / 60000;
        topPages.set(row.path, current);
      }
    }

    if (row.event_type === "api_request") {
      apiRequestsToday += 1;
      visitor.apiRequests += 1;
      if (row.route) {
        const current = recentApiRoutes.get(row.route) || {
          count: 0,
          lastStatusCode: null,
          lastSeenAt: row.created_at
        };
        current.count += 1;
        current.lastStatusCode = row.status_code;
        current.lastSeenAt = row.created_at > current.lastSeenAt ? row.created_at : current.lastSeenAt;
        recentApiRoutes.set(row.route, current);
      }
    }

    topVisitors.set(visitorKey, visitor);
  }

  return {
    pageViewsToday,
    pageLeavesToday,
    apiRequestsToday,
    totalActiveMinutesToday: Number(totalActiveMinutesToday.toFixed(1)),
    distinctVisitorsToday: topVisitors.size,
    topPagesToday: [...topPages.entries()]
      .map(([path, stats]) => ({
        path,
        views: stats.views,
        minutes: Number(stats.minutes.toFixed(1))
      }))
      .sort((a, b) => b.views - a.views || b.minutes - a.minutes)
      .slice(0, 8),
    topVisitorsToday: [...topVisitors.values()]
      .sort((a, b) => b.minutes - a.minutes || b.views - a.views)
      .slice(0, 10),
    recentApiRoutesToday: [...recentApiRoutes.entries()]
      .map(([route, stats]) => ({
        route,
        count: stats.count,
        lastStatusCode: stats.lastStatusCode
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
  };
}

export async function getAdminDashboardData() {
  const supabase = createServiceRoleClient();

  const [
    profilesResult,
    progressResult,
    forumPostsResult,
    submissionsResult,
    usageResult
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("member_progress").select("user_id", { count: "exact", head: true }),
    supabase.from("forum_posts").select("id", { count: "exact", head: true }),
    supabase
      .from("interest_submissions")
      .select("id, email, preferred_path, message, submitted_at")
      .order("submitted_at", { ascending: false })
      .limit(8),
    supabase
      .from("usage_events")
      .select(
        "id, event_type, session_id, user_id, user_email, user_handle, path, route, method, status_code, duration_ms, referrer, user_agent, created_at"
      )
      .gte("created_at", getStartOfTodayIso())
      .order("created_at", { ascending: false })
      .limit(2000)
  ]);

  const [profilesCount, progressCount, forumPostsCount] = [
    profilesResult.count || 0,
    progressResult.count || 0,
    forumPostsResult.count || 0
  ];

  if (submissionsResult.error) {
    throw new Error(submissionsResult.error.message);
  }

  if (usageResult.error) {
    throw new Error(usageResult.error.message);
  }

  return {
    profilesCount,
    progressCount,
    forumPostsCount,
    recentInterestSubmissions: (submissionsResult.data || []) as {
      id: string;
      email: string;
      preferred_path: string;
      message: string;
      submitted_at: string;
    }[],
    usage: summarizeUsageEvents((usageResult.data || []) as UsageEventRow[])
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
