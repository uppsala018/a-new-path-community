import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support the Platform"
};

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">Voluntary support</p>
          <h1 className="mt-3 text-5xl font-semibold text-slate-900">Support the online presence if it provides value.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            The site is free to join. Voluntary gifts help keep the hosting, domain, servers, meeting tools, moderation, and development work going so the community can stay available.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            This is presented transparently as an independently built project without a board structure. Operational costs come first, and any surplus may compensate the time and maintenance work behind the platform.
          </p>
        </div>
        <div className="rounded-[34px] border border-brand/10 bg-surface/90 p-7 shadow-glow">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">Tradition 7</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Self-supporting by voluntary contributions.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            The support language is framed in the spirit of recovery traditions: voluntary gifts, no forced payment, and clear explanation of what the support keeps alive.
          </p>
          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
            <p className="rounded-2xl bg-white px-4 py-3">Keep the community free to join.</p>
            <p className="rounded-2xl bg-white px-4 py-3">Cover digital infrastructure and group meeting costs.</p>
            <p className="rounded-2xl bg-white px-4 py-3">Support continued development and moderation.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
              Connect Stripe link
            </button>
            <button type="button" className="rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-surface">
              Connect support link
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
