import type { Metadata } from "next";
import Link from "next/link";
import { stepPages } from "@/lib/content-education";

export const metadata: Metadata = {
  title: "12 Step Recovery Guide",
  description:
    "Read all 12 public step pages in A New Path, a recovery guide for dependencies, codependencies, unwanted behaviors, compulsions, and addictions.",
  alternates: {
    canonical: "/steps"
  },
  openGraph: {
    title: "12 Step Recovery Guide",
    description:
      "Read all 12 public step pages in A New Path, a recovery guide for dependencies, codependencies, unwanted behaviors, compulsions, and addictions.",
    type: "website",
    url: "/steps"
  }
};

export default function StepsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          Steps
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">
          All 12 public step pages
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          Each page explains one of the 12 steps in A New Path as a standalone public
          recovery resource. The member area then turns that same step into guided
          writing, reflection, saving, and progression work.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stepPages.map((page) => (
          <Link
            key={page.slug}
            href={`/steps/${page.slug}`}
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
