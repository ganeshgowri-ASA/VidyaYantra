# VidyaYantra (विद्यायन्त्र) - Product Requirements Document

## 1. Product Overview

**Product Name:** VidyaYantra (विद्यायन्त्र)
**Tagline:** "The Interactive Knowledge Engine"
**Version:** 1.0.0
**Date:** March 19, 2026

### 1.1 Vision
Build the world's most interactive L&D (Learning & Development) portal that combines the best features of Coursera, LinkedIn Learning, Udemy, and Educative.io — with a radical focus on hands-on practice, live coding sandboxes, AI-powered tutoring, and gamification.

### 1.2 Problem Statement
Existing L&D platforms suffer from:
- **Passive learning** — Video-heavy content with low engagement
- **No hands-on practice** — Learners watch but don't build
- **High dropout rates** — 85-95% course non-completion
- **No AI assistance** — Learners get stuck with no real-time help
- **Weak career integration** — Certificates without skill validation

### 1.3 Solution
VidyaYantra delivers 6 types of interactive exercises, in-browser coding sandboxes, an AI multi-LLM tutor (BudhiBot), gamification with Sanskrit-themed leveling, and enterprise-ready career integration.

---

## 2. Target Users

| Persona | Description | Key Need |
|---------|-------------|----------|
| **Shishya (Learner)** | Individual learner, student, career switcher | Interactive learning, affordable pricing |
| **Acharya (Instructor)** | Subject expert, course creator | Easy authoring, revenue sharing |
| **Vyavastha (Enterprise Admin)** | L&D manager, HR team | Team analytics, SSO, SCORM |
| **Sahayak (Mentor)** | Teaching assistant, peer mentor | Code review tools, mentorship |

---

## 3. Core Features (5 Pillars)

### Pillar 1: Course Engine (Vidya)
- Module > Lesson > Activity hierarchy
- Video lessons with chapter markers and transcripts
- Rich text lessons with embedded media
- Instructor marketplace with 70/30 revenue sharing
- Course ratings, reviews, and recommendations
- Learning paths and specializations
- Progress tracking and bookmarks

### Pillar 2: Interactive Engine (CodeYantra)
- **Monaco Editor** (VS Code engine) in-browser IDE
- **WebContainers** (StackBlitz SDK) for full Node.js runtime
- **6 Exercise Types:**
  1. Code Challenge — Write code, run tests, pass/fail
  2. Fill-in-the-Blank — Complete partial code snippets
  3. Drag-and-Drop — Arrange code blocks in correct order
  4. Debug Challenge — Find and fix bugs in broken code
  5. SQL Playground — Write queries against live databases
  6. API Testing Lab — Build and test REST/GraphQL endpoints
- Live preview pane for frontend exercises
- Multi-language support: JavaScript, TypeScript, Python, SQL, React, HTML/CSS

### Pillar 3: AI Tutor (BudhiBot)
- Context-aware AI assistant in every lesson
- Multi-LLM backend: OpenAI GPT-4, Claude, Gemini
- **Modes:**
  - Socratic Mode — Guides with questions, not answers
  - Code Review — Analyzes learner code, suggests improvements
  - Practice Generator — Creates custom exercises from lesson content
  - Explain Like I'm 5 — Simplifies complex concepts
- Conversation history per lesson
- Smart hint system (progressive hints before full solution)

### Pillar 4: Gamification (Kreeda)
- **Sanskrit-themed Leveling:**
  - Level 1: Shishya (Student) — 0-500 XP
  - Level 2: Sadhak (Practitioner) — 500-2000 XP
  - Level 3: Vidwan (Scholar) — 2000-5000 XP
  - Level 4: Acharya (Teacher) — 5000-15000 XP
  - Level 5: Guru (Master) — 15000+ XP
- XP earned per: exercise completion, quiz score, streak bonus, peer help
- Achievement badges (50+ unique badges)
- Daily/Weekly challenges
- Streak tracking (consecutive learning days)
- Leaderboards (global, course-level, organization)

### Pillar 5: Career Integration (Karma)
- Skill portfolio builder
- Shareable digital certificates with verification
- LinkedIn profile integration
- Recruiter-visible skill scores
- Enterprise dashboards with team analytics
- SSO (SAML/OIDC) and SCORM/xAPI support
- Custom learning paths per organization

---

## 4. Technical Architecture

### 4.1 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 15 (App Router) | SSR, RSC, performance |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI development |
| Code Editor | Monaco Editor | VS Code quality editing |
| Sandbox | WebContainers (StackBlitz) | In-browser Node.js |
| State | Zustand | Lightweight state management |
| Backend | tRPC | Type-safe API layer |
| ORM | Prisma | Type-safe database access |
| Database | PostgreSQL (Railway) | Relational data |
| Cache | Redis (Upstash) | Session, leaderboard |
| Auth | NextAuth.js v5 | Google, GitHub, LinkedIn |
| AI | OpenAI + Claude + Gemini APIs | Multi-LLM tutor |
| Payments | Stripe | Subscriptions, marketplace |
| File Storage | Cloudflare R2 / AWS S3 | Video, assets |
| Search | Meilisearch | Full-text course search |
| Analytics | PostHog | Product analytics |
| Hosting | Vercel | Auto-deploy from GitHub |
| CI/CD | GitHub Actions | Lint, test, deploy |

### 4.2 Database Schema (Key Entities)

```
User, Course, Module, Lesson, Activity, Exercise,
Submission, Progress, Achievement, Badge, XPLog,
Certificate, Review, Enrollment, Organization,
Team, Subscription, Payment, Conversation, Message
```

### 4.3 Route Architecture

```
/ — Landing page
/explore — Course catalog
/course/[slug] — Course detail
/course/[slug]/learn/[lessonId] — Learning interface
/playground — Free coding sandbox
/dashboard — Learner dashboard
/dashboard/achievements — Badges & XP
/dashboard/certificates — Earned certificates
/instructor — Instructor studio
/instructor/course/[id]/edit — Course editor
/admin — Enterprise admin panel
/api/trpc/* — tRPC API routes
/api/auth/* — NextAuth routes
/api/webhooks/stripe — Payment webhooks
```

---

## 5. Development Phases

### Phase 1: Nirmaan (Foundation) — Weeks 1-3
- [x] Project scaffolding (Next.js 15, TypeScript, Tailwind)
- [ ] Authentication (NextAuth.js v5)
- [ ] Database schema (Prisma + PostgreSQL)
- [ ] Landing page with course catalog
- [ ] User dashboard shell

### Phase 2: Vidya (Knowledge) — Weeks 4-6
- [ ] Course CRUD for instructors
- [ ] Module/Lesson/Activity hierarchy
- [ ] Video player with chapters
- [ ] Rich text lesson editor
- [ ] Progress tracking

### Phase 3: Yantra (Engine) — Weeks 7-10
- [ ] Monaco Editor integration
- [ ] WebContainers sandbox
- [ ] 6 exercise types implementation
- [ ] Test runner and auto-grading
- [ ] Live preview pane

### Phase 4: Buddhi (Intelligence) — Weeks 11-13
- [ ] BudhiBot AI tutor integration
- [ ] Multi-LLM routing
- [ ] Socratic mode and code review
- [ ] Gamification system (XP, levels, badges)
- [ ] Leaderboards

### Phase 5: Sangha (Community) — Weeks 14-16
- [ ] Discussion forums per course
- [ ] Live coding sessions (WebRTC)
- [ ] Peer code review
- [ ] Mentor matching

### Phase 6: Karma (Career) — Weeks 17-19
- [ ] Certificate generation
- [ ] Portfolio builder
- [ ] LinkedIn integration
- [ ] Enterprise SSO/SCORM
- [ ] Stripe payments and marketplace

### Phase 7: Siddhi (Perfection) — Weeks 20-22
- [ ] Performance optimization
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Mobile responsiveness
- [ ] Load testing
- [ ] Security audit
- [ ] Production launch

---

## 6. Success Metrics

| Metric | Target | Industry Avg |
|--------|--------|-------------|
| Course completion rate | 45%+ | 5-15% |
| Daily active users | 10K+ (Month 6) | — |
| Exercise completion rate | 70%+ | — |
| AI tutor satisfaction | 4.5/5 | — |
| Time-to-first-exercise | < 30 seconds | — |
| Instructor revenue per course | $5K+ (Year 1) | — |

---

## 7. Git Conventions

### Branch Naming
- `feature/nirmaan-auth` — Feature branches with phase name
- `fix/yantra-sandbox-crash` — Bug fixes
- `docs/prd-update` — Documentation

### Commit Messages (Sanskrit-themed)
- `nirmaan: scaffold Next.js project`
- `vidya: add course CRUD API`
- `yantra: integrate Monaco Editor`
- `buddhi: implement BudhiBot AI tutor`

---

## 8. Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# AI
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_AI_API_KEY=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Storage
R2_ACCESS_KEY=
R2_SECRET_KEY=
R2_BUCKET_URL=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
```

---

*विद्या ददाति विनयम् — Knowledge gives humility.*
*Built with the Srishti Workflow.*
