import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/learn", "/steps", "/traditions", "/sponsorship", "/faq", "/resources", "/assignments"],
      disallow: ["/member"]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
