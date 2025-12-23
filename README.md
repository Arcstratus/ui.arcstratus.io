# Arcstratus UI

Svelte 5 component library with CLI

## Installation

Initialize Arcstratus UI in your project:

```sh
npx @arcstratus/ui init
```

This will:
- Install `clsx`, `tailwind-merge`, and `daisyui` dependencies
- Configure DaisyUI plugin in your CSS file (`app.css` or `layout.css`)
- Create `src/lib/utils.ts` with the `cn()` utility function

## Usage

Add components to your project:

```sh
npx @arcstratus/ui add [component]
```

## Packages

- `/packages/cli` - CLI tool
- `/src/lib` - Component library
