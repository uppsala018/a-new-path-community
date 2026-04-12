import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicContentPage } from "@/components/public-content-page";
import { educationalPages } from "@/lib/content-education";

export async function generateStaticParams() {
  return educationalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = educationalPages.find((entry) => entry.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `/learn/${page.slug}`
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      type: "article",
      url: `/learn/${page.slug}`
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.seoDescription
    }
  };
}

export default async function LearnDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = educationalPages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicContentPage
      page={page}
      sectionLabel="Learn"
      backHref="/learn"
      backLabel="Back to education"
    />
  );
}
