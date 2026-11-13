# PhotoKB — Implementation Plan

> **Document:** Implementation Plan  
> **Version:** 1.0  
> **Date:** 12 November 2026  
> **Build workflow:** Google AI Studio Build → GitHub → Cloudflare Pages  
> **Optional services:** Supabase feedback only; Adsterra after approval

---

## 1. Purpose

This plan turns the PhotoKB PRD, TRD, App Flow, UI/UX Design Brief, and Backend Schema into a safe build-and-release sequence for a beginner working with Google AI Studio Build.

The aim is to prevent the common mistake of generating a visually attractive page while the image compressor, download flow, privacy boundaries, and deployment are incomplete.

## 2. Delivery strategy

Build in this order:
1. Confirm project decisions and create a source-control baseline.
2. Generate the static frontend and visual system.
3. Implement and verify the browser-only compression engine.
4. Connect the UI to the real engine and complete all states.
5. Add accessibility, Urdu support, and trust content.
6. Test locally and review the generated code.
7. Push to GitHub and deploy to Cloudflare Pages.
8. Complete technical SEO and Search Console setup.
9. Consider optional feedback/Supabase only if necessary.
10. Apply for monetization and add ads only after the site is stable and approved.

## 3. Phase overview and exit gates

| Phase | Main outcome | Exit gate |
|---|---|---|
| 0. Decisions and setup | Requirements, folder, Git baseline | Product owner decisions recorded; repo exists |
| 1. Visual skeleton | LanX-inspired responsive static page | Visual structure and responsive layout pass |
| 2. Compression engine | Tested local compressor functions | Algorithm tests pass; no network upload |
| 3. Tool integration | Working upload-to-download experience | All P0 functional flows pass |
| 4. Trust and polish | Urdu, accessibility, pages, SEO basics | Content and UX checklist pass |
| 5. Production deployment | GitHub → Cloudflare Pages | Live production smoke tests pass |
| 6. Optional backend | Secure feedback only, if needed | RLS, server validation and retention pass |
| 7. Monetization | Ad provider review and restrained placements | Approval and policy checks complete |
| 8. Improve | Evidence-based enhancements | Changes justified by real user/search data |

## 4. Phase 0 — Decisions and setup

### Tasks
- [ ] Confirm working brand name PhotoKB and check domain/name conflicts before purchase.
- [ ] Decide whether launch uses a `pages.dev` subdomain or a custom domain.
- [ ] Decide the real public contact method; do not invent an email.
- [ ] Decide initial maximum file size and total pixel limit after testing.
- [ ] Confirm English default and whether Urdu copy will be reviewed by a fluent reader.
- [ ] Confirm v1 scope: one image at a time; JPG, PNG, WebP; no login; no image storage; no admin dashboard.
- [ ] Create local project folder.
- [ ] Create GitHub repository `photokb`.
- [ ] Add `.gitignore` before committing code.

### Exit criteria
The team/owner has a fixed v1 scope and a GitHub repository ready for the first baseline.

## 5. Phase 1 — Generate visual skeleton in Google AI Studio

### Tasks
- [ ] Open Google AI Studio Build.
- [ ] Create a React + Vite static frontend (TypeScript preferred if generated cleanly).
- [ ] Attach/provide the master specification and all relevant supporting docs.
- [ ] Use the master build prompt from the master specification / PRD.
- [ ] Ask the builder to implement the LanX-inspired visual language with original PhotoKB assets.
- [ ] Build the header, hero, tool card shell, sections, FAQ, footer, and supporting pages.
- [ ] Keep ad slots disabled and Supabase absent.
- [ ] Verify the compressor appears near the top.
- [ ] Review desktop and mobile responsive composition.

### Visual acceptance
- Dark navy/black base, blue glow, subtle grid, large headline, premium cards.
- Floating UI illustrations are decorative and not fake product analytics.
- No fake testimonials, counts, ratings, pricing, or partner logos.
- No broken/placeholder buttons.
- Tool remains the visual and functional focal point.

### Exit criteria
The static page structure and responsive design are ready for real tool functionality.

## 6. Phase 2 — Implement and test compression engine

### Tasks
- [ ] Implement file validation in a separate utility module.
- [ ] Support JPEG/JPG, PNG, WebP input.
- [ ] Reject SVG, PDF, GIF, and unsupported files in v1.
- [ ] Add byte-size, width, height, and pixel-count guards.
- [ ] Decode locally.
- [ ] Implement output-dimension calculation and aspect-ratio logic.
- [ ] Implement canvas rendering.
- [ ] Implement JPEG output and actual Blob size measurement.
- [ ] Add bounded quality search and proportional dimension reduction.
- [ ] Implement PNG transparency handling when output is JPEG.
- [ ] Detect actual output MIME type and derive the file extension from it.
- [ ] Implement honest target-reached / target-not-reached status.
- [ ] Add object URL and resource cleanup.
- [ ] Add error handling for decode, encode, memory, and null Blob failures.

### Test images
Use owned/test images only:
- Portrait photo.
- Landscape photo.
- Large phone image.
- Transparent PNG logo.
- Handwritten signature scan.
- Small source already under target.
- Low-contrast and high-detail examples.

### Exit criteria
Engine passes functional/quality tests and network inspection confirms source images do not leave the browser.

## 7. Phase 3 — Integrate the real tool UI

### Tasks
- [ ] Connect file picker and drag/drop to validation.
- [ ] Display original preview and metadata.
- [ ] Implement KB presets and custom target validation.
- [ ] Implement optional width/height and aspect-ratio lock.
- [ ] Implement output format controls only for supported encoders.
- [ ] Implement visible background selector for transparent PNG → JPEG.
- [ ] Add loading/compression states.
- [ ] Add result panel with actual output facts.
- [ ] Implement download and descriptive filename.
- [ ] Implement reset/compress-another behavior.
- [ ] Ensure all primary controls work with keyboard and touch.
- [ ] Confirm no stale success state appears after errors/new uploads.

### Exit criteria
A real visitor can complete the full upload → settings → compression → result → download flow on supported browsers.

## 8. Phase 4 — Trust, localization, accessibility, and content

### Tasks
- [ ] Add Urdu UI dictionary and language toggle.
- [ ] Set RTL direction and check Urdu layout manually.
- [ ] Add reduced-motion support.
- [ ] Add accessible labels, focus styling, keyboard handling, and status announcements.
- [ ] Complete About page.
- [ ] Complete Privacy Policy based on actual services and requests.
- [ ] Complete Terms page.
- [ ] Add Contact page after a real contact method exists.
- [ ] Add original instructions and accurate FAQs.
- [ ] Add independence disclaimer.
- [ ] Add title, meta description, canonical placeholder, Open Graph, favicon.
- [ ] Add robots.txt and sitemap.xml; replace placeholder domain before launch.

### Exit criteria
No placeholder or inaccurate policy copy remains. English and Urdu flows work at target screen sizes.

## 9. Phase 5 — QA and production readiness

### Required tests

| Area | Test | Pass condition |
|---|---|---|
| Upload | JPEG/PNG/WebP | Accepted and decoded |
| Upload | PDF/SVG/GIF | Rejected with helpful message |
| Limits | Oversized file/extreme pixels | Stopped safely |
| Presets | 20/50/100/200/500 KB | Correct target bytes applied |
| Custom | Invalid/zero/negative value | Validation blocks compression |
| Resize | Ratio locked/unlocked | Output dimensions match setting |
| Transparency | PNG to JPEG | Background behavior is explicit |
| Compression | Result size | Actual Blob bytes displayed |
| Target | Output above target | Never marked success |
| Download | Output format | File opens; extension matches MIME |
| Reset | New file after result | Old preview/result resources cleared |
| Privacy | Network inspection | No image bytes/preview/filename uploaded |
| Accessibility | Keyboard/focus | Main workflow operable |
| Responsive | 360/390/768/1024/desktop | No horizontal overflow |
| Reduced motion | OS preference | Nonessential motion disabled |
| Build | `npm run build` | Build succeeds; output is `dist` |

### Exit criteria
All P0 tests pass; remaining limitations are documented rather than hidden.

## 10. Phase 6 — GitHub workflow

### Tasks
- [ ] Review generated code; do not accept blind full-project rewrites.
- [ ] Confirm `.gitignore` excludes `.env`, secrets, `node_modules`, `dist`, and local files.
- [ ] Confirm no real user images are committed.
- [ ] Push the baseline to GitHub.
- [ ] Use small commits for each feature/fix.
- [ ] Make major changes on a branch where practical.
- [ ] Review changed files/diff after AI Studio edits.

Suggested commit examples:
```text
chore: create PhotoKB Vite project
feat: build LanX-inspired landing page
feat: add local image validation
feat: implement target-size compression
feat: add result preview and download
feat: add Urdu interface
fix: report target-not-reached accurately
chore: prepare Cloudflare Pages deployment
```

### Exit criteria
GitHub contains the complete reproducible source and no secret values.

## 11. Phase 7 — Cloudflare Pages deployment

### Tasks
1. Sign in to Cloudflare.
2. Open Workers & Pages / Pages.
3. Create a Pages project connected to GitHub.
4. Select the `main` production branch.
5. Use build command `npm run build`.
6. Use output directory `dist`.
7. Add only the environment variables required by enabled features.
8. Deploy and inspect build logs.
9. Test the `pages.dev` URL over HTTPS.
10. Add a custom domain only if purchased/configured.
11. Verify canonical host, redirects, sitemap, and direct navigation to supporting pages.
12. Configure preview deployments and test updates before production.

### Exit criteria
A fresh commit can deploy from GitHub and the live app passes smoke tests.

## 12. Phase 8 — Optional Supabase feedback

Do not do this merely because Supabase appears in the architecture plan.

### Tasks if needed
- [ ] Confirm a genuine feedback requirement.
- [ ] Use only the minimal `feedback` schema.
- [ ] Enable RLS.
- [ ] No public reads, edits, or deletes.
- [ ] Prefer Cloudflare Pages Function/Worker as a secure intake layer.
- [ ] Verify Turnstile token server-side if used.
- [ ] Apply rate limits and request-size limits.
- [ ] Keep service-role/secret credentials in Cloudflare encrypted settings only.
- [ ] Set data retention and update privacy text.
- [ ] Test unauthorized access and spam behavior.

### Exit criteria
Feedback endpoint rejects invalid/abusive submissions and does not expose records or secrets.

## 13. Phase 9 — SEO launch

- [ ] Replace domain placeholders in title/canonical/sitemap/OG URLs.
- [ ] Verify site ownership in Google Search Console.
- [ ] Submit sitemap.
- [ ] Check robots.txt and canonical URL.
- [ ] Inspect mobile layout and page performance.
- [ ] Check indexed URL status and coverage after launch.
- [ ] Monitor queries, impressions, and clicks.
- [ ] Improve content based on real searches; avoid mass-producing thin pages.

SEO takes time and cannot be guaranteed. Do not make decisions based on fabricated search-volume or earnings estimates.

## 14. Phase 10 — Adsterra monetization

Only begin after the product and trust pages are complete:
- [ ] Read current Adsterra publisher terms and prohibited-content rules.
- [ ] Submit the actual live website for review.
- [ ] Wait for actual approval before installing live ads.
- [ ] Use only placement code supplied by the approved publisher dashboard.
- [ ] Start with non-intrusive banner/native formats if available and appropriate.
- [ ] Keep ads away from upload, compression, and download controls.
- [ ] Ensure ads are clearly separate from product actions.
- [ ] Update privacy disclosures for ad technology/cookies.
- [ ] Test ads on mobile and desktop.
- [ ] Remove any placement that causes redirects, accidental clicks, or layout disruption.

Never click own ads, ask others to click, buy bot traffic, or incentivize ad clicks.

## 15. Suggested prompt sequence for Google AI Studio

### Prompt 1 — Create the application
Use the complete master prompt from the Master Project Specification and provide the PRD, TRD, App Flow, and UI/UX brief. Ask for a static React + Vite app and no backend dependency.

### Prompt 2 — Audit the design
```text
Refine the visual design to match the LanX-inspired PhotoKB UI/UX brief. Preserve the working tool flow. Use original PhotoKB assets only. Check desktop, tablet, mobile, animations, reduced motion, and accessibility. Do not add fake social proof or pricing.
```

### Prompt 3 — Implement compression engine
```text
Implement the browser-only image compression engine according to the TRD. Separate utilities from UI. Use bounded quality/dimension search, measure actual Blob bytes, detect MIME type, handle transparency and errors, and never report success above target. Do not upload files or add a server endpoint.
```

### Prompt 4 — Connect UI and verify
```text
Connect the upload, target selector, settings, progress, result, and download UI to the actual engine. Test all states and reset behavior. Do not leave placeholder buttons.
```

### Prompt 5 — Privacy audit
```text
Inspect every network request and code path. Confirm image bytes, previews, filenames, and signatures never leave the browser. Remove any upload endpoint or image-related analytics. Report actual findings.
```

### Prompt 6 — Production audit
```text
Run the production build and verify Cloudflare Pages compatibility. Check TypeScript, imports, routes, environment variables, secret exposure, SEO files, and all acceptance tests. Fix verified issues and list remaining limitations honestly.
```

## 16. Release checklist

### Product and engine
- [ ] Upload and validation pass.
- [ ] Preset/custom target pass.
- [ ] Resize and ratio handling pass.
- [ ] Target algorithm uses actual bytes.
- [ ] Failed target is reported honestly.
- [ ] MIME and extension match.
- [ ] Download opens.
- [ ] Reset cleans up resources.

### Design and accessibility
- [ ] LanX-inspired dark visual system is consistent.
- [ ] Tool near top and fully functional.
- [ ] No fake social proof.
- [ ] Responsive layouts pass.
- [ ] Urdu RTL works.
- [ ] Keyboard and reduced motion pass.

### Privacy and security
- [ ] No image upload.
- [ ] No secrets in repository/build.
- [ ] RLS enabled if backend exists.
- [ ] Privacy policy accurate.

### Deployment and SEO
- [ ] GitHub is source of truth.
- [ ] Cloudflare build passes.
- [ ] HTTPS works.
- [ ] Domain/canonical/sitemap are real and consistent.
- [ ] Search Console verified.

### Monetization
- [ ] Publisher terms reviewed.
- [ ] Actual publisher approval received.
- [ ] Ads do not overlap controls or mislead visitors.
- [ ] Privacy notice reflects advertising.

## 17. Maintenance routine

### After every meaningful update
- Run `npm run build`.
- Test one JPG, PNG, and WebP file.
- Test one target preset and one custom target.
- Confirm no new network upload path.
- Review Cloudflare preview deployment before production.

### Monthly or periodically
- Review Search Console queries and indexing.
- Review broken links, accessibility, and mobile usability.
- Review dependencies and provider plan/terms changes.
- Check ad performance and user-experience impact if monetization is active.
- Update official requirement references only from authoritative sources and record last-checked dates.

## 18. Change control

When adding a feature:
1. Explain the user problem it solves.
2. Update PRD scope and acceptance criteria.
3. Update TRD if architecture, data, or security changes.
4. Update App Flow and UI/UX brief if interactions change.
5. Update Backend Schema only if persistent data is truly needed.
6. Add tests before declaring complete.
7. Update this implementation plan and release notes.

Do not add a new database, admin dashboard, analytics service, or paid dependency without a clear product requirement and an owner decision.

---

**Related documents:** PRD, TRD, App Flow, UI/UX Design Brief, Backend Schema.
