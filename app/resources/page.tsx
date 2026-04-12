import type { Metadata } from "next";
import Link from "next/link";
import { resourcePages } from "@/lib/content-resources";

export const metadata: Metadata = {
  title: "Recovery Resources",
  description:
    "Public resource pages for other fellowships, online community features, daily check-ins, and privacy in A New Path."
};

export default function ResourcesIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          Resources
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">
          Public recovery resource pages
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          These pages cover external fellowships, public platform features, daily
          accountability, and privacy design.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {resourcePages.map((page) => (
          <Link
            key={page.slug}
            href={`/resources/${page.slug}`}
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
