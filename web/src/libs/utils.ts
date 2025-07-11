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

  // Keep the full path to ensure uniqueness, replacing slashes with hyphens
  slug = slug.replace(/\//g, "-");

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
  let path = item.filePath || item.id;

  // Remove registry/ prefix if present
  if (path.startsWith("registry/")) {
    path = path.slice(9);
  }

  // Remove collection name from the beginning if present
  const collectionPrefix = `${item.collection}/`;
  if (path.startsWith(collectionPrefix)) {
    path = path.slice(collectionPrefix.length);
  }

  return path;
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
