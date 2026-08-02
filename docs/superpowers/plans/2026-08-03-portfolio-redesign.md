# Career-Focused Portfolio Redesign Implementation Plan

**Goal:** Replace the existing single-file template portfolio with a polished, recruiter-ready static portfolio for Nguyen Luu Tan Sang.

**Architecture:** Keep GitHub Pages-compatible static HTML as the entry point. Move presentation rules to `styles.css` and lightweight project-filter/mobile-navigation behavior to `script.js`; keep all portfolio content in semantic HTML so the page works without a runtime API or build step.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript.

---

### Task 1: Rebuild the semantic portfolio page

**Files:**
- Modify: `index.html`

- [ ] Add accurate metadata, accessible navigation, hero, about, experience, projects, skills, education, certification, contact, and footer sections.
- [ ] Display only BidFlow, QuickFood, Secure Task and Document Management Platform, and SmartVN, with BidFlow first.
- [ ] Omit CV actions, images, LinkedIn, phone, live demos, and other unverifiable details when no repository evidence exists.

### Task 2: Add visual system and responsive layouts

**Files:**
- Create: `styles.css`

- [ ] Define a neutral warm palette with one cobalt accent, readable typography, focus states, cards, filter controls, and responsive breakpoints for desktop, tablet, and mobile.
- [ ] Respect `prefers-reduced-motion` and prevent sticky navigation from covering anchored headings.

### Task 3: Add client-side interaction

**Files:**
- Create: `script.js`

- [ ] Implement mobile-menu open/close behavior, escape-key handling, outside-click close, and project filtering through buttons and `data-track` attributes only.
- [ ] Keep the default filter as All and update accessible selected/hidden states without changing the URL.

### Task 4: Verify and commit

**Files:**
- Modify: `index.html`, `styles.css`, `script.js`

- [ ] Run syntax and static checks available for the repository, inspect the complete diff, verify links and asset references, and confirm no secret or unsupported project claim is introduced.
- [ ] Create one normal commit with message `feat(portfolio): redesign career-focused personal website`.
