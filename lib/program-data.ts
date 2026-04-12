export type StepStatus = "current" | "locked" | "private";

export type ProgramStep = {
  number: number;
  slug: string;
  title: string;
  statement: string;
  summary: string;
  teaching: string;
  prompts: string[];
  reflection: string;
  video?: {
    title: string;
    src: string;
  };
  quiz?: {
    title: string;
    passingScore: number;
    questions: {
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  };
  status: StepStatus;
};

export const programSteps: ProgramStep[] = [
  {
    number: 1,
    slug: "honest-surrender",
    title: "Honest Surrender",
    statement: "I admit that I have lost control over this behavior and that my life has been affected by it.",
    summary: "Begin with honesty instead of minimization or protective stories.",
    teaching:
      "Step 1 is where denial begins to break. It asks for something more serious than admitting that a habit is inconvenient. It asks you to face the truth that this behavior has been running parts of your life, shaping your choices, draining your peace, and narrowing your freedom. The point is not self-condemnation. The point is to stop bargaining with reality. Recovery cannot begin while the mind is still explaining away what the heart already knows. This step becomes powerful when you look honestly at the cycle itself: the tension before, the false relief during, and the cost afterward. When you finally stop calling chaos control, the ground under you changes.",
    prompts: [
      "When does the urge arise and what tends to trigger it?",
      "How do you feel before, during, and after the behavior?",
      "What has this behavior cost you already, and what might it cost if nothing changes?"
    ],
    reflection: "What has this behavior cost me that I can never get back?",
    video: {
      title: "Step 1 Video Teaching",
      src: "/Understanding_Step_1.mp4"
    },
    quiz: {
      title: "Step 1 Video Check",
      passingScore: 10,
      questions: [
        {
          question:
            "According to the teaching from the video, why is Step 1 often perceived as a painful experience?",
          options: [
            "A. Because it demands immediate perfection in behavior starting on the first day.",
            "B. Because it is an inherently cruel process designed to break the spirit.",
            "C. Because it forces an honest confrontation with reality and pulls one out of fantasy.",
            "D. Because it focuses on self-hatred and past failures."
          ],
          correctAnswer: "C"
        },
        {
          question:
            "The teaching suggests that simply admitting a behavior is 'unhealthy' or 'embarrassing' is insufficient for recovery. What deeper action does Step 1 require?",
          options: [
            "A. Publicly declaring the problem to everyone in one's life immediately.",
            "B. The development of a complex strategy to manage the behavior better.",
            "C. The ability to explain the psychological origins of the behavior.",
            "D. A complete surrender to the truth and the cessation of bargaining."
          ],
          correctAnswer: "D"
        },
        {
          question:
            "According to the cycle described in the video, what usually precedes the unwanted behavior?",
          options: [
            "A. The immediate experience of shame and regret.",
            "B. A sudden burst of energy and overconfidence.",
            "C. A logical decision that the behavior is the best course of action.",
            "D. Feelings of tension, loneliness, fear, or emptiness."
          ],
          correctAnswer: "D"
        },
        {
          question:
            "What is described as one of the 'deepest costs' of remaining in the cycle of unwanted behavior?",
          options: [
            "A. The physical decline in health and loss of sleep.",
            "B. Becoming physically absent from friends and family.",
            "C. The loss of the ability to trust oneself.",
            "D. The loss of financial resources and practical momentum."
          ],
          correctAnswer: "C"
        },
        {
          question:
            "How does the teaching from the video define the role of Step 1 in the overall recovery program?",
          options: [
            "A. It is a temporary phase that should be moved past as quickly as possible.",
            "B. It is the foundation that makes the rest of the program possible.",
            "C. It is a performance required to impress others in the program.",
            "D. It is the final goal that marks the end of the journey."
          ],
          correctAnswer: "B"
        },
        {
          question:
            "Based on the video's teaching script, what does the behavior 'promise' to provide, and why is this promise false?",
          options: [
            "A. It promises excitement, but it actually causes physical exhaustion.",
            "B. It promises relief or solution, but only interrupts pain while deepening the underlying pattern.",
            "C. It promises to reconnect me with others, but it actually damages trust.",
            "D. It promises to help me face my fears, but it actually makes me more fearful."
          ],
          correctAnswer: "B"
        },
        {
          question:
            "Why is Step 1 described as an 'offense to pride' in the teaching script?",
          options: [
            "A. Because it forces a public admission of failure in front of peers.",
            "B. Because it requires acknowledging that one is a bad person.",
            "C. Because it challenges the belief that one can manage and save oneself alone.",
            "D. Because it requires adopting religious language that may feel uncomfortable."
          ],
          correctAnswer: "C"
        },
        {
          question:
            "What shift in terminology does the video suggest occurs during Step 1?",
          options: [
            "A. Stop calling 'addiction' a 'disease.'",
            "B. Stop calling a 'habit' a 'choice.'",
            "C. Stop calling 'chaos' a 'choice' and 'bondage' 'freedom.'",
            "D. Stop calling 'mistakes' 'failures.'"
          ],
          correctAnswer: "C"
        },
        {
          question:
            "According to the teaching script, what happens the moment an individual stops defending their behavior?",
          options: [
            "A. They become defenseless and more vulnerable to the behavior.",
            "B. They become reachable, teachable, and open to help.",
            "C. They lose their sense of identity and self-worth.",
            "D. They immediately feel a sense of total relief and joy."
          ],
          correctAnswer: "B"
        },
        {
          question:
            "What does the phrase 'clean truth is better than dirty confusion' imply in the context of the video's teaching?",
          options: [
            "A. That confusion is a sign of a moral failing that must be scrubbed away.",
            "B. That one must physically clean their environment to begin recovery.",
            "C. That recovery is a simple process of following clear, 'clean' rules.",
            "D. That honesty, even if painful, provides a solid and clear ground for recovery."
          ],
          correctAnswer: "D"
        }
      ]
    },
    status: "current"
  },
  {
    number: 2,
    slug: "opening-to-hope",
    title: "Opening to Hope",
    statement: "I believe change is possible through something greater than my willpower.",
    summary: "Open to the possibility of help, healing, and support beyond isolation.",
    teaching:
      "Step 2 is the return of hope, but not shallow optimism. It is the slow willingness to believe that you are not doomed to repeat the same pattern forever. This step asks you to admit that self-will has not been enough and that real help must come from beyond yourself. In this program, that help is spoken of as a Higher Power, and many people will understand that as God. Someone who does not yet know what they believe does not have to pretend certainty, but they do need honesty, humility, and openness. Step 2 is not asking for a polished theology. It is asking whether you are willing to stop acting as if you are your own savior. Recovery begins to deepen when a person becomes willing to seek real help instead of worshipping their own exhausted strength.",
    prompts: [
      "What would it mean to stop fighting this entirely on your own?",
      "Where have you already seen evidence that change is possible?",
      "What kinds of help are hardest for you to accept?"
    ],
    reflection: "What would it mean to stop fighting this alone?",
    video: {
      title: "Step 2 Video Teaching",
      src: "/Doorway_to_Hope__Step_2.mp4"
    },
    quiz: {
      title: "Step 2 Video Check",
      passingScore: 10,
      questions: [
        {
          question:
            "Based on the concepts in the teaching video, how is the 'hope' found in Step 2 specifically described?",
          options: [
            "A. A shallow optimism that everything will turn out fine.",
            "B. A feeling of being immediately rescued from fear and shame.",
            "C. The slow willingness to believe one is not doomed to a cycle.",
            "D. A form of positive thinking used to override negative emotions."
          ],
          correctAnswer: "C"
        },
        {
          question:
            "According to the teaching, why does a person often feel more afraid after completing Step 1?",
          options: [
            "A. Because denial has broken and the problem now stands in the light.",
            "B. Because they are forced to adopt a polished theology immediately.",
            "C. Because they have lost their sense of responsibility.",
            "D. Because they must rely on their own willpower more aggressively."
          ],
          correctAnswer: "A"
        },
        {
          question:
            "What is described as the 'major spiritual shift' that occurs in Step 2?",
          options: [
            "A. Achieving perfect faith and the total removal of doubt.",
            "B. Ceasing to ask the exhausted self to be the ultimate rescuer.",
            "C. Becoming entirely passive and waiting for a miracle.",
            "D. Committing to work harder and manage one's life better."
          ],
          correctAnswer: "B"
        },
        {
          question:
            "In the context of the teaching video, how does 'pride' manifest in a way that is not traditionally arrogant?",
          options: [
            "A. By rejecting the concept of a Higher Power entirely.",
            "B. By appearing tired, ashamed, or desperate while insisting on handling things alone.",
            "C. By constantly seeking the advice of others.",
            "D. By being overly optimistic about the future despite clear problems."
          ],
          correctAnswer: "B"
        },
        {
          question:
            "What does the teaching video suggest is the 'beginning of sanity'?",
          options: [
            "A. When a person finally gains full control over their compulsions.",
            "B. When all skepticism regarding spiritual intervention disappears.",
            "C. When a person stops expecting self-will to provide what it wasn't designed to provide.",
            "D. When a person can successfully explain their new theology."
          ],
          correctAnswer: "C"
        },
        {
          question:
            "According to the script, what is the 'worship of self-sufficiency'?",
          options: [
            "A. Treating oneself as the highest authority and final source of strength.",
            "B. Taking personal responsibility for one's actions and decisions.",
            "C. A healthy reliance on one's innate talents and strengths.",
            "D. The belief that discipline is the primary key to recovery."
          ],
          correctAnswer: "A"
        },
        {
          question:
            "The teaching video describes Step 2 as 'realism of a higher kind.' Why?",
          options: [
            "A. It proves that willpower is a decorative rather than functional tool.",
            "B. It provides a scientific explanation for behavioral change.",
            "C. It acknowledges that deep problems require help that is equally deep.",
            "D. It accepts that some people are beyond the reach of help."
          ],
          correctAnswer: "C"
        },
        {
          question:
            "What role does willpower play after a person moves into Step 2?",
          options: [
            "A. It is discarded entirely as a useless or harmful human trait.",
            "B. It becomes the primary driver of spiritual transformation.",
            "C. It is used to make decisions and take actions without being the 'savior'.",
            "D. It is redirected to help the person manage their own recovery alone."
          ],
          correctAnswer: "C"
        },
        {
          question:
            "True or False: Step 2 requires a person to stop feeling skeptical or resistant before they can seek help.",
          options: ["A. True", "B. False"],
          correctAnswer: "B"
        },
        {
          question:
            "According to the teaching, where does hopelessness often grow?",
          options: [
            "A. In people who have too much faith in others.",
            "B. Where isolation and pride are allowed to thrive.",
            "C. In environments where rules are too strict.",
            "D. Only in those who do not believe in a specific religion."
          ],
          correctAnswer: "B"
        }
      ]
    },
    status: "locked"
  },
  {
    number: 3,
    slug: "choosing-change",
    title: "Choosing Change",
    statement: "I make a deliberate decision to commit to this process.",
    summary: "Recovery becomes concrete when you choose the path, not only the idea of it.",
    teaching:
      "Step 3 is where recovery stops being an interesting thought and becomes a real decision. Many people linger between wanting change and choosing it. This step asks for movement. It does not require that fear disappear first. It asks whether you are willing to place your life, your behavior, and your future into the care of a path greater than your impulses and greater than your own unstable will. For many, this is understood as turning toward God in trust rather than continuing to lean on self-rule. Someone may still be early in faith, but the step remains the same: stop making your own will the highest authority. Commitment here is not loud. It is quiet, serious, and lived.",
    prompts: [
      "What are you deciding to do differently now?",
      "What resistance is still present?",
      "What support structure will help you keep this decision?"
    ],
    reflection:
      "What would it mean to be a person who chooses differently?",
    status: "locked"
  },
  {
    number: 4,
    slug: "deep-inventory",
    title: "The Deep Inventory",
    statement: "I take a thorough, honest, compassionate look at myself.",
    summary: "A private trauma-aware inventory of patterns, fears, harm, and early wounds.",
    teaching:
      "Step 4 is not a performance of guilt. It is a deep moral and emotional inventory that asks you to see yourself with courage and with compassion at the same time. This work takes time because it goes beneath surface behavior into resentment, fear, dishonesty, shame, control, wounds, and recurring patterns. Many people want to rush this part or make it mechanical because it touches tender places. But this step is where hidden material begins to lose its power. What remains unnamed keeps influencing us from the dark. Step 4 brings it into the light carefully enough that truth can heal instead of overwhelm.",
    prompts: [
      "What patterns repeat across your relationships and behavior?",
      "Where has fear shaped your choices or dishonesty?",
      "What early experiences may have created wounds this behavior tried to soothe?"
    ],
    reflection: "What have I been protecting that no longer needs protecting?",
    status: "private"
  },
  {
    number: 5,
    slug: "speaking-the-truth",
    title: "Speaking the Truth",
    statement: "I share my inventory with myself, my higher power, and one trusted person.",
    summary: "Step 5 moves private truth into spoken truth.",
    teaching:
      "Step 5 is where truth becomes relational and accountable. There are things that continue to poison us as long as they remain sealed inside. Shame grows in secrecy; it weakens when spoken in a safe and honest place before God, before yourself, and before one trusted person. This step is not about dramatic confession or emotional spectacle. It is about bringing hidden truth into the light so it no longer rules from the dark. To speak the truth aloud is to stop hiding behind image, pride, and fear. In this step, honesty becomes embodied. What was hidden begins to loosen. What was frozen begins to move.",
    prompts: [
      "What part of your inventory is hardest to say out loud?",
      "Who is safe enough to hear this with respect and confidentiality?",
      "What shifted after you spoke honestly?"
    ],
    reflection: "What surprised me when I told the truth aloud?",
    status: "locked"
  },
  {
    number: 6,
    slug: "ready-for-change",
    title: "Ready for Change",
    statement: "I become willing to release the patterns driving my behavior.",
    summary: "Willingness matters even before confidence does.",
    teaching:
      "Step 6 asks whether you are truly ready to be changed, not just rescued from consequences. Many patterns survive because they still feel useful. They protect, numb, distract, inflate, or defend. This step asks you to notice the ways you still cling to what harms you because part of you still believes it is necessary. Willingness is a profound spiritual posture. It means you stop arguing for the right to stay the same and stop defending the very thing that is ruining you. You may not yet know how change will happen, but you become open to God removing what you can no longer heal by self-effort alone.",
    prompts: [
      "Which patterns are you most ready to change?",
      "What does each pattern still protect you from?",
      "What would you fear losing if the pattern changed?"
    ],
    reflection: "What am I still asking the old pattern to do for me?",
    status: "locked"
  },
  {
    number: 7,
    slug: "asking-for-help",
    title: "Asking for Help",
    statement: "With humility, I ask for support in being changed.",
    summary: "Recovery grows through humility, connection, and help-seeking.",
    teaching:
      "Step 7 is the practice of humility. Humility is not humiliation or self-erasure. It is the honest recognition that you cannot force transformation through ego alone. This step teaches a different kind of strength: the strength to ask, to receive, to soften, and to become teachable before God and before truth. The defects and reactions that once felt fused with your identity are no longer treated as permanent. You begin to stand without pretending to be self-sufficient. Step 7 says change is not conquered by pride; it is received through surrender, prayer, and a willing heart.",
    prompts: [
      "What kind of help do you need right now?",
      "How do pride or shame make support harder to receive?",
      "Who can you contact when you feel yourself slipping?"
    ],
    reflection: "What would humility look like in practice this week?",
    status: "locked"
  },
  {
    number: 8,
    slug: "list-of-harm",
    title: "The List of Harm",
    statement: "I make a complete list of everyone I have harmed and become willing to make things right wherever I can.",
    summary: "Prepare to face relational harm without minimization or drama.",
    teaching:
      "Step 8 widens the lens from inner work to relational impact. Recovery cannot remain private forever because our behavior has touched other lives. This step is not meant to crush you under shame, nor is it meant to protect you with excuses. It asks for clarity. Who was harmed. How were they harmed. Where did neglect, dishonesty, absence, control, or self-absorption leave a mark. The list itself is an act of moral awakening. You begin to understand that healing includes becoming someone willing to face the consequences of their history with honesty and care.",
    prompts: [
      "Who appears in your inventory as someone harmed?",
      "What was the nature of the harm?",
      "How willing are you to make amends in each case?"
    ],
    reflection: "Where do I still resist seeing the full impact of my behavior?",
    status: "locked"
  },
  {
    number: 9,
    slug: "making-amends",
    title: "Making Amends",
    statement: "I make direct amends wherever possible, except when doing so would cause harm.",
    summary: "Repair requires honesty, timing, and care.",
    teaching:
      "Step 9 turns willingness into repair. Amends are not apologies designed to relieve your own discomfort. They are acts of responsibility. This step asks what can genuinely be restored, acknowledged, repaid, or repaired without causing further harm. It requires timing, humility, and restraint. Not every wound can be fixed neatly, and not every person is safe or available for direct contact. But the spirit of the step remains: stop hiding from the impact of your life. To make amends is to become accountable in action, not just emotion.",
    prompts: [
      "What amend do you plan to make and why?",
      "What restitution, if any, is needed?",
      "How will you avoid causing new harm while trying to repair old harm?"
    ],
    reflection: "What does real repair require from me?",
    status: "locked"
  },
  {
    number: 10,
    slug: "daily-accountability",
    title: "Daily Accountability",
    statement: "I continue daily inventory and promptly acknowledge when I am wrong.",
    summary: "Maintenance becomes a daily rhythm, not a one-time insight.",
    teaching:
      "Step 10 is where recovery becomes a way of living instead of a memory of breakthrough moments. This step teaches ongoing honesty. You stop waiting for full collapse before telling the truth. You learn to notice irritation, secrecy, resentment, drift, ego, and self-deception earlier and earlier. The practice is not meant to become obsessive. It is meant to keep you awake. A daily inventory creates rhythm, and rhythm creates stability. In Step 10, humility becomes maintenance. You do not become perfect. You become responsive.",
    prompts: [
      "What questions belong in your daily review?",
      "When will you do this review each day?",
      "What helped you catch an old pattern early?"
    ],
    reflection: "What changes when I review the day honestly instead of avoiding it?",
    status: "locked"
  },
  {
    number: 11,
    slug: "inner-connection",
    title: "Inner Connection",
    statement: "I cultivate a regular practice of stillness and connection to my deeper self.",
    summary: "Stillness, prayer, reflection, or meditation become part of recovery.",
    teaching:
      "Step 11 is the discipline of making room for quiet guidance. The addiction cycle trains the mind toward urgency, noise, and reaction. This step trains you toward stillness, prayer, listening, and conscious contact with God rather than with craving or fear. Someone may begin this step awkwardly, uncertainly, or with very little language for prayer, but the direction still matters: become willing to seek real guidance instead of living under the dictatorship of impulse. Step 11 is where recovery becomes rooted, not just managed. Over time, stillness becomes a place of correction, strength, and peace.",
    prompts: [
      "What form of stillness or prayer feels available to you?",
      "What interferes with inner practice most often?",
      "How do you know when you are more connected?"
    ],
    reflection: "What helps me hear something deeper than panic or craving?",
    status: "locked"
  },
  {
    number: 12,
    slug: "living-it-forward",
    title: "Living It Forward",
    statement: "Having experienced genuine change, I carry this message to others and practice these principles in all areas of life.",
    summary: "The personal becomes communal through service and sponsorship.",
    teaching:
      "Step 12 carries recovery outward. What changed you is no longer yours alone. Service is not a performance of wisdom or superiority. It is gratitude in action. You begin to embody the truth that healing deepens when it is shared. This may look like sponsorship, service, listening, welcoming, building community, or simply living in a way that gives others hope. Step 12 is not graduation from the work. It is the moment the work begins to shape your whole life. The message is carried best by a person who keeps living it.",
    prompts: [
      "How can your experience support someone earlier in the process?",
      "What form of service feels honest and sustainable?",
      "How will you keep practicing these principles outside the program itself?"
    ],
    reflection: "What does it mean to live recovery rather than only talk about it?",
    status: "locked"
  }
];

export const communityChannels = [
  {
    name: "Step Questions",
    description: "Ask about assignments, blocks, and how to approach a step without giving directives."
  },
  {
    name: "Daily Check-In",
    description: "Post short reflections, resets, and encouragement around daily accountability."
  },
  {
    name: "Meeting Circle",
    description: "Track cohort starts, Zoom or Teams interest, and volunteer facilitation."
  },
  {
    name: "Sponsor Path",
    description: "Explore sponsor availability, matching priorities, and what good sponsorship looks like."
  }
] as const;

export const meetingSchedule = [
  {
    title: "Early Cohort",
    time: "Wednesdays 19:00 CET",
    focus: "Founder-led weekly progression through Steps 1 to 3."
  },
  {
    title: "Deep Work Circle",
    time: "Sundays 18:00 CET",
    focus: "Longer Step 4 and Step 5 support with privacy-first guidance."
  },
  {
    title: "Volunteer Track",
    time: "Monthly orientation",
    focus: "Preparation for members who may later sponsor or facilitate."
  }
] as const;

export const directoryResources = [
  ["Alcoholics Anonymous", "https://www.aa.org/"],
  ["Narcotics Anonymous", "https://na.org/"],
  ["Al-Anon Family Groups", "https://al-anon.org/"],
  ["Overeaters Anonymous", "https://oa.org/"],
  ["Gamblers Anonymous", "https://www.gamblersanonymous.org/ga/"],
  ["Cocaine Anonymous", "https://ca.org/"],
  ["Crystal Meth Anonymous", "https://www.crystalmeth.org/"],
  ["Codependents Anonymous", "https://coda.org/"],
  ["Sex Addicts Anonymous", "https://saa-recovery.org/"],
  ["Sex and Love Addicts Anonymous", "https://slaafws.org/"],
  ["Adult Children of Alcoholics and Dysfunctional Families", "https://adultchildren.org/"],
  ["Emotions Anonymous", "https://emotionsanonymous.org/"],
  ["Debtors Anonymous", "https://debtorsanonymous.org/"],
  ["Underearners Anonymous", "https://www.underearnersanonymous.org/"]
] as const;
