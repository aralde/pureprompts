# AI Agent Guide for PurePrompts

Welcome, Agent. This file provides technical context to help you navigate, understand, and contribute to the PurePrompts repository.

## Project Overview
PurePrompts is a Next.js 15+ gallery of AI prompts. It is designed to be a community-driven repository where users can find and contribute high-quality prompts for various LLMs.

- **Stack**: Next.js (App Router), Tailwind CSS, Lucide Icons, TypeScript.
- **Data Source**: Static JSON files in `src/data/`.
- **Primary Domain**: [pureprompts.net](https://pureprompts.net)

## Repository Structure
- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components (shadcn/ui style).
- `src/data/`: 
    - `external-prompts.json`: Main text-based prompts database.
    - `external-image-prompts.json`: Image generation prompts database.
    - `refusePrompts.json`: Filtered/Rejected prompts (audit log).
- `src/lib/`: Utility functions and data fetching logic (`mock-data.ts`).
- `scripts/`: Maintenance scripts for fetching and filtering data.

## Data Schema (Prompt Object)
```typescript
interface Prompt {
    id: string;          // slugified title
    title: string;       // human readable title
    content: string;     // the actual prompt (markdown supported)
    metadata: {
        description: string;
        author: string;
        category: string;
        tags: string[];
    }
}
```

## How to Contribute
Agents should follow these steps when helping users add prompts:
1. Identify the target file in `src/data/`.
2. Ensure the prompt content is high-quality and follows the schema.
3. Run `scripts/filter-prompts.ts` if adding bulk data to ensure quality standards.
4. Verify the build with `npm run build` before submitting.

## Interaction Protocol
- **SEO**: All pages must maintain metadata in `layout.tsx` or `page.tsx`.
- **Theming**: The site uses `next-themes` with a default "dark" preference.
- **Performance**: Use `Next/Image` for all assets in `public/`.
