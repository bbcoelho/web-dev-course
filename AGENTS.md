# Agent Guidelines for YelpCamp Project

## Build/Lint/Test Commands
- **Build**: `npm run build` (TypeScript compilation + asset copying)
- **Test all**: `npm run tests` (Playwright e2e tests)
- **Test single**: `npx playwright test tests/<filename>.spec.ts`
- **Dev server**: `npm run dev` (auto-restart on file changes)
- **Type check**: `npx tsc --noEmit` (TypeScript validation)

## Code Style Guidelines

### Imports & Modules
- Use ES6 imports: `import express from 'express'`
- Use `require()` only for CommonJS modules (ejs-mate)
- Group imports: built-ins, third-party, local modules

### TypeScript
- Strict mode enabled with additional checks (noUncheckedIndexedAccess, exactOptionalPropertyTypes)
- Use interfaces for Mongoose document types: `ICampground extends Document`
- Explicit types for variables and function parameters
- Target ESNext with NodeNext modules

### Naming Conventions
- **Variables/Functions**: camelCase (`campground`, `findById`)
- **Interfaces**: PascalCase with I prefix (`ICampground`)
- **Classes/Models**: PascalCase (`Campground`)
- **Files**: kebab-case for routes, camelCase for models

### Error Handling
- Database connection: throw Error for missing env vars
- Route handlers: check for null/undefined before operations
- Basic 404 handling for unknown routes

### Database & Async
- Use async/await for all database operations
- Mongoose timestamps enabled automatically
- Schema validation with required fields and constraints

### Formatting
- 4-space indentation
- Single quotes for strings
- Trailing commas in objects/arrays
- Consistent spacing around operators