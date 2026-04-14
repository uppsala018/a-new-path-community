import type { ProgramStep } from "@/lib/program-data";

export type StepModuleState = {
  promptResponses: string[];
  reflectionResponse: string;
  quizResponses: string[];
  quizPassed: boolean;
  quizCompletedAt?: string;
  readiness: "starting" | "working" | "ready";
  wantsSponsorFollowUp: boolean;
  lastUpdatedAt?: string;
};

export type CheckInEntry = {
  id: string;
  createdAt: string;
  mood: string;
  honesty: string;
  targetBehaviorToday: string;
};

export type ForumReply = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  parentPostId: string;
};

export type ForumPost = {
  id: string;
  author: string;
  channel: string;
  message: string;
  createdAt: string;
  replies: ForumReply[];
};

export type StepProgress = {
  completedSteps: number[];
  modules: Record<number, StepModuleState>;
  uploads: Record<number, string[]>;
  mood: string;
  honesty: string;
  targetBehaviorToday: string;
  checkInHistory: CheckInEntry[];
  forumPosts: ForumPost[];
};

export type MemberProfile = {
  id: string;
  email: string;
  handle: string;
  createdAt: string;
  isAdmin?: boolean;
};

export function createEmptyModule(
  step: Pick<ProgramStep, "prompts" | "quiz">
): StepModuleState {
  return {
    promptResponses: step.prompts.map(() => ""),
    reflectionResponse: "",
    quizResponses: step.quiz ? step.quiz.questions.map(() => "") : [],
    quizPassed: !step.quiz,
    readiness: "starting",
    wantsSponsorFollowUp: false
  };
}

export function createDefaultStepProgress(): StepProgress {
  return {
    completedSteps: [],
    modules: {},
    uploads: {},
    mood: "",
    honesty: "",
    targetBehaviorToday: "",
    checkInHistory: [],
    forumPosts: [
      {
        id: "post-1",
        author: "QuietHarbor",
        channel: "Step Questions",
        message:
          "I finally wrote my Step 1 inventory without softening the truth. That alone changed something.",
        createdAt: new Date("2026-04-10T18:00:00Z").toISOString(),
        replies: [
          {
            id: "reply-1",
            author: "NorthLight",
            message: "That kind of honesty is hard. It makes sense that it changed the tone of the work.",
            createdAt: new Date("2026-04-10T18:30:00Z").toISOString(),
            parentPostId: "post-1"
          }
        ]
      },
      {
        id: "post-2",
        author: "NorthLight",
        channel: "Meeting Circle",
        message: "A weekly Teams option in the evening would help me stay consistent.",
        createdAt: new Date("2026-04-10T19:00:00Z").toISOString(),
        replies: []
      }
    ]
  };
}
