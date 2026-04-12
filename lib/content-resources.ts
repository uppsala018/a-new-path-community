import type { ContentPage } from "@/lib/content-types";
import { directoryResources } from "@/lib/program-data";

export const resourcePages: ContentPage[] = [
  {
    slug: "other-12-step-programs",
    title: "Other 12-Step Programs and Fellowships",
    description: "A public resource page linking to other fellowships in the spirit of non-competition.",
    seoTitle: "Other 12-Step Programs and Recovery Fellowships",
    seoDescription: "Browse links to Alcoholics Anonymous, Narcotics Anonymous, Gamblers Anonymous, Overeaters Anonymous, and more.",
    keywords: ["other 12 step programs", "recovery fellowships list", "anonymous fellowships"],
    intro: "This directory exists because the objective is to help people who struggle, not to trap them in a single ecosystem.",
    sections: [
      {
        heading: "Why this page exists",
        body: [
          "Tradition 6 in the source material supports non-endorsement and non-competition. Linking out can be an act of integrity rather than a loss.",
          "The best fit for a visitor may be another fellowship, and the site should make that easy."
        ]
      },
      {
        heading: "Programs included",
        body: directoryResources.map(([name, href]) => `${name}: ${href}`)
      }
    ],
    ctaTitle: "Return when useful",
    ctaText: "Visitors can still use A New Path's educational material even if they also work with another fellowship."
  },
  {
    slug: "online-recovery-community-features",
    title: "Online Recovery Community Features",
    description: "A public page on the platform architecture described in the PDF.",
    seoTitle: "Online Recovery Community Features | A New Path",
    seoDescription: "Explore the planned online community features: step modules, sponsor matching, forum spaces, daily check-ins, and meetings.",
    keywords: ["online recovery community", "recovery forum", "recovery sponsor matching", "daily check in recovery"],
    intro: "Part Five of the PDF reads almost like a platform blueprint. This page turns that into a public product overview.",
    sections: [
      {
        heading: "Core architecture",
        body: [
          "The document outlines user onboarding, step modules, sponsor matching, an anonymous forum, daily check-ins, crisis resources, and privacy controls.",
          "These are the building blocks of the interactive project."
        ]
      },
      {
        heading: "Why this matters for SEO",
        body: [
          "A page like this can attract people searching for online recovery options, recovery forums, anonymous support groups, or step-based digital programs.",
          "It also helps explain the product before people commit to signup."
        ]
      }
    ],
    ctaTitle: "See the member prototype",
    ctaText: "The member area already demonstrates a first version of progression, journaling, uploads, and community posting."
  },
  {
    slug: "daily-check-in-and-step-10",
    title: "Daily Check-In and Step 10",
    description: "A public page on daily accountability and review.",
    seoTitle: "Daily Check-In for Recovery and Step 10 Accountability",
    seoDescription: "Learn how A New Path uses daily review, self-honesty, and gentle reminders as part of Step 10.",
    keywords: ["daily check in recovery", "step 10 daily inventory", "daily accountability addiction recovery"],
    intro: "The PDF describes a brief daily check-in tied to Step 10. This page turns that into a useful public concept page.",
    sections: [
      {
        heading: "What the daily check-in is for",
        body: [
          "The goal is not perfection tracking. It is early noticing, honesty, and quicker correction before old loops deepen.",
          "That is why the platform uses a simple review model rather than a competitive streak culture."
        ]
      },
      {
        heading: "What the check-in can include",
        body: [
          "Emotional state, honesty review, whether the target behavior happened, and what support is needed next are all consistent with the PDF.",
          "That makes the check-in both practical and searchable."
        ]
      }
    ],
    ctaTitle: "Try the prototype",
    ctaText: "The member area already includes a local device version of the daily review pattern."
  },
  {
    slug: "privacy-anonymity-and-sensitive-step-work",
    title: "Privacy, Anonymity, and Sensitive Step Work",
    description: "A public page on how private content should be treated on the platform.",
    seoTitle: "Privacy and Anonymity in an Online Recovery Program",
    seoDescription: "See how A New Path treats privacy, anonymity, private step work, and especially sensitive Step 4 material.",
    keywords: ["privacy in recovery app", "anonymous recovery platform", "step 4 privacy"],
    intro: "The platform blueprint in the PDF puts strong emphasis on privacy, anonymity, and private handling of deeply personal material.",
    sections: [
      {
        heading: "What should stay private",
        body: [
          "Step assignments are meant to remain private between the member and sponsor or reviewer. Community posts are pseudonymous. Step 4 requires special care.",
          "This distinction is essential to both trust and ethical design."
        ]
      },
      {
        heading: "What should stay public",
        body: [
          "Educational pages, resource pages, and public explanations can remain indexable and search-friendly.",
          "Private member content, forum threads, and submissions should be treated very differently."
        ]
      }
    ],
    ctaTitle: "Public value, private work",
    ctaText: "The site's SEO strategy should focus on public educational pages while protecting the member side of the platform."
  }
];
