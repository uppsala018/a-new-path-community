# A New Path Community Roadmap

## Current Position

The project has moved beyond the original prototype stage.

What is already in place:

- public homepage and content sections
- learn, steps, assignments, traditions, sponsorship, FAQ, resources, and support pages
- Supabase-backed signup, login, logout, and session handling
- member workspace with locked step progression
- step prompt answers and reflection answers
- server-side draft saving
- uploads saved through Supabase Storage
- community posting and post replies
- daily Step 10 check-in history

The member area now works, but it still needs production-level polish and operational depth.

## Recommended Build Order

1. Finish the member experience.
2. Deploy cleanly to Vercel.
3. Connect Stripe for voluntary support.
4. Add sponsor, facilitator, and moderation tools.
5. Upgrade the data model where needed for scale and admin workflows.

## Phase 1: Finish The Member Experience

Goal: make the member area feel complete, calm, and trustworthy before deployment.

- polish spacing, hierarchy, and typography across the full member workspace
- make forum threads, replies, and composer feel more intentional
- improve uploads area and file handling clarity
- add clearer completion feedback and saved-state messaging
- add progress-return cues so members know where to continue
- refine recovery language on every member interaction

## Phase 2: Deployment And Production Stability

Goal: move from localhost to a stable hosted version.

- connect the project to GitHub if needed
- deploy to Vercel
- add production environment variables in Vercel
- verify Supabase auth cookies and redirects in production
- connect a real domain if desired
- test member signup, login, saving, uploads, and replies on the live site

## Phase 3: Stripe And Tradition 7 Support Flow

Goal: add voluntary giving in a simple and trustworthy way.

- build the support flow around Tradition 7 language
- connect Stripe for voluntary contributions
- add success and cancellation pages
- add clear explanation of what support pays for
- keep support optional and separate from core access

## Phase 4: Sponsor, Facilitator, And Moderation Tools

Goal: support real community operations safely.

- add sponsor request flow
- add facilitator and moderator roles
- add community moderation actions and reporting
- add safer admin views for posts, replies, and member flags
- add basic internal oversight without breaking the anonymous-friendly tone

## Phase 5: Data Model Upgrades

Goal: prepare for scale and better admin tooling.

- split forum threads and replies into richer relational structures if needed
- replace the single JSON progress document with more granular assignment tables if needed
- add better auditability for uploads, posts, and moderation actions
- prepare for notifications, reminders, and member history views

## Immediate Next Slice

The next practical slice should be:

- finish member area polish
- stabilize the preferred local preview flow
- prepare the repo for Vercel deployment

## Local Preview Guidance

For this project, the most stable preview flow is usually:

1. `npm run build`
2. `npm run start`

Use that when `next dev` becomes unstable on Windows.
