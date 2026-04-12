export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  intro: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  ctaTitle: string;
  ctaText: string;
};
