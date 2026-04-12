import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicContentPage } from "@/components/public-content-page";
import { sponsorPages } from "@/lib/content-sponsor";

export async function generateStaticParams() {
  return sponsorPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = sponsorPages.find((entry) => entry.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords
  };
}

export default async function SponsorshipDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = sponsorPages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicContentPage
      page={page}
      sectionLabel="Sponsorship"
      backHref="/sponsorship"
      backLabel="Back to sponsorship"
    />
  );
}
