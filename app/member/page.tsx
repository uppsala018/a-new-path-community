import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/backend/store";
import { MemberWorkspace } from "@/components/member-workspace";

export const metadata: Metadata = {
  title: "Member Area",
  description:
    "Interactive member workspace for step progression, journaling, community posting, and cohort planning."
};

export default async function MemberPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return <MemberWorkspace initialProfile={session.user} initialProgress={session.progress} />;
}
