// This file is intentionally a Server Component (no 'use client').
// The interactive gallery is handled by PromptGallery (client component).
// Keeping this as a Server Component means Google can read the static
// h1, description, and JSON-LD on first load without executing JavaScript.

import { PromptGallery } from '@/components/prompt-gallery';

// CollectionPage JSON-LD for the homepage
const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Prompts Gallery — PurePrompts",
  description:
    "Curated collection of thousands of AI prompts for ChatGPT, Claude, Gemini, Midjourney, coding, image generation, and more.",
  url: "https://pureprompts.net",
  about: {
    "@type": "Thing",
    name: "AI Prompt Engineering",
  },
  hasPart: [
    {
      "@type": "ItemList",
      name: "Image Generation Prompts",
      description: "Prompts for Midjourney, DALL-E, Stable Diffusion, and other AI image generators.",
      url: "https://pureprompts.net/?category=Images",
    },
    {
      "@type": "ItemList",
      name: "Coding Prompts",
      description: "AI prompts for programming, debugging, code review, and software development.",
      url: "https://pureprompts.net/?category=Coding",
    },
    {
      "@type": "ItemList",
      name: "General AI Prompts",
      description: "General-purpose prompts for ChatGPT, Claude, Gemini and other LLMs.",
      url: "https://pureprompts.net/?category=General",
    },
  ],
};

export default function Home() {
  return (
    <>
      {/* Server-side JSON-LD for crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />

      {/* 
        noscript fallback: semantic content for crawlers that don't execute JS.
        Hidden visually but readable by search engines.
      */}
      <noscript>
        <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
          <h1>AI Prompts Gallery — PurePrompts</h1>
          <p>
            PurePrompts is the open-source AI prompt gallery ecosystem. Discover, copy, and
            explore thousands of curated prompts for ChatGPT, Claude, Gemini, Midjourney,
            coding, image generation, and more. Free and community-driven.
          </p>
          <nav aria-label="Prompt categories">
            <ul>
              <li><a href="/?category=Images">Image Generation Prompts</a></li>
              <li><a href="/?category=Coding">Coding Prompts</a></li>
              <li><a href="/?category=General">General AI Prompts</a></li>
              <li><a href="/?category=Tactio">Tactio Prompts</a></li>
            </ul>
          </nav>
        </div>
      </noscript>

      {/* Interactive gallery (client component) */}
      <PromptGallery />
    </>
  );
}
