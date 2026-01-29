# Emma Chirapongse Portfolio

A stylized portfolio website built with Astro and Tailwind CSS v4, designed to showcase professional experience in a product-style layout.

**Live site**: [emmac1016.github.io](https://emmac1016.github.io)

## Tech Stack

- [Astro](https://astro.build) v5 - Static site generator
- [Tailwind CSS](https://tailwindcss.com) v4 - Utility-first CSS framework
- TypeScript - Type safety
- GitHub Pages - Hosting

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/emmac1016/emmac1016.github.io.git
cd emmac1016.github.io

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server (http://localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.astro          # Hero section with name and CTAs
│   ├── Summary.astro         # About section with profile photo
│   ├── ExperienceSection.astro
│   ├── ExperienceCard.astro
│   ├── SkillsSection.astro
│   ├── EducationSection.astro
│   ├── Navigation.astro
│   ├── Footer.astro
│   └── SkipLink.astro        # Accessibility skip link
├── data/
│   ├── resume.ts             # Single source of truth for all content
│   ├── types.ts              # TypeScript interfaces
│   └── derivations.ts        # Date formatting, duration calculations
├── layouts/
│   └── Layout.astro          # HTML shell with meta tags
├── pages/
│   └── index.astro           # Page composition
└── styles/
    └── global.css            # Design tokens and base styles
```

## Accessibility

This site is built to meet WCAG 2.1 AA standards.

### Features

- **Skip link** - Keyboard users can skip to main content
- **Semantic HTML** - Proper landmarks, heading hierarchy, ARIA labels
- **Focus indicators** - Enhanced visibility with outline + box-shadow
- **Color contrast** - All text meets 4.5:1 minimum contrast ratio
- **Reduced motion** - Respects `prefers-reduced-motion` preference
- **Screen reader support** - Tested with VoiceOver

### Running Accessibility Tests

Install the testing tools (already included as dev dependencies):

```bash
pnpm add -D pa11y puppeteer
```

Run automated WCAG compliance tests:

```bash
# Build the site first
pnpm build

# Run pa11y against the built HTML
npx pa11y ./dist/index.html

# Or test against the dev server
pnpm preview &
npx pa11y http://localhost:4321
```

Expected output for a passing test:

```
Welcome to Pa11y

 > Running Pa11y on URL file:///path/to/dist/index.html

No issues found!
```

### Manual Testing Checklist

**Keyboard Navigation**
- [ ] Tab through entire page - focus order is logical
- [ ] Skip link appears on first Tab and works
- [ ] All interactive elements are focusable
- [ ] Focus indicators are visible

**Screen Reader (VoiceOver on macOS)**
- [ ] Landmarks navigation works (Ctrl+Option+U)
- [ ] Heading hierarchy is correct (h1 → h2 → h3)
- [ ] Links have descriptive text
- [ ] Images have alt text

**Print Preview**
- [ ] Background colors removed
- [ ] Navigation hidden
- [ ] Profile photo hidden
- [ ] URLs shown after external links

## Deployment

The site auto-deploys to GitHub Pages on push to `main` via GitHub Actions.

### Manual Deployment

```bash
# Build and preview before deploying
pnpm build
pnpm preview

# Push to main to trigger deployment
git push origin main
```

## Design Tokens

CSS custom properties are defined in `src/styles/global.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#1b1b1b` | Page background |
| `--color-foreground` | `#c5c1b9` | Body text |
| `--color-accent` | `#575ECF` | Buttons, links |
| `--color-accent-text` | `#9397eb` | Accent text (passes 4.5:1 contrast) |
| `--duration-fast` | `100ms` | Quick transitions |
| `--duration-normal` | `150ms` | Standard transitions |
| `--duration-slow` | `300ms` | Emphasis transitions |

## License

MIT
