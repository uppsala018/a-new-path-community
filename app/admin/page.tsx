import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminMail } from "@/lib/admin";
import { getAdminDashboardData, getCurrentSession } from "@/lib/backend/store";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin controls and site activity for A New Path Community."
};

export default async function AdminPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.user.isAdmin) {
    redirect("/member");
  }

  const dashboard = await getAdminDashboardData();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <section className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          Admin dashboard
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">
          Welcome, {session.user.handle || session.user.email}.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
          This area is limited to the email configured in `ADMIN_MAIL`.
          Current admin email: {getAdminMail() || "not configured"}.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Profiles</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{dashboard.profilesCount}</p>
          </div>
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Progress rows</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{dashboard.progressCount}</p>
          </div>
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">API requests</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {dashboard.usage.apiRequestsToday}
            </p>
          </div>
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Active time</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {dashboard.usage.totalActiveMinutesToday} min
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Page views</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {dashboard.usage.pageViewsToday}
            </p>
          </div>
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Visitors</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {dashboard.usage.distinctVisitorsToday}
            </p>
          </div>
          <div className="rounded-[24px] border border-brand/10 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Forum posts</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{dashboard.forumPostsCount}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/member"
            className="rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-surface"
          >
            Open member area
          </Link>
          <Link
            href="/"
            className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Back to site
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
        <article className="rounded-[30px] border border-brand/10 bg-white/80 p-6 shadow-glow">
          <h2 className="text-2xl font-semibold text-slate-900">Usage today</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                Top pages
              </p>
              <div className="mt-4 space-y-3">
                {dashboard.usage.topPagesToday.length ? (
                  dashboard.usage.topPagesToday.map((page) => (
                    <div key={page.path} className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{page.path}</p>
                        <p className="text-sm text-slate-600">{page.minutes} min active time</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{page.views} views</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">No page activity yet today.</p>
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                Top visitors
              </p>
              <div className="mt-4 space-y-3">
                {dashboard.usage.topVisitorsToday.length ? (
                  dashboard.usage.topVisitorsToday.map((visitor) => (
                    <div key={visitor.key} className="rounded-2xl bg-white px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-900">
                          {visitor.label}
                          {visitor.isAdmin ? " (admin)" : ""}
                        </p>
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                          {new Date(visitor.lastSeenAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        {visitor.views} views, {visitor.minutes.toFixed(1)} min, {visitor.apiRequests} API calls
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">No visitors recorded yet today.</p>
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                API routes
              </p>
              <div className="mt-4 space-y-3">
                {dashboard.usage.recentApiRoutesToday.length ? (
                  dashboard.usage.recentApiRoutesToday.map((item) => (
                    <div key={item.route} className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{item.route}</p>
                        <p className="text-sm text-slate-600">
                          Last status {item.lastStatusCode ?? "n/a"}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{item.count} calls</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">No API usage recorded yet today.</p>
                )}
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[30px] border border-brand/10 bg-white/80 p-6 shadow-glow">
          <h2 className="text-2xl font-semibold text-slate-900">Recent interest submissions</h2>
          <div className="mt-5 space-y-4">
            {dashboard.recentInterestSubmissions.length ? (
              dashboard.recentInterestSubmissions.map((submission) => (
                <div key={submission.id} className="rounded-[24px] border border-brand/10 bg-surface/90 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">{submission.email}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      {new Date(submission.submitted_at).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-brand-dark">
                    {submission.preferred_path}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{submission.message}</p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-slate-600">No interest submissions yet.</p>
            )}
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-[30px] border border-brand/10 bg-white/80 p-6 shadow-glow">
        <h2 className="text-2xl font-semibold text-slate-900">Admin notes</h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
          <p>
            Keep `ADMIN_MAIL` set to a single lowercase address in Vercel to avoid accidental admin access drift.
          </p>
          <p>
            The auth callback now routes verified admin users to this page automatically.
          </p>
          <p>
            This dashboard shows page views, active time, visitor labels, and API request counts. It does not collect external AI token usage because the app does not call an AI API.
          </p>
        </div>
      </section>
    </main>
  );
}
