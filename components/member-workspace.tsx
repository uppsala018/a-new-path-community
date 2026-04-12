"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  communityChannels,
  meetingSchedule,
  programSteps
} from "@/lib/program-data";
import {
  createEmptyModule,
  type MemberProfile,
  type StepModuleState,
  type StepProgress
} from "@/lib/member-state";

type MemberWorkspaceProps = {
  initialProfile: MemberProfile;
  initialProgress: StepProgress;
};

export function MemberWorkspace({
  initialProfile,
  initialProgress
}: MemberWorkspaceProps) {
  const router = useRouter();
  const [profile] = useState(initialProfile);
  const [progress, setProgress] = useState(initialProgress);
  const [activeStep, setActiveStep] = useState(1);
  const [newPost, setNewPost] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [channel, setChannel] = useState<string>(communityChannels[0].name);
  const [moduleMessage, setModuleMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [draftPromptResponses, setDraftPromptResponses] = useState<string[]>([]);
  const [draftReflectionResponse, setDraftReflectionResponse] = useState("");
  const [draftQuizResponses, setDraftQuizResponses] = useState<string[]>([]);
  const [draftSponsorFollowUp, setDraftSponsorFollowUp] = useState(false);
  const [draftDirty, setDraftDirty] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    wrongItems: {
      index: number;
      selectedAnswer: string;
      correctAnswer: string;
    }[];
  } | null>(null);

  async function persistProgress(nextProgress: StepProgress) {
    setSaving(true);
    setProgress(nextProgress);

    try {
      const response = await fetch("/api/member", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          progress: nextProgress
        })
      });

      const payload = (await response.json()) as {
        progress?: StepProgress;
        error?: string;
      };

      if (!response.ok || !payload.progress) {
        setModuleMessage(payload.error || "Unable to save member progress.");
        return;
      }

      setProgress(payload.progress);
    } catch {
      setModuleMessage("The server could not be reached while saving.");
    } finally {
      setSaving(false);
    }
  }

  const availableStep = useMemo(() => {
    return programSteps.find((step) => step.number === activeStep) || programSteps[0];
  }, [activeStep]);

  const currentUnlockedStep = useMemo(() => {
    if (progress.completedSteps.length === 0) {
      return 1;
    }

    return Math.min(Math.max(...progress.completedSteps) + 1, programSteps.length);
  }, [progress.completedSteps]);

  function isStepUnlocked(stepNumber: number) {
    return stepNumber <= currentUnlockedStep;
  }

  const activeModule = useMemo(() => {
    return progress.modules[availableStep.number] || createEmptyModule(availableStep);
  }, [availableStep, progress.modules]);

  const quizDefinition = availableStep.quiz;
  const quizRequired = Boolean(quizDefinition);
  const quizPassed = activeModule.quizPassed;

  const completedPromptCount = useMemo(() => {
    return draftPromptResponses.filter((response) => response.trim().length >= 20).length;
  }, [draftPromptResponses]);

  const reflectionReady = draftReflectionResponse.trim().length >= 30;

  const draftReadiness = useMemo(() => {
    if (
      (!quizRequired || quizPassed) &&
      completedPromptCount === availableStep.prompts.length &&
      reflectionReady
    ) {
      return "ready";
    }

    if (
      draftQuizResponses.some((response) => response) ||
      completedPromptCount > 0 ||
      draftReflectionResponse.trim().length > 0 ||
      draftSponsorFollowUp
    ) {
      return "working";
    }

    return "starting";
  }, [
    availableStep.prompts.length,
    completedPromptCount,
    draftReflectionResponse,
    draftQuizResponses,
    draftSponsorFollowUp,
    quizPassed,
    quizRequired,
    reflectionReady
  ]);

  useEffect(() => {
    const module = progress.modules[availableStep.number] || createEmptyModule(availableStep);
    const nextQuizResponses = quizDefinition
      ? quizDefinition.questions.map((_, index) => module.quizResponses[index] || "")
      : [];

    setDraftPromptResponses(
      availableStep.prompts.map((_, index) => module.promptResponses[index] || "")
    );
    setDraftReflectionResponse(module.reflectionResponse);
    setDraftQuizResponses(nextQuizResponses);
    setDraftSponsorFollowUp(module.wantsSponsorFollowUp);
    setDraftDirty(false);
    setQuizResult(null);
  }, [availableStep, progress.modules, quizDefinition]);

  function buildUpdatedModule(
    stepNumber: number,
    updater: (module: StepModuleState) => StepModuleState
  ) {
    const step = programSteps.find((entry) => entry.number === stepNumber);
    if (!step) {
      return null;
    }

    const currentModule = progress.modules[stepNumber] || createEmptyModule(step);
    const nextModule = updater(currentModule);

    return {
      ...progress,
      modules: {
        ...progress.modules,
        [stepNumber]: {
          ...nextModule,
          lastUpdatedAt: new Date().toISOString()
        }
      }
    } satisfies StepProgress;
  }

  function updatePromptResponse(promptIndex: number, value: string) {
    setDraftPromptResponses((current) => {
      const next = [...current];
      next[promptIndex] = value;
      return next;
    });
    setDraftDirty(true);
  }

  function updateReflection(value: string) {
    setDraftReflectionResponse(value);
    setDraftDirty(true);
  }

  function updateQuizResponse(questionIndex: number, answer: string) {
    setDraftQuizResponses((current) => {
      const next = [...current];
      next[questionIndex] = answer;
      return next;
    });
    setDraftDirty(true);
    setQuizResult(null);
  }

  function updateSponsorFlag(wantsSponsorFollowUp: boolean) {
    setDraftSponsorFollowUp(wantsSponsorFollowUp);
    setDraftDirty(true);
  }

  function saveCurrentDraft(stepNumber: number) {
    const nextProgress = buildUpdatedModule(stepNumber, (module) => ({
      ...module,
      promptResponses: draftPromptResponses,
      reflectionResponse: draftReflectionResponse,
      quizResponses: draftQuizResponses,
      quizPassed: module.quizPassed,
      quizCompletedAt: module.quizCompletedAt,
      wantsSponsorFollowUp: draftSponsorFollowUp,
      readiness: draftReadiness
    }));

    if (!nextProgress) {
      return;
    }

    setDraftDirty(false);
    setModuleMessage("Draft saved. You can leave now and continue this step later.");
    void persistProgress(nextProgress);
  }

  function handleMockUpload(stepNumber: number, event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) {
      return;
    }

    const formData = new FormData();
    formData.set("stepNumber", String(stepNumber));
    for (const file of selectedFiles) {
      formData.append("files", file);
    }

    setSaving(true);

    fetch("/api/member/uploads", {
      method: "POST",
      body: formData
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          progress?: StepProgress;
          error?: string;
        };

        if (!response.ok || !payload.progress) {
          setModuleMessage(payload.error || "Unable to save the upload.");
          return;
        }

        setProgress(payload.progress);
        setModuleMessage(`${selectedFiles.length} file(s) stored on the server for this step.`);
      })
      .catch(() => {
        setModuleMessage("The server could not be reached while uploading.");
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function submitStep(stepNumber: number) {
    if (progress.completedSteps.includes(stepNumber)) {
      return;
    }

    const step = programSteps.find((entry) => entry.number === stepNumber);
    if (!step) {
      return;
    }

    if (step.quiz && !activeModule.quizPassed) {
      setModuleMessage(
        "Pass the Step 1 video check before the assignment prompts can be completed."
      );
      return;
    }

    const promptCount = draftPromptResponses.filter((response) => response.trim().length >= 20).length;
    const hasReflection = draftReflectionResponse.trim().length >= 30;

    if (promptCount !== step.prompts.length || !hasReflection) {
      setModuleMessage(
        "Complete each assignment prompt and the reflection before unlocking the next step."
      );
      return;
    }

    const nextProgress = buildUpdatedModule(stepNumber, (module) => ({
      ...module,
      promptResponses: draftPromptResponses,
      reflectionResponse: draftReflectionResponse,
      quizResponses: draftQuizResponses,
      quizPassed: module.quizPassed,
      quizCompletedAt: module.quizCompletedAt,
      wantsSponsorFollowUp: draftSponsorFollowUp,
      readiness: "ready"
    }));

    if (!nextProgress) {
      return;
    }

    nextProgress.completedSteps = [...progress.completedSteps, stepNumber].sort((a, b) => a - b);

    setModuleMessage("Step completed. The next module is now available.");
    setDraftDirty(false);
    void persistProgress(nextProgress);

    if (stepNumber < programSteps.length) {
      setActiveStep(stepNumber + 1);
    }
  }

  function clearCurrentDraft(stepNumber: number) {
    const nextProgress: StepProgress = {
      ...progress,
      modules: {
        ...progress.modules,
        [stepNumber]: createEmptyModule(availableStep)
      },
      uploads: {
        ...progress.uploads,
        [stepNumber]: []
      }
    };

    setDraftPromptResponses(availableStep.prompts.map(() => ""));
    setDraftReflectionResponse("");
    setDraftQuizResponses(availableStep.quiz ? availableStep.quiz.questions.map(() => "") : []);
    setDraftSponsorFollowUp(false);
    setDraftDirty(false);
    setQuizResult(null);
    setModuleMessage("Draft cleared for this module.");
    void persistProgress(nextProgress);
  }

  function submitQuizCheck() {
    if (!quizDefinition) {
      return;
    }

    if (draftQuizResponses.some((answer) => !answer)) {
      setModuleMessage("Answer every quiz question before checking your results.");
      return;
    }

    const wrongItems = quizDefinition.questions
      .map((item, index) => ({
        index,
        selectedAnswer: draftQuizResponses[index],
        correctAnswer: item.correctAnswer
      }))
      .filter((item) => item.selectedAnswer !== item.correctAnswer);

    const score = quizDefinition.questions.length - wrongItems.length;
    const passed = score === quizDefinition.passingScore;

    const nextProgress = buildUpdatedModule(availableStep.number, (module) => ({
      ...module,
      promptResponses: draftPromptResponses,
      reflectionResponse: draftReflectionResponse,
      quizResponses: draftQuizResponses,
      quizPassed: passed,
      quizCompletedAt: passed ? new Date().toISOString() : module.quizCompletedAt,
      wantsSponsorFollowUp: draftSponsorFollowUp,
      readiness:
        passed &&
        completedPromptCount === availableStep.prompts.length &&
        reflectionReady
          ? "ready"
          : "working"
    }));

    if (!nextProgress) {
      return;
    }

    setQuizResult({ score, wrongItems });
    setDraftDirty(false);
    setModuleMessage(
      passed
        ? "Quiz passed. The assignment prompts are now open."
        : "Some answers were wrong. Review the corrections below, then try again."
    );
    void persistProgress(nextProgress);
  }

  function submitCheckIn() {
    if (
      !progress.mood.trim() &&
      !progress.honesty.trim() &&
      !progress.targetBehaviorToday.trim()
    ) {
      return;
    }

    const nextProgress: StepProgress = {
      ...progress,
      checkInHistory: [
        {
          id: `check-in-${Date.now()}`,
          createdAt: new Date().toISOString(),
          mood: progress.mood.trim(),
          honesty: progress.honesty.trim(),
          targetBehaviorToday: progress.targetBehaviorToday.trim()
        },
        ...progress.checkInHistory
      ].slice(0, 8)
    };

    setModuleMessage("Daily check-in saved.");
    void persistProgress(nextProgress);
  }

  function addForumPost() {
    if (!newPost.trim()) {
      return;
    }
    setSaving(true);

    fetch("/api/member/forum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        channel,
        message: newPost.trim()
      })
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          forumPosts?: StepProgress["forumPosts"];
          error?: string;
        };

        if (!response.ok || !payload.forumPosts) {
          setModuleMessage(payload.error || "Unable to save forum post.");
          return;
        }

        setProgress({
          ...progress,
          forumPosts: payload.forumPosts
        });
        setNewPost("");
        setModuleMessage("Community post saved.");
      })
      .catch(() => {
        setModuleMessage("The server could not be reached while saving the post.");
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function updateReplyDraft(postId: string, value: string) {
    setReplyDrafts((current) => ({
      ...current,
      [postId]: value
    }));
  }

  function submitReply(postId: string, channelName: string) {
    const message = (replyDrafts[postId] || "").trim();
    if (!message) {
      return;
    }

    setSaving(true);

    fetch("/api/member/forum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        channel: channelName,
        message,
        parentPostId: postId
      })
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          forumPosts?: StepProgress["forumPosts"];
          error?: string;
        };

        if (!response.ok || !payload.forumPosts) {
          setModuleMessage(payload.error || "Unable to save reply.");
          return;
        }

        setProgress({
          ...progress,
          forumPosts: payload.forumPosts
        });
        setReplyDrafts((current) => ({
          ...current,
          [postId]: ""
        }));
        setModuleMessage("Reply posted.");
      })
      .catch(() => {
        setModuleMessage("The server could not be reached while saving the reply.");
      })
      .finally(() => {
        setSaving(false);
      });
  }

  async function handleLogout() {
    setSaving(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      });
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <section className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          Member area
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">
          Welcome{profile.handle ? `, ${profile.handle}` : ""}.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
          This workspace saves your member progress on the server. You can work through
          a step over time, save a draft when you want to stop, come back later, keep a
          daily accountability trail, and post in the community preview.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Current unlock</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">Step {currentUnlockedStep}</p>
          </div>
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Completed</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {progress.completedSteps.length} / 12
            </p>
          </div>
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Member path</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">Self-guided + community</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-surface"
          >
            Log out
          </button>
          <p className="text-sm text-slate-600">
            {saving
              ? "Saving to server..."
              : draftDirty
                ? "You have unsaved changes in this step."
                : "Member progress is stored on the server."}
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <article className="rounded-[30px] border border-brand/10 bg-white/80 p-6 shadow-glow">
            <h2 className="text-2xl font-semibold text-slate-900">Step roadmap</h2>
            <div className="mt-5 space-y-3">
              {programSteps.map((step) => {
                const unlocked = isStepUnlocked(step.number);
                const complete = progress.completedSteps.includes(step.number);

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => unlocked && setActiveStep(step.number)}
                    className={`w-full rounded-[22px] border px-4 py-4 text-left ${
                      activeStep === step.number
                        ? "border-brand bg-brand/10"
                        : unlocked
                          ? "border-brand/10 bg-surface/90 hover:border-brand/25"
                          : "border-slate-200 bg-slate-100/80 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em]">
                        Step {step.number}
                      </p>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                          complete
                            ? "bg-brand text-white"
                            : step.status === "private"
                              ? "bg-accent text-white"
                              : unlocked
                                ? "bg-white text-brand-dark"
                                : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {complete ? "Completed" : unlocked ? "Open" : "Locked"}
                      </span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-2 text-sm leading-6">{step.summary}</p>
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-[30px] border border-brand/10 bg-brand-dark p-6 text-white shadow-glow">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-soft">
              Meeting cycles
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Zoom or Teams cohorts</h2>
            <div className="mt-5 space-y-3">
              {meetingSchedule.map((meeting) => (
                <div key={meeting.title} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="font-semibold text-white">{meeting.title}</p>
                  <p className="mt-1 text-sm text-white/80">{meeting.time}</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">{meeting.focus}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>

        <div className="space-y-6">
          <article className="rounded-[30px] border border-brand/10 bg-white/80 p-7 shadow-glow">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                  Current module
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Step {availableStep.number}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
                  {availableStep.title}
                </h2>
                <div className="mt-6 rounded-[28px] border border-brand/15 bg-surface/90 px-6 py-7 shadow-glow">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-dark">
                    Step Statement
                  </p>
                  <p className="mt-4 text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
                    {availableStep.statement}
                  </p>
                </div>
                {availableStep.number === 1 ? (
                  <div className="mt-6 rounded-[28px] border border-brand/15 bg-white/90 p-5 shadow-glow">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                      Step 1 Video Teaching
                    </p>
                    <video
                      className="mt-4 w-full rounded-[22px] border border-brand/10 bg-slate-950"
                      controls
                      preload="metadata"
                    >
                      <source src="/Understanding_Step_1.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : null}
                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  {availableStep.summary}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                    progress.completedSteps.includes(availableStep.number)
                      ? "bg-brand text-white"
                      : availableStep.status === "private"
                        ? "bg-accent text-white"
                        : "bg-brand/10 text-brand-dark"
                  }`}
                >
                  {progress.completedSteps.includes(availableStep.number)
                    ? "Completed"
                    : availableStep.status === "private"
                      ? "Private"
                      : "Open"}
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {draftReadiness === "ready"
                    ? "Ready to submit"
                    : draftReadiness === "working"
                      ? "In progress"
                      : "Not started"}
                </span>
              </div>
            </div>

            {quizDefinition ? (
              <div className="mt-6 rounded-[28px] border border-brand/15 bg-white/90 p-6 shadow-glow">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                      {quizDefinition.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                      Watch the video, then answer all 10 questions
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                      You must answer every question correctly before the Step 1 assignment
                      prompts open. If anything is wrong, the quiz will show what to correct.
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-brand/10 bg-surface/90 px-4 py-3 text-sm">
                    <p className="font-semibold text-slate-900">
                      {quizPassed ? "Quiz passed" : "Quiz not passed yet"}
                    </p>
                    <p className="mt-1 text-slate-600">
                      {draftQuizResponses.filter(Boolean).length} / {quizDefinition.questions.length} answered
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {quizDefinition.questions.map((item, questionIndex) => (
                    <div key={item.question} className="rounded-[24px] border border-brand/10 bg-surface/80 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Question {questionIndex + 1}
                      </p>
                      <p className="mt-2 text-lg font-semibold leading-8 text-slate-900">
                        {item.question}
                      </p>
                      <div className="mt-4 space-y-3">
                        {item.options.map((option) => {
                          const optionLetter = option.split(".")[0];
                          const checked = draftQuizResponses[questionIndex] === optionLetter;

                          return (
                            <label
                              key={option}
                              className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 text-sm leading-7 transition ${
                                checked
                                  ? "border-brand bg-white text-slate-900"
                                  : "border-brand/10 bg-white/80 text-slate-700 hover:border-brand/25"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`step-quiz-${questionIndex}`}
                                checked={checked}
                                onChange={() => updateQuizResponse(questionIndex, optionLetter)}
                                className="mt-1"
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={submitQuizCheck}
                    className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
                  >
                    Check quiz answers
                  </button>
                  {quizPassed ? (
                    <p className="text-sm font-semibold text-emerald-700">
                      Step 1 quiz passed. You can now work on the assignments below.
                    </p>
                  ) : (
                    <p className="text-sm text-slate-600">
                      A perfect score is required before the assignment section opens.
                    </p>
                  )}
                </div>

                {quizResult ? (
                  <div className="mt-6 rounded-[24px] border border-brand/10 bg-surface/90 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                      Quiz result
                    </p>
                    <p className="mt-3 text-xl font-semibold text-slate-900">
                      Score: {quizResult.score} / {quizDefinition.questions.length}
                    </p>
                    {quizResult.wrongItems.length ? (
                      <div className="mt-4 space-y-3">
                        {quizResult.wrongItems.map((item) => (
                          <div key={item.index} className="rounded-2xl bg-white px-4 py-4 text-sm leading-7 text-slate-700">
                            <p className="font-semibold text-slate-900">
                              Question {item.index + 1} needs another look
                            </p>
                            <p className="mt-2">
                              Your answer: {item.selectedAnswer || "No answer selected"}
                            </p>
                            <p className="mt-1">
                              Correct answer: {item.correctAnswer}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm leading-7 text-slate-700">
                        You answered every question correctly.
                      </p>
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                  Teaching
                </p>
                <p className="mt-3 whitespace-pre-line text-sm leading-8 text-slate-600">
                  {availableStep.teaching}
                </p>
              </div>
              <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                  Reflection question
                </p>
                <p className="mt-3 text-lg font-semibold leading-8 text-slate-900">
                  {availableStep.reflection}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {quizRequired && !quizPassed
                    ? "Pass the video check first. Your reflection answer opens after the quiz is fully correct."
                    : "Answer this question in the reflection box below before the next step opens."}
                </p>
                <textarea
                  className="mt-4 min-h-44 w-full rounded-[22px] border border-brand/15 bg-white px-4 py-4 text-sm outline-none focus:border-brand"
                  placeholder="Write your answer to this reflection question here."
                  value={draftReflectionResponse}
                  onChange={(event) => updateReflection(event.target.value)}
                  disabled={quizRequired && !quizPassed}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                  Prompt progress
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">
                  {completedPromptCount} / {availableStep.prompts.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Counted when each answer has enough detail to be useful later.
                </p>
              </div>
              <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                  Reflection status
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">
                  {reflectionReady ? "Ready" : "Draft"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The closing reflection must be written before the next step opens.
                </p>
              </div>
              <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                  Sponsor follow-up
                </p>
                <label className="mt-3 flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <input
                    type="checkbox"
                    checked={draftSponsorFollowUp}
                    onChange={(event) => updateSponsorFlag(event.target.checked)}
                  />
                  <span>Flag this module for later sponsor or facilitator review.</span>
                </label>
              </div>
            </div>

            <div className="mt-6 rounded-[26px] border border-accent/15 bg-accent/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
                Assignment prompts
              </p>
              {quizRequired && !quizPassed ? (
                <div className="mt-4 rounded-2xl border border-brand/10 bg-white/90 px-4 py-4 text-sm leading-7 text-slate-700">
                  Finish the Step 1 video check with all answers correct to open these prompts.
                </div>
              ) : null}
              <div className="mt-4 space-y-4">
                {availableStep.prompts.map((prompt, index) => (
                  <div key={prompt} className="rounded-2xl bg-white/90 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      Prompt {index + 1}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{prompt}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      You can answer a little now and save the draft before you finish the
                      whole step.
                    </p>
                    <textarea
                      className="mt-4 min-h-28 w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                      placeholder="Write a specific answer here, then press Save draft when you want to return later."
                      value={draftPromptResponses[index] || ""}
                      onChange={(event) => updatePromptResponse(index, event.target.value)}
                      disabled={quizRequired && !quizPassed}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
              <div className="hidden xl:block" />
              <div className="rounded-[26px] border border-dashed border-brand/20 bg-surface/80 p-5 text-sm leading-7 text-slate-600">
                <p className="font-semibold text-slate-900">Uploads and privacy</p>
                <p className="mt-3">
                  Members can attach documents or images as part of the assignment flow.
                  Step 4 remains flagged as private for more sensitive material.
                </p>
                <input
                  type="file"
                  multiple
                  className="mt-4 block w-full text-sm"
                  onChange={(event) => handleMockUpload(availableStep.number, event)}
                />
                {(progress.uploads[availableStep.number] || []).length ? (
                  <ul className="mt-4 space-y-2">
                    {(progress.uploads[availableStep.number] || []).map((file) => (
                      <li key={file} className="rounded-xl bg-white px-3 py-2 text-slate-700">
                        {file}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            {moduleMessage ? (
              <div className="mt-6 rounded-2xl border border-brand/15 bg-brand/10 px-4 py-3 text-sm text-slate-700">
                {moduleMessage}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => saveCurrentDraft(availableStep.number)}
                className="rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900"
              >
                Save draft
              </button>
              <button
                type="button"
                onClick={() => submitStep(availableStep.number)}
                className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Mark step complete
              </button>
              <button
                type="button"
                onClick={() => clearCurrentDraft(availableStep.number)}
                className="rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-surface"
              >
                Clear current draft
              </button>
            </div>
          </article>

          <div className="grid gap-6 xl:grid-cols-2">
            <article className="rounded-[30px] border border-brand/10 bg-white/80 p-6 shadow-glow">
              <h2 className="text-2xl font-semibold text-slate-900">Daily Step 10 check-in</h2>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                    Mood
                  </p>
                  <input
                    className="w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                    placeholder="How would you describe your emotional state today?"
                    value={progress.mood}
                    onChange={(event) =>
                      setProgress({ ...progress, mood: event.target.value })
                    }
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                    Honesty
                  </p>
                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                    placeholder="Where were you honest today? Where did you drift?"
                    value={progress.honesty}
                    onChange={(event) =>
                      setProgress({ ...progress, honesty: event.target.value })
                    }
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                    Target behavior
                  </p>
                  <input
                    className="w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                    placeholder="Did you engage in the target behavior today?"
                    value={progress.targetBehaviorToday}
                    onChange={(event) =>
                      setProgress({
                        ...progress,
                        targetBehaviorToday: event.target.value
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={submitCheckIn}
                  className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  Save check-in
                </button>
                {progress.checkInHistory.length ? (
                  <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                      Recent check-ins
                    </p>
                    <div className="mt-4 space-y-3">
                      {progress.checkInHistory.slice(0, 3).map((entry) => (
                        <div key={entry.id} className="rounded-2xl bg-white px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                            {new Date(entry.createdAt).toLocaleString()}
                          </p>
                          <p className="mt-2 text-sm text-slate-700">
                            Mood: {entry.mood || "Not recorded"}
                          </p>
                          <p className="mt-1 text-sm text-slate-700">
                            Honesty: {entry.honesty || "Not recorded"}
                          </p>
                          <p className="mt-1 text-sm text-slate-700">
                            Target behavior: {entry.targetBehaviorToday || "Not recorded"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </article>

            <article className="rounded-[30px] border border-brand/10 bg-white/80 p-6 shadow-glow">
              <h2 className="text-2xl font-semibold text-slate-900">Community forum preview</h2>
              <div className="mt-5 rounded-[24px] border border-brand/10 bg-surface/90 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                  Community agreement
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Speak from experience, avoid directing other members, protect anonymity,
                  and move urgent safety concerns outside the forum into direct support.
                </p>
              </div>
              <div className="mt-5 rounded-[26px] border border-brand/10 bg-white/90 p-5 shadow-glow">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
                  Start a conversation
                </p>
                <div className="mt-4 space-y-3">
                  <select
                    className="w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                    value={channel}
                    onChange={(event) => setChannel(event.target.value)}
                  >
                    {communityChannels.map((item) => (
                      <option key={item.name}>{item.name}</option>
                    ))}
                  </select>
                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                    placeholder="Share experience, not directives. What are you noticing, struggling with, or learning?"
                    value={newPost}
                    onChange={(event) => setNewPost(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={addForumPost}
                    className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
                  >
                    Post to community
                  </button>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {progress.forumPosts.map((post) => (
                  <div key={post.id} className="rounded-[26px] border border-brand/10 bg-surface/90 p-5 shadow-glow">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-slate-900">{post.author}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-dark">
                        {post.channel}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-8 text-slate-700">{post.message}</p>
                    {post.replies.length ? (
                      <div className="mt-5 space-y-3 border-l-2 border-brand/10 pl-4">
                        {post.replies.map((reply) => (
                          <div key={reply.id} className="rounded-2xl border border-brand/10 bg-white px-4 py-4">
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-semibold text-slate-900">{reply.author}</p>
                              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                                {new Date(reply.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-700">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-5 rounded-[22px] border border-brand/10 bg-white px-4 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                        Reply to this post
                      </p>
                      <textarea
                        className="mt-3 min-h-24 w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                        placeholder="Write a reply another member can read when they log in."
                        value={replyDrafts[post.id] || ""}
                        onChange={(event) => updateReplyDraft(post.id, event.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => submitReply(post.id, post.channel)}
                        className="mt-3 rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-surface"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
