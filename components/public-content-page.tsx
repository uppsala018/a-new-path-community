import Link from "next/link";
import Image from "next/image";
import type { ContentPage } from "@/lib/content-types";

type PublicContentPageProps = {
  page: ContentPage;
  sectionLabel: string;
  backHref: string;
  backLabel: string;
};

export function PublicContentPage({
  page,
  sectionLabel,
  backHref,
  backLabel
}: PublicContentPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const pageUrl = `${baseUrl}${backHref}/${page.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords.join(", "),
    mainEntityOfPage: pageUrl,
    about: [sectionLabel, ...page.keywords],
    publisher: {
      "@type": "Organization",
      name: "A New Path Community"
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="rounded-[34px] border border-brand/10 bg-surface/95 p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">
          {sectionLabel}
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-900">{page.title}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">{page.intro}</p>
        {page.heroImage ? (
          <figure className="mt-8 overflow-hidden rounded-[28px] border border-brand/10 bg-white/85 p-4 shadow-glow">
            <Image
              src={page.heroImage.src}
              alt={page.heroImage.alt}
              width={1408}
              height={768}
              className="h-auto w-full rounded-[22px]"
              priority
            />
            {page.heroImage.caption ? (
              <figcaption className="mt-4 text-sm leading-7 text-slate-600">
                {page.heroImage.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-2">
          {page.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-brand/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {page.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-[30px] border border-brand/10 bg-white/80 p-7 shadow-glow"
          >
            <h2 className="text-3xl font-semibold text-slate-900">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-[30px] border border-brand/10 bg-brand-dark p-7 text-white shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">
          Continue
        </p>
        <h2 className="mt-3 text-3xl font-semibold">{page.ctaTitle}</h2>
        <p className="mt-4 text-base leading-8 text-white/85">{page.ctaText}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={backHref}
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-slate-100"
          >
            {backLabel}
          </Link>
          <Link
            href="/member"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Member area
          </Link>
        </div>
      </section>
    </main>
  );
}
