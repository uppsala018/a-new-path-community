import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicContentPage } from "@/components/public-content-page";
import { stepPages } from "@/lib/content-education";

export async function generateStaticParams() {
  return stepPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = stepPages.find((entry) => entry.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `/steps/${page.slug}`
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      type: "article",
      url: `/steps/${page.slug}`
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.seoDescription
    }
  };
}

export default async function StepDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = stepPages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicContentPage
      page={page}
      sectionLabel="Steps"
      backHref="/steps"
      backLabel="Back to all steps"
    />
  );
}
