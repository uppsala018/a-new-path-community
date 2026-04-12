import type { Metadata } from "next";
import Link from "next/link";
import { InterestForm } from "@/components/interest-form";
import { directoryResources, meetingSchedule, programSteps } from "@/lib/program-data";

export const metadata: Metadata = {
  title: "A New Path 12-Step Community",
  description:
    "A New Path is a 12-step program for dependencies, codependencies, unwanted behaviors, and addictions, built around step work, community, and help from a Higher Power."
};

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pt-20">
        <div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
            <span className="rounded-full border border-brand/15 bg-white/70 px-4 py-2">Free to join</span>
            <span className="rounded-full border border-brand/15 bg-white/70 px-4 py-2">Anonymous-friendly</span>
            <span className="rounded-full border border-brand/15 bg-white/70 px-4 py-2">Trauma-aware</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-slate-900 md:text-6xl">
            A New Path is a 12-step program for dependencies, codependencies, unwanted behaviors, and addictions.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            The 12 steps are the core basis of this work. A New Path takes a broad
            approach to addiction and dependency, and it places a strong emphasis on
            seeking real help from a Higher Power. This is not presented as something
            abstract. It is something real, and the individual must begin that search
            seriously while moving through the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Join the community
            </Link>
            <Link
              href="/member"
              className="rounded-full border border-brand/20 bg-white/70 px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-white"
            >
              Explore the member area
            </Link>
            <Link
              href="/steps"
              className="rounded-full border border-brand/20 bg-white/70 px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-white"
            >
              Public step pages
            </Link>
            <Link
              href="/learn"
              className="rounded-full border border-brand/20 bg-white/70 px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-white"
            >
              Learn pages
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-brand/10 bg-white/70 p-5 shadow-glow">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Path one</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Self-guided</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Register, start at Step 1, save your reflections, and unlock the next
                module as you complete the work.
              </p>
            </div>
            <div className="rounded-[28px] border border-brand/10 bg-white/70 p-5 shadow-glow">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Path two</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Live cohorts</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Join repeated community rounds on Zoom or Teams once enough
                participants have registered interest.
              </p>
            </div>
            <div className="rounded-[28px] border border-brand/10 bg-white/70 p-5 shadow-glow">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Future goal</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Volunteer-led</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                As members complete the work, they can grow into sponsor, moderator, and
                facilitator roles.
              </p>
            </div>
          </div>
        </div>

        <InterestForm />
      </section>

      <section id="program" className="border-y border-brand/10 bg-white/45 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
              Program structure
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-900">
              The site is built around a locked 12-step journey.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Each step is treated as its own guided module with teaching, assignment
              work, reflection, and progression into the next step only after the
              current one is completed. The program is built on the 12-step path and on
              the conviction that lasting change requires help beyond self-will.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/steps"
                className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Open all steps
              </Link>
              <Link
                href="/learn"
                className="rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-white"
              >
                Open learn pages
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {programSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-[28px] border border-brand/10 bg-surface/90 p-6 shadow-glow"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">
                    Step {step.number}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      step.status === "current"
                        ? "bg-brand text-white"
                        : step.status === "private"
                          ? "bg-accent text-white"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step.status === "current"
                      ? "Unlocked"
                      : step.status === "private"
                        ? "Private"
                        : "Locked"}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.summary}</p>
                <p className="mt-3 text-sm leading-7 text-slate-500">{step.statement}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
              Community model
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-900">
              Anonymous community, forum support, and repeated group cycles.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Members can work alone, alongside a sponsor, or within repeated Teams or
              Zoom cohorts. The aim is serious step work, honest accountability,
              community support, and a life that is gradually brought back into order
              through recovery and help from a Higher Power.
            </p>
          </div>
          <div className="rounded-[30px] border border-brand/10 bg-white/70 p-7 shadow-glow">
            <h3 className="text-2xl font-semibold text-slate-900">Meeting path preview</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              {meetingSchedule.map((meeting) => (
                <div
                  key={meeting.title}
                  className="rounded-[24px] border border-brand/10 bg-surface/85 p-5"
                >
                  <p className="text-lg font-semibold text-slate-900">{meeting.title}</p>
                  <p className="mt-1 text-sm font-semibold text-brand-dark">{meeting.time}</p>
                  <p className="mt-2">{meeting.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand/10 bg-brand-dark py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-soft">
              Support and tradition
            </p>
            <h2 className="mt-3 text-4xl font-semibold">
              Free to join, supported by voluntary giving.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/85">
              The source program includes Tradition 7: self-support through voluntary
              contributions from members. Gifts can help cover hosting, domains, servers,
              meeting tools, development time, and the work required to keep the platform
              online.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              There is no board structure described here. Support first covers the project
              itself, and remaining funds can compensate the ongoing development and
              maintenance work behind it.
            </p>
          </div>
          <div className="rounded-[30px] border border-white/15 bg-white/10 p-7 shadow-glow">
            <h3 className="text-2xl font-semibold">Ways to help</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-white/80">
              <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Join and use the program without a paywall.
              </p>
              <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Share a voluntary gift through Stripe or a support link once live.
              </p>
              <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Volunteer later as a sponsor, moderator, or meeting facilitator after
                completing the work.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/support"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-slate-100"
              >
                Support page
              </Link>
              <Link
                href="/signup"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Register free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
            Other 12-step resources
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-900">
            This project is not in competition with other fellowships.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            The goal is to help people who struggle. Visitors should be able to reach
            other established 12-step resources when that is the better fit.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {directoryResources.map(([name, href]) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[26px] border border-brand/10 bg-white/75 p-5 text-sm font-semibold text-slate-800 shadow-glow hover:border-brand/25 hover:bg-white"
            >
              {name}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
