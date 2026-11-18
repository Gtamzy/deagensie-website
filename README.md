# Deagensie landing page

This completes the existing HTML/CSS/JavaScript landing page. Open `index.html` directly, or serve the directory with any static web host. No build is required to view or deploy the included files.

## Files

- `index.html`: complete one-page site, original logo references, inline SVG icons and authentication entry modals.
- `utilities.css`: compiled Tailwind utilities; replaces the browser CDN runtime.
- `styles.css`: existing brand tokens plus responsive component refinements.
- `script.js`: navigation, keyboard-accessible journey/lifecycle tabs, role selection and modal handling.
- Original logo/image files are preserved without modification.
- Preview screenshots show the desktop and mobile hero.

Typography retains the existing Open Sauce Sans / Open Sans / Plus Jakarta Sans stack, with Prata for editorial emphasis. The project does not contain a licensed Open Sauce Sans font file, so the existing Open Sans fallback loads through Google Fonts. Fonts have local system fallbacks if the network is unavailable.

## Optional CSS rebuild

If utility class names change, install the pinned development dependency with `npm install`, then run `npm run build`. Editing the component rules in `styles.css` does not require compilation.

## Page and behavior

Centered light hero, illustrative product surface, audience strip, two growth engines, editorial Growth Lab journey and blueprint, separate four-card System Artifacts section, framed turquoise CTA, Talent-as-a-Service, the seven-stage closed loop including LAUNCH, Build. Match. Scale., intelligence layer, audiences, final CTA and footer.

No fabricated logos, metrics, testimonials or matching percentages are included. The audience strip uses “Built for” because no verified customer endorsements were supplied.

## Authentication integration required before public registration

This project contains no authentication backend, approved account endpoint or policy documents. The login and signup modals support role selection, validation, password visibility, modal switching and keyboard interaction. Submitting explains that registration/access is not connected; it never claims success, stores passwords, or transmits user details.

To enable real account access, connect `handleLoginSubmit`, `handleSignupSubmit` and password recovery to the approved authentication service; carry `selectedRoleState` into signup. Supply the approved Terms and Privacy destinations before collecting accounts. Dashboards and internal application pages are outside this landing-page scope.

## Verification

Browser checks passed at 320, 375, 768, 960, 1280 and 1440 pixels with no horizontal overflow. No JavaScript errors or broken internal anchors. Verified all primary anchors, every journey/lifecycle state, keyboard tab navigation, mobile navigation and resize reset, role preselection/change, modal switching, focus containment/restoration, Escape/backdrop closing, password visibility, form submission status and original image loading. Desktop, mobile and modal layouts were visually reviewed.

This is a static deliverable; no public deployment was made.
