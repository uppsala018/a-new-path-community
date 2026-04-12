import type { Metadata } from "next";
import Link from "next/link";
import { educationalPages } from "@/lib/content-education";

export const metadata: Metadata = {
  title: "Recovery Education Library",
  description:
    "Public educational pages on trauma, compulsive behavior, dopamine, addiction, and the foundations of the A New Path program."
};

export default function LearnIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          Learn
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">
          Public education from the A New Path program
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          These pages turn the early educational sections of the PDF into standalone public
          resources that can rank on their own and still support the wider interactive
          program.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {educationalPages.map((page) => (
          <Link
            key={page.slug}
            href={`/learn/${page.slug}`}
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
