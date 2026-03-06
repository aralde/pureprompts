export interface PromptMetadata {
  description: string;
  author: string;
  version: string;
  category: string;
  tags: string[];
  globs: string[];
  url?: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string; // The .md content
  metadata: PromptMetadata;
  url?: string;
}

// ... (interfaces remain)

import externalPrompts from '@/data/external-prompts.json';
import externalImagePrompts from '@/data/external-image-prompts.json';

const MOCK_PROMPTS: Prompt[] = [
  ...(externalPrompts as unknown as Prompt[]),
  ...(externalImagePrompts as unknown as Prompt[])
];

export async function getPrompts(
  page: number = 1,
  limit: number = 20,
  categories?: string[] | null,
  tags?: string[] | null,
  search?: string
): Promise<{ prompts: Prompt[], hasMore: boolean, total: number }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allPrompts = MOCK_PROMPTS;

  let filtered = allPrompts;

  if (categories && categories.length > 0) {
    filtered = filtered.filter(p => categories.includes(p.metadata.category));
  }

  if (tags && tags.length > 0) {
    filtered = filtered.filter(p => p.metadata.tags.some(t => tags.includes(t)));
  }

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.metadata.description.toLowerCase().includes(query)
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPrompts = filtered.slice(start, end);

  return {
    prompts: paginatedPrompts,
    hasMore: end < filtered.length,
    total: filtered.length
  };
}

export async function getPromptById(id: string): Promise<Prompt | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_PROMPTS.find(p => p.id === id);
}

export async function getCategories(): Promise<string[]> {
  const categories = new Set(MOCK_PROMPTS.map(p => p.metadata.category));
  return Array.from(categories);
}


export async function getTags(): Promise<string[]> {
  const tags = new Set(MOCK_PROMPTS.flatMap(p => p.metadata.tags));
  return Array.from(tags).sort();
}

export async function getTotalPromptsCount(): Promise<number> {
  return MOCK_PROMPTS.length;
}
