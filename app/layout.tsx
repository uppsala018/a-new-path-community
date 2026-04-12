import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "A New Path Community",
    template: "%s | A New Path Community"
  },
  description:
    "A trauma-aware online 12-step platform with guided modules, anonymous participation, support resources, and community pathways for unwanted behaviors, compulsions, and addictions."
};

const nav = [
  { href: "/#program", label: "Program" },
  { href: "/#community", label: "Community" },
  { href: "/member", label: "Member Area" },
  { href: "/support", label: "Support" }
] as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-brand/10 bg-background/85 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-dark">
              A New Path
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-brand-dark">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden rounded-full border border-brand/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-brand-dark hover:bg-white sm:inline-flex">
                Login
              </Link>
              <Link href="/signup" className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark">
                Join Free
              </Link>
            </div>
          </div>
        </header>
        {children}
        <footer className="border-t border-brand/10 bg-white/40">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>(c) {new Date().getFullYear()} A New Path Community. Anonymous, supportive, and recovery-centered.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/member" className="hover:text-brand-dark">Member Area</Link>
              <Link href="/support" className="hover:text-brand-dark">Support</Link>
              <Link href="/signup" className="hover:text-brand-dark">Register</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
