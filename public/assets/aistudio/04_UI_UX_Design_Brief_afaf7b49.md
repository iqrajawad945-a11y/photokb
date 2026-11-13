# PhotoKB — UI/UX Design Brief

> **Document:** UI/UX Design Brief  
> **Version:** 1.0  
> **Date:** 12 November 2026  
> **Visual reference:** LanX Framer template / public preview  
> **Design goal:** Recreate the reference's visual language for PhotoKB with original brand assets and a more prominent functional tool

---

## 1. Brief and design objective

Design a polished, premium, dark SaaS-style single-page website for **PhotoKB**, a free browser-based photo and signature compressor. The website should feel close to the supplied LanX Framer reference in its visual atmosphere, layout rhythm, visual depth, card styling, and subtle animations, while remaining an original PhotoKB design.

The website is a utility, not a subscription SaaS. The compressor must be discoverable immediately and cannot be hidden beneath marketing content. Function always wins over decoration.

## 2. Reference interpretation and originality rule

### Visual cues to adapt
- Deep navy / black background.
- Soft electric-blue and cobalt light fields.
- Subtle grid and gradient atmosphere.
- Large, bold, modern hero typography.
- Floating dashboard-like panels and product UI previews.
- Dark glass surfaces, fine borders, and restrained shadows.
- Modular bento grids and alternating section layouts.
- Smooth entrance, hover, and scroll-reveal motion.

### Do not copy
- LanX name, logo, exact copy, product claims, proprietary illustrations, photographs, code, testimonials, pricing, partner logos, or user counts.
- Any asset from the editable Framer project unless its licence specifically allows the intended use.
- Fake social proof, invented reviews, or fabricated integrations.

Use original PhotoKB copy, CSS compositions, inline SVG shapes, and licensed icons/assets.

## 3. Brand personality

**Keywords:** Premium, confident, technical, calm, useful, private, approachable.

**Tone:** Direct and reassuring. Avoid exaggerated statements such as “best in the world”, “instant perfect compression”, “official passport size”, or unverified claims about users and savings.

**Visual balance:** About 75% functional clarity and 25% expressive decorative polish. The upload and result panels must have higher contrast than decorative marketing cards.

## 4. Design tokens

### 4.1 Colour palette

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#050816` | Main canvas |
| `--bg-elevated` | `#0A1024` | Header and section surface |
| `--surface` | `#0D1730` | Tool and card background |
| `--surface-raised` | `#111F3D` | Hover and raised surface |
| `--text` | `#F5F7FF` | Main text |
| `--muted` | `#A7B3CC` | Supporting text |
| `--blue` | `#2563FF` | Primary action |
| `--blue-bright` | `#4D8DFF` | Highlight and hover |
| `--cyan` | `#53D9FF` | Small accent |
| `--border` | `rgba(148,171,218,.18)` | Card outline |
| `--success` | Accessible green tone | Success only |
| `--warning` | Accessible amber tone | Target not reached / warnings |
| `--danger` | Accessible red tone | Errors |

Colour must not be the only indicator of a status. Pair colour with text and/or icon.

### 4.2 Typography
- Use a clean, modern sans-serif family with strong weight range.
- Headline: bold/extra-bold, tight line height, responsive clamp sizing.
- Body: readable, regular weight, generous line height.
- Labels/eyebrows: small uppercase text, letter spacing, blue/cyan accent.
- Avoid tiny muted text that loses contrast on dark panels.
- English is default; choose a legible Urdu-compatible font fallback and test Urdu shaping/line breaks.

### 4.3 Layout and spacing
- Desktop content max-width: approximately 1180–1240 px.
- Section vertical rhythm: generous, consistent padding.
- Grid: 12-column mental model or CSS grid; feature cards in 3 columns desktop, 2 tablet, 1 mobile as suitable.
- Cards: consistent radius, border, surface, and padding.
- Tool: 2 columns on wide desktop, stacked on mobile.
- Use a restrained spacing scale; avoid arbitrary per-card spacing.

### 4.4 Surface treatment
- Use soft radial blue glows behind hero and selected callouts.
- Use a subtle grid/noise texture through lightweight CSS or a small optimized asset.
- Apply backdrop blur sparingly; never use so much blur that text becomes difficult to read.
- Shadows should add depth without looking neon-heavy.

## 5. Page composition and templates

### 5.1 Header / navigation
**Desktop:**
- PhotoKB wordmark or original mark on left.
- Anchor links: Tool, Features, How It Works, FAQ.
- English/Urdu toggle.
- Primary “Compress Photo” button on right.
- Sticky after scroll with slightly stronger surface opacity/blur.

**Mobile:**
- Compact brand.
- Accessible menu or compact navigation.
- Large enough language toggle and CTA.
- Avoid a crowded header.

### 5.2 Hero
- Small eyebrow: `FREE ONLINE IMAGE TOOL` or similar factual label.
- H1: `Compress Photos to the KB Size You Need`.
- Supporting line: explain photo/signature, target size, local browser processing.
- Primary CTA: `Start Compressing` (scrolls/focuses tool).
- Secondary CTA: `See How It Works`.
- Capability chips: `20 KB`, `50 KB`, `100 KB`, `JPG · PNG · WebP`, `Browser-based`—only where the feature is implemented.
- Right-side floating composition: original mock UI showing upload panel, target chip, preview/result card. This is illustration only; do not present fake analytics or fictional user statistics.

### 5.3 Main compressor section
This is the core product and must appear directly below the hero or be visually integrated with it.

**Desktop two-column layout:**
- Left: upload dropzone, target KB selector, custom target input, optional settings.
- Right: image preview, result panel, file facts, download action.

**Mobile:**
- Full-width upload action.
- Target-size chips in 2–3 columns.
- Advanced settings inside an accessible disclosure.
- Preview and result stacked vertically.
- Download button full width.

**Controls:**
- Upload accepts JPG, PNG, WebP only in v1.
- Presets: 20 KB, 50 KB, 100 KB, 200 KB, 500 KB.
- Custom target numeric input.
- Width and height fields.
- Aspect-ratio lock on by default.
- Output format only when supported.
- JPEG background choice when flattening transparency.
- Primary `Compress Image` CTA.
- Result shows actual size and target status.

### 5.4 Supported-format / trust strip
A horizontal or wrapping strip containing only actual input/output formats and a concise privacy statement. Avoid fake certification badges.

### 5.5 Feature showcase / floating panels
Bento-style composition with:
- Target-size compression panel.
- Photo + signature use case panel.
- Local processing / privacy panel.
- Resize control panel.
- Format compatibility panel.

Panels may include decorative UI samples; label them as illustration if the data is not live. No fake visitor counts or performance figures.

### 5.6 Benefits grid
Suggested messages:
- No software installation.
- No account required.
- Browser-based processing.
- Control output size and dimensions.
- Works on mobile and desktop.
- Clear output-size reporting.

Do not claim “zero quality loss” or “always exact KB”.

### 5.7 Use-case cards
Use cases:
- Job applications.
- University and scholarship forms.
- Examination registrations.
- Signatures for online forms.
- Profile images and general uploads.
- Email and web image size reduction.

Copy must clearly state that destination-specific requirements vary.

### 5.8 Value section
Instead of SaaS pricing tiers, use a “Free tools, no confusing plans” value panel. Explain what is available without inventing paid tiers or a subscription plan.

### 5.9 Privacy panel
Prominent calm panel explaining local browser processing. This claim must be validated with network inspection before release. Do not claim PhotoKB never uses cookies if ads/analytics are later added.

### 5.10 Format compatibility section
Use original format tiles or mini diagrams for JPG, PNG, WebP. Explain transparency and lossy/lossless trade-offs accurately.

### 5.11 Honest comparison / explanation
Show the difference between a typical upload task and PhotoKB's streamlined local workflow. Avoid competitor names and unverified superiority claims. Explain actual limitations.

### 5.12 How it works
Three numbered cards:
1. Upload a photo or signature.
2. Choose the target KB and optional dimensions.
3. Compress, check the result, and download.

The motion is illustrative; actual tool progress is separate and must report truthfully.

### 5.13 FAQ
Accessible accordion with these questions:
- How do I compress a photo to 20 KB?
- Can I compress to 50 KB or 100 KB?
- Does PhotoKB upload my image?
- Which formats are supported?
- Can I resize a signature image?
- Why was my target size not reached?
- Will compression reduce quality?
- Does PhotoKB guarantee acceptance by a job, university, passport, or visa form?
- Can I use PhotoKB on my phone?

Answers must be accurate and concise. Do not promise official acceptance.

### 5.14 Final CTA and footer
CTA: `Ready to make your image smaller?` with `Compress an Image` action. Footer includes Tool, Features, How It Works, FAQ, About, Privacy, Terms, Contact, independence disclaimer, and a real contact method only after the owner supplies one.

## 6. Reusable component templates

| Component | Visual/behavior requirement |
|---|---|
| `SiteHeader` | Sticky dark nav, active anchor, responsive menu |
| `PrimaryButton` | Blue gradient/glow, focus-visible, pressed state |
| `SecondaryButton` | Translucent dark surface and fine border |
| `EyebrowLabel` | Small uppercase blue/cyan label |
| `SectionHeading` | Consistent title, intro, alignment variants |
| `GlowCard` | Dark gradient, border, optional icon, subtle lift |
| `GlassPanel` | Translucent panel, restrained blur |
| `FormatPill` | JPG / PNG / WebP status chip |
| `UploadDropzone` | Dashed border, accessible file input, drag-over state |
| `TargetSizeSelector` | Clear selected/unselected state and custom input |
| `ImageSettingsPanel` | Dimensions, aspect ratio, output format, background |
| `CompressionProgress` | Honest determinate/indeterminate state |
| `ResultPanel` | Preview, actual bytes, target status, download |
| `FeatureBentoCard` | Reusable responsive card sizes |
| `UseCaseCard` | Simple icon/illustration and useful copy |
| `StepCard` | Numbered how-it-works step |
| `FAQAccordion` | Accessible button, expanded state, smooth transition |
| `AdSlot` | Disabled by default; never resembles a tool action |
| `SiteFooter` | Legal/support links and independence note |

## 7. Animation and interaction specification

### 7.1 Initial entrance
- Eyebrow fades in with an 8–12 px upward movement.
- H1 fades/slides up approximately 12–18 px.
- Supporting copy and CTA enter with a short stagger.
- Floating UI panels use subtle scale from approximately 0.98 to 1 and fade in.
- Duration target: 400–700 ms, ease-out.

### 7.2 Ambient movement
- Soft blurred blue glow shifts slowly over 12–24 seconds.
- Subtle grid/light sweep only if lightweight.
- No flashing, strobing, or high-contrast pulsing.
- CSS-only decorative motion preferred; no WebGL/video background.

### 7.3 Scroll reveal
- Section headings/cards fade in and move upward 12–18 px.
- Trigger once with IntersectionObserver.
- Stagger cards by roughly 60–100 ms, without delaying access to content.
- Content remains visible if animation JavaScript fails.

### 7.4 Hover and press
- Decorative desktop card lift: 3–6 px.
- Slightly brighter border and restrained blue shadow.
- Optional subtle 3D tilt only on decorative cards and pointer devices.
- Never tilt upload, settings, result, or download controls.
- Touch devices use simple pressed states.
- Primary button hover scale should be minimal (up to about 1.02).

### 7.5 FAQ and target controls
- FAQ height/opacity transition around 180–260 ms and icon rotation.
- Target chip selected state is clear and transitions around 150–220 ms.
- Drag-over dropzone border/glow activates immediately.
- Result panel appears only after real result is produced.

### 7.6 Accessibility and performance
- Respect `prefers-reduced-motion: reduce`.
- Disable ambient loops, parallax, tilt, and nonessential reveal animation under reduced motion.
- Essential content is never hidden until animation completes.
- Prefer transform/opacity; avoid large layout animations.
- No animation may block or delay upload/compress/download.
- Test mid-range Android devices.

## 8. Responsive rules

### Desktop: ≥1024 px
- Full nav visible.
- Hero split layout when readable.
- Tool two columns.
- Feature grid up to three columns.
- Main max-width around 1180–1240 px.

### Tablet: 768–1023 px
- Hero may stack if columns become cramped.
- Tool two columns only if controls retain adequate width.
- Feature cards use two columns.
- Reduce spacing/headline size.

### Mobile: ≤767 px
- Stack hero content and illustration.
- Dropzone and primary CTA full width.
- Target chips in clean 2–3 column grid.
- Advanced options in disclosure.
- Result details stacked.
- No horizontal comparison overflow.
- Compact nav/menu.
- Disable tilt and expensive ambient motion.
- Use readable type and 44 px touch targets where practical.

## 9. Accessibility requirements

- Semantic landmarks and correct heading order.
- Visible keyboard focus on all controls.
- Upload control operable by keyboard.
- Target selector uses semantic buttons or radios.
- Custom input has a label and error association.
- FAQ rows expose expanded/collapsed state.
- Announce result/error status to assistive technology without excessive announcements.
- Contrast must be checked on dark cards and blue buttons.
- Success/error includes text or icon, not colour alone.
- Urdu interface uses `dir="rtl"` and right-aligned appropriate controls.
- Reduced motion respected.

## 10. Content and microcopy guidance

Use factual and plain language. Suggested core copy:
- H1: `Compress Photos to the KB Size You Need`
- Subtitle: `Reduce a photo or signature to a target file size, preview the result, and download it. Your image is processed in your browser.`
- Upload: `Drop an image here or choose a file`
- Formats: `JPG, PNG, WebP`
- Target label: `Maximum output size`
- Primary action: `Compress Image`
- Success: `Your image is within the selected size limit.`
- Warning: `We couldn't reach that size within the current quality and dimension limits.`
- Privacy note: `Your image is processed in this browser and is not uploaded to PhotoKB.` — only if verified.
- Disclaimer: `PhotoKB is an independent image utility. Always check the exact requirements of the form you are submitting to.`

## 11. Asset direction

- Use original PhotoKB logo and original UI diagrams.
- Prefer CSS, inline SVG, and icon library assets with compatible licensing.
- Avoid large hero stock photography; use product UI composition.
- Decorative images use empty alt text; meaningful diagrams have concise alt text.
- Do not use LanX proprietary files unless licensing expressly permits.

## 12. Ad-slot design rules

- Ad containers are disabled by default in the initial build.
- When approved and activated, place them outside the tool's interaction area.
- Ads must be visibly distinct from app controls and content.
- Reserve space to avoid layout shift when possible.
- Do not use fake download buttons, deceptive close icons, forced redirects, or popunders.

## 13. Visual quality checklist

- [ ] Overall mood resembles the LanX reference's premium dark visual language.
- [ ] PhotoKB is original and does not reuse LanX branding/assets.
- [ ] Main tool appears immediately near the hero.
- [ ] Hero headline and CTA have clear hierarchy.
- [ ] Tool controls have higher contrast than decorative areas.
- [ ] Cards share consistent spacing, radius, border, and hover treatment.
- [ ] No fake users, testimonials, reviews, integrations, metrics, or pricing.
- [ ] Every primary button works.
- [ ] FAQ keyboard interaction works.
- [ ] Mobile layout has no horizontal overflow.
- [ ] Urdu RTL layout is reviewed.
- [ ] Reduced-motion mode removes nonessential effects.
- [ ] Ads do not overlap controls.
- [ ] All content remains legible without animation.

---

**Related documents:** PRD, TRD, App Flow, Backend Schema, Implementation Plan.
