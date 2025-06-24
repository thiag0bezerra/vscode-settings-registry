import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Schema para instruções do Copilot
const copilotInstructions = defineCollection({
  loader: glob({
    base: '../registry/copilot-instructions',
    pattern: '**/*.{md,instructions.md}'
  }),
  schema: z.object({
    applyTo: z.string().default('**'),
    description: z.string().optional(),
    title: z.string().optional(),
  })
});

// Schema para prompts do Copilot
const copilotPrompts = defineCollection({
  loader: glob({
    base: '../registry/copilot-prompts',
    pattern: '**/*.{md,prompt.md}'
  }),
  schema: z.object({
    description: z.string().optional(),
    category: z.string().optional(),
    title: z.string().optional(),
  })
});

// Schema para configurações de VS Code (incluindo README files)
const settings = defineCollection({
  loader: glob({
    base: '../registry/settings',
    pattern: '**/*.{json,md}'
  }),
  schema: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    title: z.string().optional(),
  })
});

// Schema para extensões (incluindo README files)
const extensions = defineCollection({
  loader: glob({
    base: '../registry/extensions',
    pattern: '**/*.{json,md}'
  }),
  schema: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    publisher: z.string().optional(),
    category: z.string().optional(),
    title: z.string().optional(),
  })
});

// Schema para devcontainers (incluindo README files)
const devcontainers = defineCollection({
  loader: glob({
    base: '../registry/devcontainers',
    pattern: '**/*.{json,md}'
  }),
  schema: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    title: z.string().optional(),
  })
});

// Schema para configurações MCP (incluindo README files)
const settingsMcp = defineCollection({
  loader: glob({
    base: '../registry/settings-mcp',
    pattern: '**/*.{json,md}'
  }),
  schema: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    server: z.string().optional(),
    title: z.string().optional(),
  })
});

export const collections = {
  'copilot-instructions': copilotInstructions,
  'copilot-prompts': copilotPrompts,
  'settings': settings,
  'extensions': extensions,
  'devcontainers': devcontainers,
  'settings-mcp': settingsMcp,
};
