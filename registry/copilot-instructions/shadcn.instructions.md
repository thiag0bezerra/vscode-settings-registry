---
applyTo: '**/*.{tsx,ts,jsx,js}'
description: 'Instructions for development with shadcn/ui components'
---

# Shadcn/UI Development Guide

Use the `#githubRepo` tool with `shadcn-ui/ui` to find relevant code snippets in the Shadcn codebase.
Use the `#githubRepo` tool with `shadcn-ui/ui` to answer questions about how Shadcn is implemented.


## Core Principles

- **Open Code**: Modify components directly
- **Composition**: Shared interface between components
- **Distribution**: CLI to install components

## Initial Setup

```bash
# Initialize project
npx shadcn@latest init

# Add components
npx shadcn@latest add button input card
```

## File Structure

```
src/
├── components/ui/     # shadcn/ui components
├── lib/utils.ts       # cn() function and utilities
└── app/globals.css    # CSS variables
```

## Component Patterns

### Base Structure
```tsx
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "md" }
})

interface Props extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof variants> {
  asChild?: boolean
}

const Component = React.forwardRef<HTMLElement, Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return <Comp className={cn(variants({ variant, size }), className)} ref={ref} {...props} />
  }
)
```

### CSS Variables (globals.css)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
  --primary: 220.9 39.3% 11%;
  --primary-foreground: 210 20% 98%;
  --border: 220 13% 91%;
  --ring: 224 71.4% 4.1%;
}

.dark {
  --background: 224 71.4% 4.1%;
  --foreground: 210 20% 98%;
  --primary: 210 20% 98%;
  --primary-foreground: 220.9 39.3% 11%;
}
```

## Main Components

### Form Components
- **Button**: `variant="default|destructive|outline|secondary|ghost|link"`
- **Input**: Base input with `type` support
- **Textarea**: Multi-line text input
- **Select**: Dropdown with Radix UI
- **Checkbox**: Boolean input
- **Radio Group**: Single selection
- **Switch**: Toggle component

### Layout Components
- **Card**: Container with header/content/footer
- **Separator**: Divider line
- **Aspect Ratio**: Responsive ratios
- **Container**: Max-width wrapper

### Navigation
- **Breadcrumb**: Navigation trail
- **Pagination**: Page navigation
- **Tabs**: Content switching
- **Navigation Menu**: Dropdown menus

### Feedback
- **Alert**: Status messages
- **Toast**: Notifications (use sonner)
- **Badge**: Status indicators
- **Progress**: Loading states
- **Skeleton**: Loading placeholders

### Overlay
- **Dialog**: Modal dialogs
- **Alert Dialog**: Confirmation modals
- **Tooltip**: Hover information
- **Popover**: Click-triggered overlay
- **Sheet**: Side panel
- **Drawer**: Mobile-friendly sheet

### Data Display
- **Table**: Data tables
- **Avatar**: User images
- **Calendar**: Date picker
- **Chart**: Data visualization (recharts)
- **Collapsible**: Expandable content

### Command & Search
- **Command**: Command palette
- **Combobox**: Searchable select

## Best Practices

### Imports
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
```

### Composition
```tsx
// Use asChild for composition
<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>

// Combine components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Action</Button>
  </CardContent>
</Card>
```

### Customization
```tsx
// Extend variants
const customButton = cva(buttonVariants(), {
  variants: {
    intent: { primary: "bg-blue-600", secondary: "bg-gray-600" }
  }
})

// Override classes
<Button className={cn("custom-class", className)}>
```

### TypeScript
```tsx
// Use VariantProps for typing
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
```

## CLI Commands

```bash
# List components
npx shadcn@latest add

# Specific components
npx shadcn@latest add alert-dialog
npx shadcn@latest add data-table
npx shadcn@latest add chart

# Overwrite existing
npx shadcn@latest add button --overwrite

# Use specific template
npx shadcn@latest init --template next
```

## Framework Integration

### Next.js
- App Router supported
- Server/Client components
- Automatic CSS imports

### Vite/React
- PostCSS configured
- Alias paths (@/*)

### Remix
- Manual CSS imports
- Tailwind setup

Use `npx shadcn@latest init` for automatic configuration based on detected framework.
