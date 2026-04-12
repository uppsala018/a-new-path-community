"use client";

import { FormEvent, useState } from "react";

type InterestSubmission = {
  email: string;
  path: string;
  message: string;
  submittedAt: string;
};

const initialSubmission = {
  email: "",
  path: "",
  message: "",
  submittedAt: ""
};

export function InterestForm() {
  const [value, setValue] = useState<InterestSubmission>(initialSubmission);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  function updateField(field: keyof InterestSubmission, next: string) {
    setValue((current) => ({
      ...current,
      [field]: next
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setServerMessage("");

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: value.email,
          path: value.path,
          message: value.message
        })
      });

      const payload = (await response.json()) as {
        submission?: InterestSubmission;
        error?: string;
      };

      if (!response.ok) {
        setServerMessage(payload.error || "Unable to save your interest.");
        return;
      }

      setValue((current) => ({
        ...current,
        submittedAt: payload.submission?.submittedAt || new Date().toISOString()
      }));
      setSubmitted(true);
      setServerMessage("Your interest has been recorded on the server.");
    } catch {
      setServerMessage("The server could not be reached.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[34px] border border-brand/10 bg-surface/90 p-7 shadow-glow">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-dark">
        Interest form
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900">
        Tell us you want to participate
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        The first meetings can begin once enough people want to join. Visitors can leave
        their email and preferred path so follow-up can happen when the first groups are
        ready.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
          type="email"
          placeholder="Email address"
          value={value.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
        />
        <select
          className="w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
          value={value.path}
          onChange={(event) => updateField("path", event.target.value)}
          required
        >
          <option value="" disabled>
            Preferred path
          </option>
          <option>Self-guided 12-step path</option>
          <option>Live Zoom or Teams cohort</option>
          <option>Both</option>
          <option>Volunteer or facilitator interest later</option>
        </select>
        <textarea
          className="min-h-32 w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
          placeholder="Share which behavior or pattern you want support with, and when you would be available for meetings."
          value={value.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Saving..." : "Register interest"}
        </button>
      </form>

      {submitted ? (
        <div className="mt-4 rounded-[24px] border border-brand/15 bg-brand/10 p-4 text-sm leading-7 text-slate-700">
          Your interest has been saved. Current follow-up path:{" "}
          <span className="font-semibold text-slate-900">{value.path}</span>.
        </div>
      ) : null}

      {serverMessage ? (
        <div className="mt-4 rounded-[24px] border border-brand/15 bg-white/80 p-4 text-sm leading-7 text-slate-700">
          {serverMessage}
        </div>
      ) : null}

      <div className="mt-6 rounded-[24px] border border-accent/15 bg-accent/10 p-5 text-sm leading-7 text-slate-700">
        <p className="font-semibold text-slate-900">Important disclaimer</p>
        <p className="mt-2">
          This program is educational and recovery-supportive. It does not replace
          medical, psychiatric, or psychological care. If you are in crisis, contact
          emergency or professional support immediately.
        </p>
      </div>
    </div>
  );
}
