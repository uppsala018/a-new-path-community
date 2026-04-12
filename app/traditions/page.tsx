import type { Metadata } from "next";
import Link from "next/link";
import { traditionPages } from "@/lib/content-traditions";
import { traditionPagesPartTwo } from "@/lib/content-traditions-b";

const pages = [...traditionPages, ...traditionPagesPartTwo];

export const metadata: Metadata = {
  title: "12 Traditions Guide",
  description:
    "Public pages for all 12 traditions in the A New Path community model, including anonymity, purpose, service, and self-support."
};

export default function TraditionsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          Traditions
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">
          Public pages for all 12 traditions
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          The traditions explain how the community thinks about belonging, anonymity,
          service, support, autonomy, and focus.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/traditions/${page.slug}`}
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
