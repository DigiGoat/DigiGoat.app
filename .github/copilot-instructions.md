# `DigiGoat.app` Copilot Instructions

This repository (`DigiGoat.app`) is part of **DigiGoat**, a collection of repositories that work together as one product.

## DigiGoat Structure (Repo Roles)

DigiGoat consists primarily of:

- **`DigiGoat/client-app`**: The desktop app (Angular + Electron) used by customers to manage their farm website content, repos, and publishing workflow.
- **`DigiGoat/web-ui`**: The website template (Angular) that farm sites are built from. The app fills it using JSON content. Customer sites are typically forks of `web-ui` and deploy their own builds.
- **`DigiGoat/DigiGoat.app` (this repo)**: The **public, user-facing documentation site** hosted at `https://digigoat.app/`. This repo explains how to use DigiGoat (the product), including onboarding, workflows, FAQ/troubleshooting, and legal pages (e.g., Terms, Privacy).

If you’re making changes and it’s unclear which repo they belong in:

- **Docs/how-to text → `DigiGoat.app`**
- **Behavior/UI of the desktop editor → `client-app`**
- **Behavior/UI of the generated websites → `web-ui`**

When referencing other repos in documentation, link to **product concepts** first, and only reference repo names when needed for advanced users/developers.

---

## Versioning & Branching Model (IMPORTANT)

`DigiGoat.app` is the exception to the 3-branch (development/beta/main) pipeline used elsewhere:

- `DigiGoat.app` uses **two branches**:
  - `development`: all changes land here first
  - `main`: production branch

Guidelines:

- Create feature branches off `development`.
- Open PRs **into `development`** unless explicitly releasing.
- Merge `development` → `main` only when ready to publish the docs site.

Versioning:

- `DigiGoat.app` does **not** use the `-beta.x` version suffix pipeline.
- Don’t bump versions unless the repo already enforces it (and if it does, follow existing patterns in `CHANGELOG.md` and `package.json`).

---

## Primary Goal: Great Documentation

This repo is a documentation product. Optimize for:

- **Clarity over cleverness**
- **Step-by-step workflows**
- **Screenshots/visual cues** when applicable (if the repo supports them)
- **Consistency** in terminology and UI labels (match the app exactly)
- **Safe guidance**: avoid telling users to do destructive steps without warning and backups

### Writing standards

- Use short sections and headings; prefer checklists and tables for complex flows.
- When documenting UI steps, use consistent phrasing:
  - “In the left sidebar, select **Settings**.”
  - “Click **Deploy**.”
- When listing files/paths/branches, use inline code formatting: `development`, `main`, `settings.json`.
- Avoid vague instructions like “just” or “simply” (nothing is simple at 2am).

### Content structure conventions

When adding new docs:

- Add/verify navigation links (sidebar/header routes) so users can actually find the page.
- Ensure the new page is reachable from at least one “hub” page (Getting Started / FAQ / Troubleshooting).
- Prefer adding content to an existing section over creating a brand-new top-level section, unless it’s truly a new category.

### Legal pages (Privacy / Terms)

If editing legal/contract text:

- Keep changes minimal and precise.
- Preserve formatting and section numbering when possible.
- Do not “summarize” legal text unless the existing structure explicitly includes a non-binding summary section.

---

## Tech & Code Style (Angular-first)

This repo is an Angular site (e.g., `privacy-policy.component.html`, `terms-of-service.component.html`). Follow these rules:

### Angular conventions

- Prefer Angular features over manual DOM manipulation.
- Use Angular Router navigation (e.g., `routerLink`) rather than raw `<a href>` **for internal links** UNLESS using a url fragment for the current page, in which case you need to consider the fact that a `base` href is set so internal href fragments must include the full path, even for local links (e.g., `<a href="/features#section-id">`).
- Use `<a href="https://...">` only for **external** destinations.
- Keep components small: if a page grows too large, split into subcomponents.
- Prefer shared UI patterns (layout components, shared modules) rather than duplicating markup.

### Styling conventions

- Use **Bootstrap utility classes** wherever possible.
- Add custom CSS/SCSS only when necessary, and keep it scoped to the component. If it can be done with bootstrap classes, do that instead.
- Avoid hard-coded pixel values unless needed for a specific layout bug.

### Formatting rules

Match the existing project style:

- **Single quotes** for strings
- **Semicolons**
- **2 spaces** indentation
- Avoid reformatting unrelated files

---

## CI / Deploy / Sync Expectations

This repo has automation for:

- Deploying the docs site (`deploy.yml`)
- Onboarding new users (`onboarding.yml`)

Rules:

- Do not break the build: documentation changes should compile cleanly.
- If you change routes, navigation, or assets, verify the deploy workflow assumptions (base href, asset paths, etc.).
- Avoid introducing new runtime dependencies unless there’s a clear need.

---

## Common “Gotchas” to Avoid

- Don’t rename routes/paths without updating:
  - navigation menus
  - internal links
  - any “Getting Started” references
- Don’t document features that aren’t shipped yet (unless clearly marked as **Beta** / **Coming Soon**).
- Don’t copy/paste UI text: match the actual app labels (capitalization matters).
- Don’t add internal app links using `href` that cause full reloads; use `routerLink` for internal navigation.
- When making suggestions, apply them automatically rather than just commenting unless specifically instructed to "output" the change

---

## Testing / Verification (What to Run)

Prefer the repo’s existing scripts. Typical expectations:

- Build should pass
- Lint should pass

If the repo supports tests, run them—but docs repos often rely primarily on build/lint. Note that scripts should be run via `yarn build`, `yarn lint`, etc., NOT via the vscode tasks, those are for debugging sessions only.

---

## When You Need Cross-Repo Context

If documentation depends on implementation details:

- Confirm whether the behavior lives in `client-app` or `web-ui`.
- Prefer documenting **user-visible behavior** over internal implementation (unless the page is explicitly “Developer Docs”).
- To access code from other repos, use the "DigiGoat" Github Space owned by the DigiGoat organization via the Github MCP

---

## Quick glossary (keep terms consistent)

- **DigiGoat**: the product (desktop app + website template + documentation).
- **client-app**: the desktop editor/manager.
- **web-ui**: the website template source.
