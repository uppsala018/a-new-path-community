import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicContentPage } from "@/components/public-content-page";
import { resourcePages } from "@/lib/content-resources";

export async function generateStaticParams() {
  return resourcePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = resourcePages.find((entry) => entry.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords
  };
}

export default async function ResourceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = resourcePages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicContentPage
      page={page}
      sectionLabel="Resources"
      backHref="/resources"
      backLabel="Back to resources"
    />
  );
}
