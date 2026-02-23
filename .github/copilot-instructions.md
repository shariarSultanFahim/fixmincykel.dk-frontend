---
applyTo: "**"
---

# FixMinCykel.dk | Frontend Branding & Style Instructions

You are an expert frontend developer. Follow these strict branding and implementation guidelines for FixMinCykel.dk.

## 1. Design Philosophy

- **Style:** Clean, modern, flat, and cartoon-inspired.
- **Vibe:** Friendly, accessible, and high-usability.
- **Component Strategy:** Use shadcn/ui components customized with the brand theme.

## 2. Brand Theme & Tailwind v4 Mapping

Register these variables in the `@theme` block. Use these names for consistency.

| Brand Element    | Hex Code  | Tailwind Variable        | shadcn Mapping                          |
| :--------------- | :-------- | :----------------------- | :-------------------------------------- |
| **Primary Blue** | `#00C6CF` | `--color-primary`        | `--primary`                             |
| **Mint Green**   | `#C3FFF2` | `--color-secondary-mint` | `--secondary`                           |
| **Dark Navy**    | `#002E5D` | `--color-navy`           | `--foreground` & `--primary-foreground` |
| **White**        | `#FFFFFF` | `--color-white`          | `--background`                          |
| **Light Grey**   | `#F6F8FA` | `--color-muted`          | `--muted`                               |

## 3. Typography & Spacing

- **Fonts:** Poppins (Regular 400, Bold 700).
- **H1-H3:** Bold, Navy (`#002E5D`). Desktop: 42-56px, Mobile: 30-36px.
- **Body:** 16-18px, Navy. Line-height: 1.4-1.5.
- **Cards:** Padding 20-32px. Use `--radius-lg` (set to 24px) for a "cartoon" rounded look.

## 4. shadcn Component Requirements

- **Buttons:** Must use primary blue (`#00C6CF`) with white text.
- **Inputs:** Use Light Grey (`#F6F8FA`) backgrounds with subtle shadows.
- **Outlines:** Illustrations and key cards should use a 2px solid Dark Navy (`#002E5D`) border for the "flat cartoon" look.
- **Utility:** Use the `cn()` helper for all class merging.

## General

- Remove unnecessary imports and console.log statements before commits.
- Commit messages must follow the Conventional Commits format (feat:, fix:, refactor:, etc.).
- ESLint and Prettier rules must be fully enforced.
- Prettier settings: singleQuote: false, trailingComma: none, printWidth: 100, import ordering and separation enabled.

## TypeScript

- The any type must not be used.
- All type definitions must be located under src/types.
- Type files must be written in kebab-case (e.g., user.ts, site-config.ts).
- Type names use PascalCase without a Type suffix (e.g., User, SiteConfig). Prefer const user: User = over const user: UserType =.
- Use interface for object shapes, and type for unions or advanced type compositions.

## Environment Variables

- Environment variables must be managed with @t3-oss/env-nextjs.
- The src/env.ts file must be the single source of truth across the project.
- Environment variables must be validated with Zod and used with the NEXT*PUBLIC* prefix.

## Functions & Hooks

- Custom hooks must always start with use (e.g., useUsers).
- Custom hook files must live under src/hooks and be named in kebab-case (e.g., use-users.ts).
- Hook function names must be written in camelCase.
- Functions must have a single responsibility, kept simple and focused.

## State Management

- Use React Context providers for global state management.
- Provider files must live under src/providers and use PascalCase (e.g., CounterProvider.tsx).
- Provider hooks must be named in the useX form (e.g., useCounter).

## Data Fetching

- HTTP requests must be made with Axios.
- Axios calls must be made through the get, post, put, del helpers in src/lib/api.ts.
- Use TanStack Query hooks (useQuery, useMutation) for data operations across the project.
- Handle errors with try/catch and user feedback mechanisms such as toasts.

## Components & Structure

- All file and folder names must be kebab-case (e.g., locale-switcher, query-client.ts).
- Component files (widgets, layouts) must be PascalCase (e.g., UserList.tsx).
- UI components must be kebab-case (e.g., button.tsx).
- Every component folder must include an index.ts file exporting the component.
- Each subfolder under components must export its submodules via an index.ts file.
- In components/widgets, folder names must be kebab-case and component files inside must be PascalCase.
- The widgets directory must also have an index.ts file that re-exports all widgets.
- Prop and variable names must be intent-driven (e.g., onSubmit, isLoading, variant).
- Shadcn/UI components under components/ui must be kept as-is; do not modify them.

## Naming Conventions

- Folders and base files must be named in kebab-case.
- Components (widgets, layouts, pages) must be named in PascalCase.
- UI components must be named in kebab-case.
- Helper and util files must be named in kebab-case (e.g., format-currency.ts).
- Hook files must be kebab-case and start with use- (e.g., use-users.ts).
- Hook function names must be camelCase and start with use (e.g., useUsers).
- Data files live under src/data and use kebab-case (e.g., user.ts, stack.ts).
- Icon components must be PascalCase and end with Icon (e.g., ReactIcon).
- Type and interface names must be PascalCase without a Type suffix (e.g., User, SiteConfig).
- Type files live under src/types and use kebab-case (e.g., user.ts, site-config.ts).
- Constants must be written in SNAKE_CASE (e.g., DEFAULT_LOCALE).

## Utilities, Helpers & Constants

- Reusable functions must be kept under src/utils.
- Domain-specific or computation-focused functions must be under src/helpers.
- Constants must be defined under src/constants and must not be kept inside components.
- Static or mock data must be placed under src/data; variable names may end with Data (e.g., stackData).

## Styling & Design

- Tailwind CSS and ShadCN must be used exclusively.
- Inline styles are forbidden.
- Prefer soft and pastel tones in the design.
- Layout, spacing, and alignment must be handled with ShadCN.

## Accessibility (a11y)

- All components must comply with accessibility standards.
- Use appropriate aria attributes where necessary.
- Wrap meaningful images with semantic <figure> elements for proper context and captions.

## Icons

- All icons must be sourced from the lucide-react library.
- Do not mix different icon libraries.

## Project Defaults

- Use Next.js App Router APIs for cookie operations.
- On the server, use cookies() (next/headers), middleware, or NextResponse.cookies.set inside route handlers; on the client side, use the cookie helper functions from src/lib/cookie-client.ts.
- Use src/lib/date.ts helpers for date formatting; use Intl for number and currency formatting when needed.
- Use @sindresorhus/slugify for slug generation.
- General-purpose helper hooks may be used from usehooks-ts (e.g., useLocalStorage, useMediaQuery, useDebounceValue).

## Precedence

- In case of any rule conflicts, repository-specific rules take precedence over global rules.

---

name: 'Admin Dashboard Route Guidelines'
description: 'Specific coding standards for the Admin Dashboard.'
applyTo:

- 'src/app/(private)/admin/\*\*'

---

# Admin Dashboard Instructions

- Use the Header component for the main title, subtitle and icon of the dashboard.
- The Header component should be placed at the top of the page, followed by the main content.

## Styling & Design

- Tailwind CSS and ShadCN must be used exclusively.
- Inline styles are forbidden.
- Prefer soft and pastel tones in the design.
- Layout, spacing, and alignment must be handled with ShadCN.

## Components & Structure

- All file and folder names must be kebab-case (e.g., locale-switcher, query-client.ts).
- Component files (widgets, layouts) must be PascalCase (e.g., UserList.tsx).
- UI components must be kebab-case (e.g., button.tsx).
- Shadcn/UI components under components/ui must be kept as-is; do not modify them.
- Remove unnecessary imports and console.log statements before commits.
- Every page should use componnets from the components directory (/{route}/components) for layout and UI elements. Avoid hardcoding styles or elements directly in the page file.
- Forms should be made in a modular way, using shadcn/ui form components and custom form components from the components directory. Avoid inline styles or hardcoded form elements in the page file.
- Always use Suspense and Skaleton Fallback for pages that will use data fetching with TanStack Query. The fallback should be a simple skeleton loader that matches the layout of the page content. Avoid hardcoding loading states or spinners directly in the page file. And keep the skeletok under the routes components/skeletons directory for better organization and reusability.
- Use skeleton even if it is using a Json data for now, as API will be integrated later. This will ensure a smoother transition when the API is ready and will provide a better user experience during loading states.

## Form Logis

- Form state management should be handled with React Hook Form and Zod for validation. Avoid using useState for form state or custom validation logic in the page file.
- Keep all forms under the routes components/forms directory and Zod schemas under the routes components/schemas directory for better organization and reusability.

## Data Fetching

- Make a data folder under the route (e.g., src/app/(private)/admin/users/data) to keep all data json for now as API will be integrated later.
