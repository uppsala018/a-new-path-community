"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { MemberProfile } from "@/lib/member-state";

type AuthPrototypeProps = {
  mode: "signup" | "login";
};

export function AuthPrototype({ mode }: AuthPrototypeProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          handle,
          password
        })
      });

      const payload = (await response.json()) as {
        user?: MemberProfile;
        error?: string;
        needsEmailConfirmation?: boolean;
      };

      if (!response.ok) {
        setMessage(payload.error || "Unable to continue.");
        return;
      }

      if (payload.needsEmailConfirmation) {
        setMessage(
          "Account created. Confirm the email from Supabase, then log in."
        );
        return;
      }

      setMessage(
        mode === "signup"
          ? "Account created. Entering the member area."
          : "Login accepted. Entering the member area."
      );

      router.push("/member");
      router.refresh();
    } catch {
      setMessage("The server could not be reached.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full rounded-[32px] border border-brand/15 bg-surface/95 p-8 shadow-glow">
      <h1 className="text-4xl font-semibold text-slate-900">
        {mode === "signup" ? "Create your account" : "Member login"}
      </h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        {mode === "signup"
          ? "Members can register with email and participate anonymously inside the community using a handle instead of a public real name."
          : "Return to your step work, community spaces, daily check-ins, and future sponsor or meeting access."}
      </p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <button
          type="button"
          className="w-full rounded-full border border-brand/20 bg-brand/5 px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-brand/10"
          onClick={() => setMessage("Google sign-in is a placeholder in this backend phase.")}
        >
          Continue with Google
        </button>
        <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          <div className="h-px flex-1 bg-brand/15" />
          <span>Email</span>
          <div className="h-px flex-1 bg-brand/15" />
        </div>
        <input
          className="w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {mode === "signup" ? (
          <input
            className="w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
            type="text"
            placeholder="Anonymous handle"
            value={handle}
            onChange={(event) => setHandle(event.target.value)}
          />
        ) : null}
        <input
          className="w-full rounded-2xl border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-70"
        >
          {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Log in"}
        </button>
      </form>

      {message ? (
        <div className="mt-5 rounded-2xl border border-brand/15 bg-brand/10 px-4 py-3 text-sm text-slate-700">
          {message}
        </div>
      ) : null}

      <p className="mt-6 text-sm text-slate-600">
        {mode === "signup" ? "Already registered?" : "Need an account?"}{" "}
        <Link
          href={mode === "signup" ? "/login" : "/signup"}
          className="font-semibold text-brand-dark hover:text-brand"
        >
          {mode === "signup" ? "Log in" : "Join free"}
        </Link>
      </p>
    </div>
  );
}
