import type { Metadata } from "next";
import Link from "next/link";
import { faqPages } from "@/lib/content-faq";

export const metadata: Metadata = {
  title: "Recovery FAQ",
  description:
    "Public answers to common questions about belief, anonymity, sponsorship, therapy, relapse, and timing in the A New Path program."
};

export default function FaqIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          FAQ
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">
          Public answers to common recovery questions
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          These FAQ pages are written as standalone resources so each common question can
          rank and provide value on its own.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {faqPages.map((page) => (
          <Link
            key={page.slug}
            href={`/faq/${page.slug}`}
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
