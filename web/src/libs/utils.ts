import { basename, dirname } from "node:path";

export interface CollectionItem {
  id: string;
  filePath?: string;
  collection: string;
  data?: { description?: string };
  body?: string;
}

export function createSlug(id: string): string {
  let slug = id;

  // Remove the 'registry/' prefix if present
  if (slug.startsWith("registry/")) {
    slug = slug.slice(9);
  }

  // Remove extensions for URL generation
  slug = slug.replace(/\.(instructions|prompt)\.md$|\.(?:md|json)$/, "");

  // For files in folders, take only the filename part for the slug
  const lastSlashIndex = slug.lastIndexOf("/");
  if (lastSlashIndex !== -1) {
    slug = slug.slice(lastSlashIndex + 1);
  }

  return slug.toLowerCase();
}

export function getFileName(item: CollectionItem): string {
  const path = item.filePath || item.id;
  const dirName = basename(dirname(path));
  const fileName = basename(path);

  if (item.collection === dirName) {
    return fileName;
  } else {
    return `${dirName}/${fileName}`;
  }
}

export function getDisplayPath(item: CollectionItem): string {
  const filePath = item.filePath || item.id;
  const fileName = basename(filePath);
  const dirName = basename(dirname(filePath));

  if (item.collection === dirName) {
    return fileName;
  } else {
    return `${dirName}/${fileName}`;
  }
}

export function getLanguage(ext: string, content: string): string {
  switch (ext) {
    case '.json':
      return 'json';
    case '.md':
      return 'markdown';
    case '.ts':
      return 'typescript';
    case '.js':
      return 'javascript';
    default:
      // Try to detect from content
      if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
        return 'json';
      }
      return 'text';
  }
}

export function formatCollectionName(key: string): string {
  return key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}


export const COLLECTION_KEYS = [
  "copilot-instructions",
  "copilot-prompts",
  "settings",
  "extensions",
  "devcontainers",
  "settings-mcp",
] as const;

export type CollectionKey = typeof COLLECTION_KEYS[number];
