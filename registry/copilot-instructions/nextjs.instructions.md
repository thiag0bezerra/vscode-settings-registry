---
applyTo: '**/*.{ts,tsx,js,jsx}'
description: 'Next.js 15 App Router with TypeScript 5'
---

# Next.js 15 App Router + TypeScript 5

Use the `#githubRepo` tool with `vercel/next.js` to find relevant code snippets in the Nextjs codebase.
Use the `#githubRepo` tool with `vercel/next.js` to answer questions about how Nextjs is implemented.


## File Structure

- `app/` - App Router (new standard)
- `app/layout.tsx` - Required root layout
- `app/page.tsx` - Home page
- `app/loading.tsx` - Loading UI
- `app/error.tsx` - Error UI
- `app/not-found.tsx` - 404 page

## Essential Components

### Server Components (default)
```tsx
// app/page.tsx
export default function Page() {
  return <div>Server Component</div>
}
```

### Client Components
```tsx
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### Layout
```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## Routing

- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/post-1`
- `app/(group)/page.tsx` → `/` (route group)
- `app/@modal/page.tsx` → Parallel route

## App Router Hooks

```tsx
'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <button onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

## Data Fetching

### Server Components
```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

### Metadata
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to our app',
}
```

## TypeScript

### Page Props
```tsx
type PageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params, searchParams }: PageProps) {
  return <div>Post: {params.slug}</div>
}
```

### Route Handlers
```tsx
// app/api/users/route.ts
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return Response.json({ users: [] })
}
```

## Patterns

- Use Server Components by default
- Add `'use client'` only when necessary
- Prefer `async/await` in Server Components
- Use `next/navigation` in App Router
- Implement loading and error boundaries
