# PhotoKB — Product Requirements Document (PRD)

> **Product:** PhotoKB — Photo & Signature Compressor  
> **Document:** PRD  
> **Version:** 1.0  
> **Status:** Build baseline  
> **Date:** 12 November 2026  
> **Primary markets:** Pakistan + worldwide  
> **Initial budget:** $0 target, using free tiers and a free hosting subdomain  
> **Source of truth:** `PhotoKB_Master_Project_Specification.md` (v1.1, LanX-inspired design edition)

---

## 1. Document purpose

This PRD defines **what PhotoKB must do, who it serves, and how product success will be judged**. It is intended for the product owner, Google AI Studio Build, frontend developer, QA tester, and whoever maintains the live website.

Terminology note: PRD means **Product Requirements Document** (not “Project Required Documents”). TRD means **Technical Requirements Document**.

## 2. Executive summary

PhotoKB is a free, responsive, single-page web utility that helps visitors compress a photo or signature to a requested maximum file size (for example, 20 KB, 50 KB, 100 KB, 200 KB, or 500 KB), optionally resize its dimensions, preview the result, and download it.

The initial audience includes people in Pakistan completing job, admission, scholarship, examination, and online application forms, as well as worldwide users who need smaller images for web forms, profile pictures, email attachments, or general uploads.

The product's core differentiators are:

- Compression happens locally in the visitor's browser; image bytes are not uploaded to PhotoKB or Supabase.
- Target-size presets plus a custom KB value.
- A focused photo and signature workflow.
- English as the default interface, with an Urdu/RTL option.
- A premium dark navy and electric-blue design inspired by the visual language of the LanX Framer reference, implemented with original PhotoKB assets and content.
- A simple static deployment architecture that can run without a backend.

## 3. Product problem and opportunity

Many online application portals impose file-size and dimension limits. Users may have an image that is visually correct but too large to upload. They need an understandable way to reduce the file size without installing software or creating an account.

PhotoKB addresses this task with a browser-based workflow. The opportunity is not “guaranteed high traffic”; existing tools create competition. PhotoKB must earn use through a clearer workflow, mobile usability, truthful output reporting, privacy, useful guidance, and relevant Urdu support.

## 4. Vision, positioning, and promise

**Vision:** Make preparing an image for an online form simple, private, and accessible.

**Positioning:** A free online photo and signature compressor for people who need a smaller image file and a clear result.

**Product promise:** “Compress your photo or signature to the size you need — privately, in your browser, for free.”

This promise may only be used while the production implementation truly processes image data locally and does not upload it to a remote service.

## 5. Target users and personas

### Persona A — Pakistan job applicant
- Often uses an Android phone.
- Needs a profile photo or scanned signature for a recruitment form.
- May be told to keep an image below a small KB limit.
- Values simple instructions, Urdu support, and immediate download.

### Persona B — Student / admission applicant
- Uses a phone or laptop to apply to a university, college, scholarship, or examination.
- May need to prepare multiple images at different times.
- Needs to understand both file size and pixel dimensions.

### Persona C — International form user
- Needs to reduce an image for an online form, profile, or email.
- Expects a straightforward English interface and common formats.
- Wants to know whether the target was actually reached.

### Persona D — Site owner / operator
- Builds and updates the product using Google AI Studio and GitHub.
- Deploys the static app using Cloudflare Pages.
- May optionally use Supabase for feedback and Adsterra for monetization.
- Needs simple operating procedures and must never access users' uploaded images.

## 6. Goals and measurable outcomes

### 6.1 Version 1 goals
1. Visitors can select or drop one supported image.
2. Visitors can choose a preset or custom maximum output size.
3. Visitors can optionally resize dimensions while preserving aspect ratio by default.
4. Compression is performed entirely in the browser.
5. The tool presents accurate before/after details and an honest target status.
6. Visitors can download a file whose extension matches its actual MIME type.
7. The page works on current desktop and mobile browsers.
8. Essential supporting trust pages and SEO metadata exist before public promotion.
9. The product can be built as a React + Vite static site and deployed from GitHub to Cloudflare Pages.

### 6.2 Success metrics
Track, where privacy-compliant and configured:
- Upload-to-result completion rate.
- Compression success rate by input format and browser.
- Download action rate.
- Frequency of “target not reached” outcomes.
- Client-side processing errors.
- Mobile interaction issues.
- Search impressions, organic clicks, queries, and landing-page performance in Google Search Console.
- Return use and helpful feedback.
- Advertising performance only after a publisher has approved the site and supplied valid reporting.

Do not promise a ranking position, number of visitors, Adsterra approval, CPM, or monthly income.

## 7. Scope

### 7.1 MVP / P0 — required for first usable launch
- Single-page, responsive PhotoKB website.
- One image at a time.
- Click-to-upload and drag-and-drop upload.
- JPEG/JPG, PNG, and WebP input support.
- File type, file-size, and image-dimension validation.
- 20 KB, 50 KB, 100 KB, 200 KB, and 500 KB presets.
- Custom positive target size.
- Original dimensions and file-size display.
- Maintain-aspect-ratio default; custom width and height.
- JPEG output and correct MIME/extension handling.
- Local canvas-based compression and resizing.
- Actual output-size check and truthful “within target” / “target not reached” result.
- Before/after preview, download, reset, and compress-another-image actions.
- All loading, success, warning, and error states.
- Accessible labels, focus styles, keyboard operation, and mobile layout.
- Visible privacy statement that matches the code.
- LanX-inspired visual direction using original assets and content.

### 7.2 P1 — should have for early public release
- Urdu interface toggle and right-to-left layout.
- WebP output when supported by the browser.
- PNG output where practical.
- Transparent PNG to JPEG background selector.
- Quality setting with plain-language explanation.
- Suggested dimension presets, clearly marked as examples and not universal official standards.
- Copy result details.
- Helpful how-to content and FAQ.
- About, Privacy Policy, Terms, and Contact pages.
- Search Console, robots.txt, sitemap.xml, canonical and social metadata.
- Optional feedback form, only if a secure backend path is configured.

### 7.3 P2 — later, based on real demand
- Batch compression and ZIP download.
- Crop and rotate tools.
- HEIC/HEIF support with a dependable decoder.
- More dimension presets based on sourced requirements.
- Web Worker processing for large files.
- Separate, useful SEO landing pages.
- Saved preferences or accounts (only if evidence supports them).

### 7.4 Explicit non-goals for v1
- No user registration or login.
- No admin dashboard.
- No cloud image storage.
- No image upload or server-side compression API.
- No AI image enhancement, OCR, face recognition, background removal, or identity verification.
- No subscriptions, payments, or paid downloads.
- No claim that any output is guaranteed to be accepted by a government, passport, visa, job, school, or university portal.
- No fake testimonials, review scores, customer counts, partner logos, or usage statistics.

## 8. Functional requirements

| ID | Requirement | Priority | Acceptance summary |
|---|---|---:|---|
| FR-001 | Upload by file picker | P0 | Supported image opens and displays. |
| FR-002 | Drag-and-drop upload | P0 | Supported file can be dropped into the dropzone. |
| FR-003 | Validate image type | P0 | Invalid/unsupported type is rejected with helpful copy. |
| FR-004 | Enforce configurable input limit | P0 | Oversized input is stopped before processing. |
| FR-005 | Guard extreme pixel dimensions | P0 | Very large images are safely rejected or downscaled with explanation. |
| FR-006 | Show original details | P0 | Filename (display only), bytes, KB, format, width, height shown. |
| FR-007 | Select target KB preset | P0 | All five preset values can be selected. |
| FR-008 | Set custom target KB | P0 | Positive, finite, reasonable number is accepted; invalid input is rejected. |
| FR-009 | Resize dimensions | P0 | Custom width/height apply and aspect ratio is preserved by default. |
| FR-010 | Compress locally | P0 | Image bytes never leave browser. |
| FR-011 | Report actual result | P0 | Actual Blob bytes, output dimensions, format, and target status shown. |
| FR-012 | Download result | P0 | Downloaded file opens and file extension matches Blob MIME type. |
| FR-013 | Reset / compress another | P0 | Current result and preview are safely cleared. |
| FR-014 | Explain target failure | P0 | Over-target output is not falsely marked successful; next steps suggested. |
| FR-015 | Handle transparency | P0 | JPEG conversion of transparent input requires a visible background choice/default disclosure. |
| FR-016 | English interface | P0 | Complete default copy is available in English. |
| FR-017 | Urdu interface | P1 | Language toggle changes UI and sets RTL direction for Urdu. |
| FR-018 | Before/after preview | P0 | Both images/results are inspectable. |
| FR-019 | FAQ and usage guide | P1 | Accurate explanations are visible below tool. |
| FR-020 | Legal/trust pages | P1 | About, Privacy, Terms, Contact are accessible. |
| FR-021 | Optional feedback | P2 | Only enabled with server-side validation and abuse protection. |

## 9. UX and content requirements

- The main compressor must appear near the top of the page, immediately after or integrated with the hero.
- The hero headline must explain the value in plain language.
- Upload, target selection, compress, result, and download actions must have a clear visual hierarchy.
- Do not place advertisements near primary controls or make ads resemble buttons.
- Use short, actionable error messages.
- Explain that output quality can decrease and that exact target size may not always be feasible.
- Remind users to verify the receiving form's exact size, format, dimensions, and background requirements.
- State that PhotoKB is independent and not an official government/application service.

## 10. Visual product direction

Use a LanX-inspired premium dark SaaS visual language:
- Deep navy / near-black page background.
- Soft electric-blue or cobalt radial glow.
- Subtle grid texture.
- Large modern hero typography.
- Floating product-preview panels and dashboard-like illustrations.
- Dark glass-style cards with thin borders.
- Polished button/card hover states and restrained scroll animations.
- Original PhotoKB assets, illustrations, copy, and icons only.

The compressor is the functional focal point. Visual inspiration must not reduce usability, speed, accessibility, or mobile performance.

## 11. Privacy and trust requirements

- Do not send image bytes, signatures, previews, filenames, or personal image metadata to any remote service.
- Do not log image content or personal filename information to analytics or console logs in production.
- Revoke temporary object URLs when they are no longer needed.
- Privacy Policy must accurately list actual analytics, ads, cookies, feedback data, and contact processing.
- If no analytics, feedback, or ads are implemented, do not claim that they are.
- Do not claim the entire experience is cookie-free if third-party scripts may use cookies.

## 12. Monetization requirements

Adsterra is a possible future publisher, not a launch dependency. First make the product useful and stable. Apply only after the live site has original content, usable functionality, trust pages, and no placeholder content. Install only approved code and begin with non-intrusive placements if accepted. Do not use popunders, forced redirects, fake download buttons, incentivized clicks, purchased bot traffic, or self-clicking.

## 13. Acceptance criteria / Definition of Done

The MVP is ready for release only when:
- Every P0 functional requirement passes on a real supported browser.
- The app builds successfully with `npm run build` and outputs `dist`.
- A visitor can complete upload → target selection → compression → truthful result → download.
- The actual output byte count is checked against the chosen target.
- An output larger than target is never labelled a success.
- The file extension matches the actual output MIME type.
- Image content does not leave the browser (verify network activity).
- Mobile layouts work at approximately 360 px and 390 px widths, plus tablet and desktop.
- Keyboard users can operate the core tool.
- No primary buttons are placeholders.
- No secrets are committed to GitHub or bundled into frontend assets.
- Privacy messaging matches production behavior.

## 14. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Crowded search market | Slow organic growth | Focus on form-upload workflow, signatures, Urdu usability, privacy, and real guidance. |
| Tiny KB target causes quality loss | Poor output | Report target status and quality trade-offs honestly. |
| PNG cannot reach very small size | Target miss | Offer suitable JPEG/WebP conversion and transparent-background choice. |
| Large image exhausts phone memory | Failed/crashed session | Enforce byte and pixel limits; process safely; use a worker later if justified. |
| AI builder invents backend | Security/cost complexity | Require static Vite app and inspect generated code. |
| Third-party ads degrade UX | Lower trust/return use | Delay ads, use restrained placements, and remove harmful formats. |
| Requirements differ by authority | User submits invalid photo | Avoid universal claims; link official sources only when verified and dated. |

## 15. Open owner decisions before production

- Final domain and brand clearance for “PhotoKB”.
- Real contact email or contact route.
- Final input-file and pixel-count safety limits after device testing.
- Whether Urdu copy is professionally reviewed.
- Whether optional feedback is needed at launch.
- Whether Adsterra has approved the actual production site and which formats are allowed.
- Final legal/privacy review for intended target markets and third-party providers.

---

**Related documents:** `02_TRD_Technical_Requirements_Document.md`, `03_App_Flow_User_and_Admin_Experience.md`, `04_UI_UX_Design_Brief.md`, `05_Backend_Schema.md`, `06_Implementation_Plan.md`.
