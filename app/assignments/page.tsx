import type { Metadata } from "next";
import Link from "next/link";
import { assignmentPages } from "@/lib/content-assignments";

export const metadata: Metadata = {
  title: "Step Assignment Guides",
  description:
    "Public assignment pages for all 12 steps in A New Path, built as standalone resources and entry points into the interactive program."
};

export default function AssignmentIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          Assignments
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">
          Assignment guides for all 12 steps
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          These pages expose the journaling and reflection side of the program publicly,
          while the member area handles the interactive draft and submission flow.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assignmentPages.map((page) => (
          <Link
            key={page.slug}
            href={`/assignments/${page.slug}`}
            className="rounded-[28px] border border-brand/10 bg-white/80 p-6 shadow-glow hover:border-brand/25"
          >
            <h2 className="text-2xl font-semibold text-slate-900">{page.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{page.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
