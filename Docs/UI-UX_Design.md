# UI/UX Design - Portfolio and Chatbot

## 1. Design intent

The design should feel sharp, calm, and intentional. It should not look like a generic template or a flashy startup landing page.

The visual style should support the content, not compete with it.

## 2. Core visual principles

- Dark by default.
- One accent color only.
- Minimal layout.
- Strong typography.
- Consistent spacing rhythm.
- Subtle motion only.
- Content-first design.

## 3. Tone

The interface should feel:
- mature,
- focused,
- slightly dry,
- confident,
- maintained.

Avoid anything that feels overly enthusiastic or decorative.

## 4. Typography

### Display
Use a clean modern sans-serif for headings.

### Body
Use a readable sans-serif with a calm rhythm.

### Mono
Use a monospaced font only for:
- inline code,
- labels,
- technical details,
- “Now” prefixes.

## 5. Layout

### Core layout rules
- Max content width around 860px.
- Center the content.
- Use a single column for most sections.
- Keep sections visually distinct with spacing, not heavy borders.
- Avoid sidebars.

### Spacing rhythm
Every section should use the same general vertical rhythm. This consistency is one of the main things that makes the page feel designed.

Recommended section spacing:
- `py-20` on mobile,
- `sm:py-28` on larger screens.

## 6. Color system

Use semantic colors rather than hardcoded values in components.

Suggested roles:
- background,
- foreground,
- card,
- border,
- muted,
- accent.

The accent color should be used sparingly for:
- links,
- buttons,
- focus states,
- active navigation,
- small highlights.

## 7. Theme behavior

### Dark mode
- Default to dark.
- Support a light mode toggle.
- Save user preference.
- Use semantic class-based theming.

### Light mode
- Keep it clean, not washed out.
- Maintain good contrast.
- Avoid bright, harsh whites.

## 8. Navigation design

The navbar should:
- stay fixed at the top,
- become blurred or opaque after scrolling,
- include active section highlighting,
- contain a dark mode toggle,
- collapse into a mobile drawer on small screens.

## 9. Hero design

The hero should be direct and compact. It should:
- introduce the developer immediately,
- include a short role-cycling line or strong statement,
- contain two clear CTAs,
- not rely on decorative backgrounds.

The hero should feel like the opening sentence of a good essay: direct, specific, and hard to ignore.

## 10. About design

The about section should flow naturally under the hero. It should not feel boxed off with unnecessary decoration.

The copy should stay short and readable:
- two paragraphs,
- no fluff,
- no filler,
- no “I am passionate about...” language.

## 11. Now design

The Now section should look lightweight and current. It should feel like a live status feed, not a résumé block.

Recommended style:
- small labels,
- monospace prefixes,
- compact items,
- muted updated date.

This section should feel like a signal that the site is actively maintained.

## 12. Experience design

Use a vertical timeline or clear stacked cards.

Each experience entry should show:
- role,
- organization,
- dates,
- type badge,
- 3 to 5 bullet points,
- tech tags.

Bullet points should be results-driven and concrete.

## 13. Education design

Keep education simpler than experience:
- one clean card,
- concise highlights,
- optional certifications as small pills.

## 14. Process design

This section should be minimal, text-first, and easy to scan.

Suggested form:
- numbered steps,
- short title,
- two sentences of explanation.

Do not overdesign this section. The words are the substance.

## 15. Projects design

### Project cards
Regular projects should be simple and scannable:
- title,
- description,
- tags,
- links.

### Case study cards
Featured projects should be larger and richer:
- origin story,
- key decision,
- outcome,
- stack.

The case study card should feel like a deeper layer, not just a bigger card.

## 16. Stack decisions design

Use a compact grid of opinion cards.

Each card should show:
- the choice,
- the alternative,
- the reasoning.

This section should visually feel slightly different from Projects so it reads as judgment, not work history.

## 17. Skills design

Do not use skill bars.

Group skills by domain:
- Frontend,
- Backend,
- AI/ML,
- Tools/Infra.

Add a small note under each group if useful. The note should qualify the list, not inflate it.

## 18. Micro opinions design

Use a flexible card layout that allows short quotes to wrap naturally.

The cards should:
- vary slightly in width based on content,
- feel light and human,
- be easy to scan,
- avoid uniform corporate blocks.

## 19. Contact design

Contact should be direct and practical.

Include:
- a short heading,
- a response promise,
- primary email button,
- LinkedIn,
- GitHub.

Do not use a contact form in Phase 1.

## 20. Footer design

Keep the footer minimal and centered. One line is enough.

## 21. Floating chat design

The chat launcher should:
- sit in the bottom-right corner,
- use a clear accent color,
- include a small pulsing indicator,
- open a compact panel on desktop,
- become full-screen on mobile.

The widget should feel helpful, not intrusive.

## 22. Motion design

Motion should be restrained.

Use:
- scroll-triggered reveal animations,
- subtle movement,
- short duration,
- no autoplay loops except a tiny status indicator.

Avoid:
- particle fields,
- huge transitions,
- excessive bouncing,
- constant motion.

## 23. Responsive behavior

### Mobile
- single column,
- reduced padding,
- collapsed navigation,
- full-screen chat,
- stacked process and cards.

### Tablet
- same layout principles, slightly wider spacing.

### Desktop
- content centered with comfortable width,
- case study cards can breathe more,
- project grid can become two columns if needed.

## 24. Accessibility

- Visible focus states.
- Keyboard reachable controls.
- Semantic headings.
- Sufficient contrast.
- Buttons should read clearly.
- Chat should be usable without a mouse.

## 25. UI success criteria

The design is successful if:
- it feels like one person wrote and built it,
- it does not look like a template,
- it is readable on mobile,
- it supports the content rather than distracting from it,
- it feels specific immediately.