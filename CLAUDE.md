# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library providing type guard functions for runtime type checking. The library exports utility functions like `isString`, `isNumber`, `isObject`, `isArray`, etc. with proper TypeScript type narrowing.

## Development Commands

**Building:**
- `npm run build` - Build all output formats (CJS, ESM, and types)
- `npm run build:cjs` - Build CommonJS output to `./dist/cjs/`
- `npm run build:esm` - Build ES modules to `./dist/esm/`
- `npm run build:types` - Build TypeScript declarations to `./dist/types/`

**Type Checking:**
- `npm run check-types` - Run TypeScript compiler without emitting files
- `npm run check-types:watch` - Run type checking in watch mode

**Linting:**
- `npm run lint` - Run ESLint
- `npm run eslint:fix` - Run ESLint with auto-fix
- `npm run lint:fix` - Run both ESLint and Prettier with auto-fix

**Release:**
- `npm run release` - Create a release using simple-release

## Code Architecture

**Single Module Library:**
- All type guard functions are exported from `src/index.ts`
- Functions use TypeScript's type predicate syntax (`value is Type`)
- Generic type support with complex utility types for proper type narrowing
- Uses `Object.prototype.toString` for reliable type checking where needed

**Build Targets:**
- CommonJS (`dist/cjs/`) - Main entry point
- ES Modules (`dist/esm/`) - Module entry point
- TypeScript declarations (`dist/types/`) - Types entry point

**Git Hooks:**
- Pre-commit: Runs lint-staged (ESLint + Prettier) and type checking
- Pre-push: Runs full lint check
- Commit message: Validates with simple-release-lint

## Code Style

- Prettier configuration: single quotes, 120 print width, 2-space tabs, trailing commas (ES5)
- ESLint with TypeScript, import, JSDoc, and other plugins
- Strict TypeScript configuration targeting ES5 with DOM types