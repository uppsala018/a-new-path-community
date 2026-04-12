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
    status: "current"
  },
  {
    number: 2,
    slug: "opening-to-hope",
    title: "Opening to Hope",
    statement: "I believe change is possible through something greater than my willpower.",
    summary: "Open to the possibility of help, healing, and support beyond isolation.",
    teaching:
      "Step 2 is the return of hope, but not shallow optimism. It is the slow willingness to believe that you are not doomed to repeat the same pattern forever. This step does not demand perfect certainty or a rigid belief system. It asks whether you can loosen your grip on the lie that isolation is strength. Something greater than your current willpower may be a higher power, a recovery process, a fellowship, truth itself, or the wisdom of people who have walked this road before you. What matters is this: your private system has not been enough. Step 2 opens the door to the possibility that help can reach you if you stop insisting on saving yourself alone.",
    prompts: [
      "What would it mean to stop fighting this entirely on your own?",
      "Where have you already seen evidence that change is possible?",
      "What kinds of help are hardest for you to accept?"
    ],
    reflection: "What would it mean to stop fighting this alone?",
    status: "locked"
  },
  {
    number: 3,
    slug: "choosing-change",
    title: "Choosing Change",
    statement: "I make a deliberate decision to commit to this process.",
    summary: "Recovery becomes concrete when you choose the path, not only the idea of it.",
    teaching:
      "Step 3 is where recovery stops being an interesting thought and becomes a real decision. Many people linger between wanting change and choosing it. This step asks for movement. It does not require that fear disappear first. It asks whether you are willing to place your life, your behavior, and your future into a different pattern than the one that has ruled you until now. Commitment here is not loud. It is quiet, serious, and lived. You begin to organize your choices around recovery instead of organizing recovery around your impulses. Step 3 is the turning of the body, not just the mind.",
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
      "Step 5 is where truth becomes relational. There are things that continue to poison us as long as they remain sealed inside. Shame grows in secrecy; it weakens when spoken in a safe and honest place. This step is not about dramatic confession or emotional spectacle. It is about allowing what is real to be witnessed without disguise. To speak the truth aloud is to stop carrying the illusion that you must hide in order to survive. In this step, honesty becomes embodied. What was hidden begins to loosen. What was frozen begins to move.",
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
      "Step 6 asks whether you are truly ready to be changed, not just rescued from consequences. Many patterns survive because they still feel useful. They protect, numb, distract, inflate, or defend. This step asks you to notice the ways you still cling to what harms you because part of you believes it is necessary. Willingness is a profound spiritual posture. It means you stop arguing for the right to stay the same. You may not yet know how change will happen, but you become open to no longer worshipping the pattern that has ruled you.",
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
      "Step 7 is the practice of humility. Humility is not humiliation or self-erasure. It is the honest recognition that you cannot force transformation through ego alone. This step teaches a different kind of strength: the strength to ask, to receive, to soften, and to become teachable. The defects and reactions that once felt fused with your identity are no longer treated as permanent. You begin to stand before truth without pretending to be self-sufficient. Step 7 says change is not conquered; it is received, lived, and practiced in relationship.",
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
      "Step 11 is the discipline of making room for quiet guidance. The addiction cycle trains the mind toward urgency, noise, and reaction. This step trains you toward stillness, listening, and conscious contact with something deeper than craving or fear. The form may vary: prayer, meditation, silence, breath, reflection, scripture, journaling, or simple attentive presence. What matters is that you begin to live from an inner center rather than from constant impulse. Step 11 is where recovery becomes rooted, not just managed.",
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
