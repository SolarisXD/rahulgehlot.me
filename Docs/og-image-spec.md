# OG Image Specification

## Dimensions
**1200 × 630px** (PNG)

## File Location
`public/og-image.png`

Already referenced in `app/layout.tsx` - no code changes needed.

---

## Design: Option A - Name + Photo

### Layout
```
┌────────────────────────────────────────────────────────────────┐
│                                                       ┌────┐  │
│                                                       │    │  │
│  Rahul Gehlot                                         │ 🖼 │  │
│                                                       │    │  │
│                                                       └────┘  │
│                                                               │
│                                                               │
│                                                               │
│                                                               │
└────────────────────────────────────────────────────────────────┘
  Left (x≈80)                                       Right (x≈920)
```

### Left Side - Name
- **Font**: Inter (from `next/font/google` in the site)
- **Text**: `Rahul Gehlot`
- **Size**: ~56–64px
- **Weight**: 800 (bold)
- **Color**: `#ffffff`
- **Position**: Vertically centered

### Right Side - Profile Photo
- **Source**: `public/profic_pic.png`
- **Size**: ~180×180px
- **Shape**: Circle (border-radius: 50%)
- **Ring**: 3px cyan→purple gradient border (`#06b6d4` → `#a855f7`)
- **Position**: Vertically centered, right-aligned

### Background
- **Color**: `#1b1b1e` (carbon black, matches site dark theme)
- **Glow**: Faint radial gradient at top-center - cyan `(rgba(6,182,212,0.08))` fading to purple `(rgba(168,85,247,0.05))`
- **Dot pattern**: Sparse grid of `#28292c` dots at ~50% opacity (replicates `bg-pattern.tsx`)

### Fonts Used
| Element | Font |
|---|---|
| Name | Inter (sans-serif) |
| Any secondary text | JetBrains Mono (monospace) |

---

## Colors Reference

| Token | Hex | Usage |
|---|---|---|
| Background | `#1b1b1e` | Solid fill |
| Name | `#ffffff` | Primary heading |
| Cyan accent | `#06b6d4` | Gradient ring start |
| Purple accent | `#a855f7` | Gradient ring end |
| Dot pattern | `#28292c` | Background texture |

---

## After Saving

```bash
ls -la public/og-image.png
```

Verify at: https://opengraph.xyz
