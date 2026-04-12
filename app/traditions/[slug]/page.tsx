import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicContentPage } from "@/components/public-content-page";
import { traditionPages } from "@/lib/content-traditions";
import { traditionPagesPartTwo } from "@/lib/content-traditions-b";

const pages = [...traditionPages, ...traditionPagesPartTwo];

export async function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((entry) => entry.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords
  };
}

export default async function TraditionDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicContentPage
      page={page}
      sectionLabel="Traditions"
      backHref="/traditions"
      backLabel="Back to traditions"
    />
  );
}
