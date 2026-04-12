import type { ContentPage } from "@/lib/content-types";
import { programSteps } from "@/lib/program-data";

export const assignmentPages: ContentPage[] = programSteps.map((step) => ({
  slug: `step-${step.number}-assignment`,
  title: `Step ${step.number} Assignment Guide`,
  description: `Public assignment overview for Step ${step.number} in the A New Path program.`,
  seoTitle: `Step ${step.number} Assignment Questions | A New Path`,
  seoDescription: `Review the writing prompts, reflection focus, and interactive assignment direction for Step ${step.number} in A New Path.`,
  keywords: [
    `step ${step.number} assignment`,
    `step ${step.number} questions`,
    "recovery journaling prompts",
    "12 step assignments"
  ],
  intro:
    "Each step in the PDF includes a written assignment. This public page introduces the assignment before the member completes it interactively.",
  sections: [
    {
      heading: "Assignment focus",
      body: [
        step.summary,
        "The public site uses these pages to give people a sense of the writing and reflection work before they register."
      ]
    },
    {
      heading: "Questions and prompts",
      body: step.prompts
    },
    {
      heading: "Interactive module approach",
      body: [
        "Inside the member area, the assignment becomes a saveable draft with uploads, progression tracking, and private handling where needed.",
        step.status === "private"
          ? "Because this step is more sensitive, the interactive version emphasizes privacy, draft protection, and document upload support."
          : "Members complete the assignment in sequence and unlock later modules as they progress."
      ]
    }
  ],
  ctaTitle: "Move from reading to doing",
  ctaText: "The member area converts this assignment overview into an interactive journaling and submission experience."
}));
