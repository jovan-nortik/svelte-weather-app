# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit weather application using Svelte 5 with TypeScript. The project follows the standard SvelteKit architecture with file-based routing.

## Development Commands

```bash
# Start development server
npm run dev

# Start dev server and open in browser
npm run dev -- --open

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check without emitting files
npm run check

# Type-check in watch mode
npm run check:watch
```

## Architecture

### Framework & Build Tool
- Built on SvelteKit 2.x with Svelte 5.x
- Uses Vite 7.x as the build tool
- TypeScript with strict mode enabled
- Vite preprocessing for Svelte components

### Project Structure
- `src/routes/` - File-based routing (SvelteKit convention)
  - `+page.svelte` - Route pages
  - `+layout.svelte` - Layout wrappers that apply to routes
- `src/lib/` - Shared library code, importable via `$lib` alias
- `src/app.d.ts` - TypeScript type declarations for SvelteKit App namespace

### Key Conventions
- Route files prefixed with `+` (e.g., `+page.svelte`, `+layout.svelte`) are special SvelteKit files
- The `$lib` alias resolves to `src/lib/` for convenient imports
- Components use Svelte 5's new `$props()` runes API instead of legacy props syntax
- TypeScript is configured with `moduleResolution: "bundler"` for modern bundler-first resolution

### Deployment
- Uses `@sveltejs/adapter-auto` which automatically selects the appropriate adapter for common deployment platforms
- For custom deployment targets, may need to switch to a specific adapter (see SvelteKit adapter documentation)
