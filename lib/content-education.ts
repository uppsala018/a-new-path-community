import { programSteps } from "@/lib/program-data";
import type { ContentPage } from "@/lib/content-types";

export const educationalPages: ContentPage[] = [
  {
    slug: "why-we-need-this-program",
    title: "Why We Need This Program",
    description: "A public introduction to the purpose and philosophy behind A New Path.",
    seoTitle: "Why a Trauma-Aware 12-Step Program Matters",
    seoDescription:
      "Learn why A New Path was designed as a trauma-aware 12-step recovery program for unwanted behaviors, compulsions, and addictions.",
    keywords: [
      "trauma aware 12 step program",
      "12 step program for addictions",
      "recovery for compulsions",
      "unwanted behaviors recovery"
    ],
    intro:
      "The PDF begins with a simple observation: human beings seek relief when life hurts. A New Path reframes that search for relief with compassion, accountability, and structure.",
    sections: [
      {
        heading: "Relief is human",
        body: [
          "People do not usually begin with a wish to destroy their lives. They begin by trying to cope, numb, soothe, or escape something painful.",
          "This page exists to explain the tone of the program: direct honesty without moral condemnation."
        ]
      },
      {
        heading: "Broader than a single addiction",
        body: [
          "The source document was written for the full spectrum of unwanted behaviors, from habits that are beginning to become costly to severe addictions that dominate life.",
          "That makes the platform relevant to many types of struggles instead of one narrow category."
        ]
      },
      {
        heading: "Compassion and responsibility together",
        body: [
          "A New Path explains behavior through pain, trauma, and brain adaptation without removing responsibility for action, repair, or change.",
          "That combination is central to the public educational content and the private interactive modules."
        ]
      }
    ],
    ctaTitle: "Start with the overview",
    ctaText: "Read the educational pages, then enter the member area when you are ready to begin Step 1."
  },
  {
    slug: "spectrum-of-unwanted-behavior",
    title: "The Spectrum of Unwanted Behavior",
    description: "Understand how the program treats habits, compulsions, and addictions as a spectrum.",
    seoTitle: "Habit, Compulsion, or Addiction: Understanding the Spectrum",
    seoDescription:
      "Explore the spectrum from healthy use to problematic use, compulsive behavior, and addiction in the A New Path framework.",
    keywords: [
      "habit vs compulsion",
      "compulsive behavior help",
      "addiction spectrum",
      "problematic behavior signs"
    ],
    intro:
      "Not all unwanted behaviors are the same. This page turns the PDF's spectrum model into a standalone guide that can help visitors assess what they are dealing with.",
    sections: [
      {
        heading: "Healthy use to addiction",
        body: [
          "The source material describes a continuum: healthy use, problematic use, compulsive use, and addiction.",
          "A person does not need to reach the most severe end of that continuum before support becomes worthwhile."
        ]
      },
      {
        heading: "Categories of struggle",
        body: [
          "The PDF covers substance-related behaviors, gambling, gaming, shopping, pornography, emotional eating, codependent patterns, rumination, and other compulsive loops.",
          "The public site can speak to this breadth without forcing every visitor into one label."
        ]
      },
      {
        heading: "The honest assessment",
        body: [
          "The program does not decide for the visitor whether the behavior is a problem. It invites them to examine consequences, failed attempts to stop, and the actual cost.",
          "That framing is both useful for SEO and valuable for real people searching in uncertainty."
        ]
      }
    ],
    ctaTitle: "Continue to the next foundation",
    ctaText: "If the behavior is causing harm, the next educational page on trauma helps explain why it can feel so difficult to stop."
  },
  {
    slug: "how-trauma-shapes-behavior",
    title: "How Trauma Shapes Our Behavior",
    description: "A public educational page on the trauma lens in A New Path.",
    seoTitle: "How Trauma Can Drive Addictive and Compulsive Behavior",
    seoDescription:
      "Learn how trauma, emotional neglect, and early wounds can shape compulsive behavior and addiction patterns in the A New Path model.",
    keywords: [
      "trauma and addiction",
      "trauma and compulsive behavior",
      "emotional neglect addiction",
      "why trauma affects behavior"
    ],
    intro:
      "One of the strongest ideas in the PDF is that the right question is often not only 'why the addiction' but also 'why the pain'.",
    sections: [
      {
        heading: "Trauma is the wound inside",
        body: [
          "The source material defines trauma not only as dramatic events but as what happens inside a person when experiences overwhelm safety, regulation, or connection.",
          "This includes both Big-T trauma and the quieter accumulation of neglect, invalidation, chronic criticism, and emotional absence."
        ]
      },
      {
        heading: "Attachment and authenticity",
        body: [
          "The PDF describes a core conflict: children need attachment and authenticity at the same time, but many learn to suppress authentic feeling in order to preserve connection.",
          "That split can become the inner wound addictive behavior later tries to soothe."
        ]
      },
      {
        heading: "Compassion does not remove accountability",
        body: [
          "The trauma lens explains behavior without excusing harm. In the program, understanding is used to deepen change, not avoid it.",
          "This page is important for visitors who need a non-shaming but serious explanation of why recovery work matters."
        ]
      }
    ],
    ctaTitle: "Understand the brain side too",
    ctaText: "The next foundation page explains how reward pathways and dopamine adaptation reinforce the behavior over time."
  },
  {
    slug: "reward-system-and-brain-science",
    title: "Your Brain, Your Reward System, and How It Gets Hijacked",
    description: "A standalone explanation of the neuroscience section from the PDF.",
    seoTitle: "Brain Reward System, Dopamine, and Addiction Explained",
    seoDescription:
      "Understand dopamine, the reward system, tolerance, anhedonia, and neuroplasticity in the A New Path recovery model.",
    keywords: [
      "dopamine and addiction",
      "brain reward system addiction",
      "anhedonia recovery",
      "neuroplasticity addiction recovery"
    ],
    intro:
      "The PDF uses brain science to shift the conversation away from moral weakness and toward rewiring, support, and sustained recovery work.",
    sections: [
      {
        heading: "How the reward system works",
        body: [
          "Natural rewards help the brain learn what supports life. Addictive behaviors and substances exploit that same system with stronger or more frequent surges.",
          "The source text highlights the nucleus accumbens, ventral tegmental area, and prefrontal cortex as part of that loop."
        ]
      },
      {
        heading: "Tolerance and anhedonia",
        body: [
          "When the system is repeatedly flooded, the brain adapts by turning down sensitivity. That can lead to tolerance and to everyday life feeling emotionally flat.",
          "This helps explain why people often continue not because they are chasing pleasure alone, but because they are struggling to feel normal at all."
        ]
      },
      {
        heading: "Neuroplasticity is hopeful",
        body: [
          "A core recovery message in the PDF is that the brain can change back over time. Healthy choices repeated consistently can strengthen new pathways and weaken old compulsive loops.",
          "That makes this page valuable both for search traffic and for encouragement."
        ]
      }
    ],
    ctaTitle: "Move from understanding to action",
    ctaText: "After the foundation pages, the public step pages can guide visitors through what the recovery process actually asks of them."
  }
];

export const stepPages: ContentPage[] = programSteps.map((step) => ({
  slug: step.slug,
  title: `Step ${step.number}: ${step.title}`,
  description: `Public educational overview of Step ${step.number} in the A New Path program.`,
  seoTitle: `Step ${step.number} ${step.title} | A New Path Recovery Guide`,
  seoDescription: `Learn what Step ${step.number} in A New Path means, why it matters, and how the interactive program approaches it.`,
  keywords: [
    `step ${step.number} recovery`,
    `${step.title.toLowerCase()} recovery`,
    "12 step guide",
    "online recovery steps"
  ],
  intro: step.summary,
  sections: [
    {
      heading: "Step statement",
      body: [step.statement]
    },
    {
      heading: "What this step is doing",
      body: [step.teaching]
    },
    {
      heading: "How the platform presents it",
      body: [
        "Each step is treated as a module with teaching, guided prompts, assignments, and a reflection question.",
        step.status === "private"
          ? "This step receives stronger privacy treatment because it often involves deeply personal history and long-form inventory work."
          : "Members unlock this step as they progress through the program in order."
      ]
    },
    {
      heading: "Key prompts",
      body: step.prompts
    }
  ],
  ctaTitle: "Work this step interactively",
  ctaText: "The member area turns this public overview into a guided module with saved writing, uploads, and progression tracking."
}));
