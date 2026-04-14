import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/backend/store";
import { AuthPrototype } from "@/components/auth-prototype";

export const metadata: Metadata = {
  title: "Join Free"
};

export default async function SignupPage() {
  const session = await getCurrentSession();

  if (session) {
    redirect("/member");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-6 py-16 lg:px-8">
      <AuthPrototype mode="signup" />
    </main>
  );
}
