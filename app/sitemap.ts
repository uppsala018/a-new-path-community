import type { MetadataRoute } from "next";
import { assignmentPages } from "@/lib/content-assignments";
import { educationalPages, stepPages } from "@/lib/content-education";
import { faqPages } from "@/lib/content-faq";
import { resourcePages } from "@/lib/content-resources";
import { sponsorPages } from "@/lib/content-sponsor";
import { getSiteUrl } from "@/lib/site-url";
import { traditionPages } from "@/lib/content-traditions";
import { traditionPagesPartTwo } from "@/lib/content-traditions-b";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const staticRoutes = ["", "/learn", "/steps", "/traditions", "/sponsorship", "/faq", "/resources", "/assignments", "/support", "/signup", "/login"];
  const contentRoutes = [
    ...educationalPages.map((page) => `/learn/${page.slug}`),
    ...stepPages.map((page) => `/steps/${page.slug}`),
    ...traditionPages.map((page) => `/traditions/${page.slug}`),
    ...traditionPagesPartTwo.map((page) => `/traditions/${page.slug}`),
    ...sponsorPages.map((page) => `/sponsorship/${page.slug}`),
    ...faqPages.map((page) => `/faq/${page.slug}`),
    ...resourcePages.map((page) => `/resources/${page.slug}`),
    ...assignmentPages.map((page) => `/assignments/${page.slug}`)
  ];

  return [...staticRoutes, ...contentRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
