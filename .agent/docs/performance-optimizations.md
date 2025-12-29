# Performance Optimizations Documentation

> Reference document for future revisions

## Overview

This document summarizes the performance optimizations applied to the portfolio website.

---

## 1. Progressive Show More (4 at a time)

**Pattern**: Items reveal in increments of 4 instead of all-at-once.

### Implemented In:
| Location | Component/File |
|----------|----------------|
| Homepage projects | `components/personal-projects.tsx` |
| Homepage academic | `components/academic-projects.tsx` |
| Experience page | `app/experience/page.tsx` |
| Projects page | `app/projects/page.tsx` |

### Reusable Component:
```tsx
// components/ui/progressive-features-list.tsx
<ProgressiveFeaturesList items={features} increment={4} />
```

### Promotion Support:
✅ **Yes** - Multiple roles per company each get their own progressive list.
Each role in the `roles[]` array gets a separate `ResponsibilitiesList`.

---

## 2. Code Splitting

**Goal**: Single source of truth for data, smaller component bundles.

### Centralized Data Files:
| Data | File |
|------|------|
| Projects | `lib/projects.ts` |
| Experience | `lib/work-experience.ts` |
| Certifications | `lib/certifications.ts` |

### Usage:
```tsx
import { personalProjects, academicProjects } from "@/lib/projects"
```

---

## 3. Edge Caching (Stale-While-Revalidate)

**Location**: `next.config.mjs`

```javascript
{
  source: '/:path*',
  headers: [{
    key: 'Cache-Control',
    value: 'public, s-maxage=3600, stale-while-revalidate=86400',
  }],
}
```

**Behavior**:
- `s-maxage=3600`: Edge cache for 1 hour
- `stale-while-revalidate=86400`: Serve stale content while revalidating for 24 hours

---

## 4. Static Generation

All pages are statically generated at build time:
```
○  /               (Static)
○  /certifications (Static)
○  /experience     (Static)
○  /projects       (Static)
```

---

## 5. Other Optimizations (Already in Place)

| Optimization | Config |
|--------------|--------|
| React Compiler | `reactCompiler: true` |
| CSS Optimization | `experimental.optimizeCss: true` |
| Image Formats | AVIF, WebP |
| Long-term Asset Caching | JS/CSS/Images immutable |
| Content Visibility | `content-visibility: auto` in CSS |
| DNS Prefetch | GitHub, LinkedIn, Hashnode |

---

## Adding New Experience with Promotion

```typescript
// lib/work-experience.ts
{
  id: 4,
  company: "Company Name",
  totalPeriod: "Jan 2023 – Present",
  roles: [
    // Most recent first
    {
      position: "Senior Engineer",
      period: "Jan 2024 – Present",
      responsibilities: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"],
      // ^ Will show 4, then "Show 1 more"
    },
    {
      position: "Junior Engineer",
      period: "Jan 2023 – Dec 2023",
      responsibilities: ["Task A", "Task B", "Task C"],
      // ^ Each role gets its own show more
    },
  ],
}
```
