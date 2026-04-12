import type { Metadata } from "next";
import Link from "next/link";
import { sponsorPages } from "@/lib/content-sponsor";

export const metadata: Metadata = {
  title: "Sponsor and Sponsee Guide",
  description:
    "Public pages on sponsorship, sponsor contact, relapse guidance, and sponsor matching in the A New Path program."
};

export default function SponsorshipIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
      <div className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          Sponsorship
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">
          Sponsor and sponsee public guidance
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          These pages translate Part Four of the PDF into public resources about sponsor
          roles, matching, contact, and relapse.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sponsorPages.map((page) => (
          <Link
            key={page.slug}
            href={`/sponsorship/${page.slug}`}
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
