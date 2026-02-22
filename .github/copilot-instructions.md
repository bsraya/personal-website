---
name: General Instructions
description: This file contains general instructions for the project.
applyTo: '**'
---

# Copilot Instructions

## Project Overview

This project is a personal web page built using Astro.js, Solid.js, Tailwind CSS, and TypeScript. This web page is dedicated solely to showcasing personal projects, blog posts, and other relevant content.

## Project Structure

The project is organized into the following directories:
- `public/`: Contains static assets such as images, stylesheets, and JavaScript files that are served directly to the client.
- `src/`: Contains the source code of the application.
- `src/components/`: Contains reusable React components.
- `src/pages/`: Contains page components that represent different routes in the application.
- `src/utils/`: Contains utility functions and helper modules.
- `src/layouts/`: Contains layout components that define the overall structure of the pages.
- `src/styles/`: Contains global styles and CSS files.
- `src/types/`: Contains TypeScript type definitions and interfaces.
- `src/content/`: Contains content files such as markdown or JSON that are used in the application.

## Tech Stack

- **Framework**: Astro 5.17+ (SSG/SSR with Islands Architecture)
- **UI Library**: Solid.js 5.1+ (reactivity and component model)
- **Styling**: Tailwind CSS 4.1+ with Typography plugin
- **Content**: MDX for content authoring
- **Icons**: Lucide Solid
- **UI Components**: Shadcn UI
- **Animations**: tw-animate-css
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Code Style & Conventions

### File Structure

- Use `.astro` for pages and Astro components
- Use `.tsx` for React components
- Use `.mdx` for content pages
- Use `.ts` for utility functions, type definitions, and configuration files
- Keep components in `src/components/`
- Keep pages in `src/pages/`
- Keep layouts in `src/layouts/`

###  File Structure

```
public/
├── assets/
│   ├── posts/
│   │   └── post-1/
│   │       └── post-1.png
│   └── works/
│       └── works-1/
│           └── works-1.png
├── favicon.svg
├── manifest.webmanifest
├── resume.pdf
├── robots.txt
└── static/
    ├── icon-48x48.png
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-256x256.png
    ├── icon-384x384.png
    └── icon-512x512.png

src/
├── components/
│   ├── SomeSolidComponent.tsx
│   ├── chart/
│   │   ├── Bar.tsx
│   │   ├── Line.tsx
│   │   ├── Pie.tsx
│   │   └── Scatter.tsx
│   ├── mdx/
│   │   └── some-mdx-component.astro
│   └── SomeAstroComponent.astro
├── content/
│   ├── posts/
│   │   └── posts.mdx
│   └── works/
│       └── works-one.mdx
├── content.config.ts
├── env.d.ts
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── posts/
│   │   ├── [slug].astro
│   │   └── [slug].og.ts
│   ├── posts.astro
│   ├── [slug].og.ts
│   ├── tag/
│   │   ├── [slug].og.ts
│   │   └── [tag].astro
│   ├── works/
│   │   ├── [slug].astro
│   │   └── [slug].og.ts
│   └── works.astro
├── styles/
├── types/
└── utils/
```

### Astro Components

- Prefer Astro components for static content
- Use React components only when client-side interactivity is needed
- Add `client:*` directives explicitly when hydration is required
- Follow this structure:

```astro
---
// Component script (TypeScript)
import type { Props } from './types';
---
<!-- Template -->
<style>
  /* Scoped styles if needed */
</style>
```

### Solid Components

- Use Solid components for interactive UI elements
- Follow this structure:

```tsx
import { Component } from 'solid-js';
import type { Props } from './types';

const SomeComponent: Component<Props> = (props) => {
  // Component logic here

  return (
    <div>
      {/* JSX template here */}
    </div>
  );
};
```

### Styling with Tailwind CSS

- Use Tailwind CSS utility classes as the primary styling method
- Avoid custom CSS unless necessary
- Use the Typography plugin for rich text content
- Use `cn()` helper (clsx + tailwind-merge) for conditional class names
- Use `cva()` from class-variance-authority for complex variant-based styles
- Leverage `@tailwindcss/typography` for prose and rich text styling
- Example usage:

```tsx
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
const buttonStyles = cva('px-4 py-2 rounded', {
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
    },
  },
});
export const Button: FC<{ variant: 'primary' | 'secondary' }> = ({ variant }) => {
  return (
    <button className={twMerge(clsx(buttonStyles({ variant })))} >
      Click me
    </button>
  );
};
```

### Animations

- Use tw-animate-css for Tailwind-based animations
- Use canvas-confetti for celebration effects
- Keep animations subtle and purposeful
- Prefer CSS animations over JS when possible

### Type Safety

- Use TypeScript for all code
- Define clear interfaces for props and state
- Use proper types from installed libraries and frameworks `@types` when available
- Avoid using `any` type unless absolutely necessary

### Content (MDX)

- Use MDX for content pages to allow embedding React components
- Keep content structured and organized
- Use front matter for metadata when needed
- Leverage `@tailwindcss/typography` for styling rich text content

## Best Practices

### Performance

- Minimize client-side JavaScript by using Astro's partial hydration
- Use `client:load`, `client:visible`, or `client:idle` directives to control when React components are hydrated
- Optimize images and assets for web performance
- Use lazy loading for images and components when appropriate

### Accessibility

- Use semantic HTML elements for better accessibility
- Follow WCAG guidelines for accessibility
- Include ARIA attributes when necessary to enhance accessibility
- Ensure all interactive elements are keyboard accessible
- Test keyboard navigation and screen reader compatibility
- Use tools like Lighthouse and axe for accessibility audits
- Use Shadcn UI components for accessible UI primitives

### Code Organization

- Keep components small and focused on a single responsibility
- Use clear and descriptive names for components, props, and variables
- Organize components into folders based on their purpose (e.g., `ui`, `layout`, `content`)
- Use index files for easier imports when necessary
- Avoid deeply nested component structures to maintain readability
- Use comments to explain complex logic or decisions when necessary
- Regularly refactor code to improve readability and maintainability
- Use consistent formatting and linting rules across the codebase

### Imports

- Use path aliases (e.g., `@components`) for cleaner imports
- Group imports by type (e.g., external libraries, internal components, styles)
- Avoid deep relative imports (e.g., `../../../components`) when possible
- Use named imports for better readability and tree-shaking benefits

### Testing & Quality

- Write descriptive component names
- Add comments for complex logic
- Ensure responsive design (mobile-first)
- Test across different browsers
- Validate HTML and accessibility

### When Suggesting Code

- Use TypeScript with proper types
- Follow the established patterns above
- Ensure accessibility considerations
- Optimize for performance (minimal JS)
- Use Tailwind CSS for all styling
- Leverage existing dependencies before suggesting new ones