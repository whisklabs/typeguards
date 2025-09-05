# Newcomer's Guide to @whisklabs/typeguards

## Project Overview

**@whisklabs/typeguards** is a lightweight TypeScript library that provides runtime type checking utilities with proper TypeScript type narrowing. This project exemplifies modern TypeScript library development practices, including multi-format builds, strict type safety, and automated release processes.

### Core Philosophy

The library follows these key principles:
- **Zero runtime dependencies** - Pure TypeScript/JavaScript implementation
- **Type safety first** - Proper type predicates for compile-time type narrowing
- **Performance-oriented** - Efficient runtime checks using native JavaScript methods
- **Browser and Node.js compatible** - Works across all JavaScript environments

## Project Structure

```
typeguards/
├── src/
│   └── index.ts              # Single source file with all type guards
├── dist/                     # Build outputs (generated)
│   ├── cjs/                  # CommonJS build
│   ├── esm/                  # ES Modules build
│   └── types/                # TypeScript declarations
├── .github/workflows/        # CI/CD automation
├── package.json              # Project configuration
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.js              # ESLint configuration
└── CHANGELOG.md              # Release notes
```

## Core Architecture & Design Patterns

### 1. Type Predicate Pattern

Every function follows TypeScript's type predicate syntax:

```typescript
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

**Key Elements:**
- `value: unknown` - Accepts any input type safely
- `value is string` - Type predicate for compile-time narrowing
- Simple, reliable runtime check

### 2. Advanced Generic Type Support

Complex utility types enable sophisticated type narrowing:

```typescript
type ExtractPlus<T, U, K> = any extends T ? K : T extends U ? T : K;
type ObjectCheck<T> = T extends Record<any, unknown> ? T : Record<any, unknown>;
type Maybe<T> = T | null | undefined;

export function isArray<T>(value: T | unknown[]): value is ExtractPlus<T, any[] | readonly any[], unknown[]> {
  return Array.isArray(value);
}
```

**Design Insights:**
- `ExtractPlus` preserves original types when possible, falls back to safe defaults
- `ObjectCheck` ensures object types remain objects after type narrowing
- `Maybe` utility type handles nullable scenarios consistently

### 3. Performance-Optimized Checks

The library uses the most efficient detection methods:

```typescript
const toString = Object.prototype.toString;

export function isDate(value: unknown): value is Date {
  return toString.call(value) === '[object Date]';
}
```

**Performance Patterns:**
- `Object.prototype.toString.call()` for reliable type detection
- `typeof` for primitive types (fastest)
- `Array.isArray()` for arrays (built-in optimized)
- Direct property checks for object-like types

### 4. Edge Case Handling

Careful attention to JavaScript quirks:

```typescript
export const isNaN: (num: number) => boolean = isFunction((Number as unknown as NumberPlus).isNaN)
  ? (Number as unknown as NumberPlus).isNaN
  : (num: number) => num !== num;
```

**Edge Case Patterns:**
- Feature detection for modern APIs
- Fallback implementations for older environments
- Explicit handling of `NaN`, `null`, `undefined` edge cases

## Development History & Evolution

### Initial Release (v1.0.0 - September 2020)
- **Commit**: `39c3873` - feat: init release
- **Major Changes**: Complete initial implementation
- **Architecture Decisions**:
  - Single source file approach for simplicity
  - Comprehensive ESLint configuration with 260+ rules
  - Multi-format build system (CJS, ESM, TypeScript declarations)
  - GitHub Actions CI/CD pipeline
  - Husky pre-commit hooks

### TypeScript 5.2+ Compatibility (v1.0.1 - September 2023)
- **Commit**: `92397d4` - refactor: update for ts5.2+ (#1)
- **Critical Changes**:
  - Fixed type compatibility issues with TypeScript 5.2+
  - Updated `ObjectCheck` type definition
  - Simplified `Maybe` utility type
  - Improved type casting syntax for better compatibility
- **Dependencies**: Updated to TypeScript 5.2.2 and modern ESLint ecosystem

## Development Practices & Patterns

### 1. Commit Message Convention
The project follows [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` for new features
- `refactor:` for code improvements
- `chore:` for maintenance tasks
- `[skip ci]` suffix for automated commits

### 2. Quality Assurance Pipeline

**Pre-commit Hooks (Husky):**
```bash
pre-commit: lint-staged && npm run check-types
pre-push: npm run lint
commit-msg: simple-release-lint
```

**CI/CD Pipeline:**
1. **Quality Checks**: Type checking + full linting
2. **Build**: Multi-format compilation
3. **Release**: Automated versioning and publishing

### 3. Code Style Enforcement

**ESLint Configuration Highlights:**
- **Strict TypeScript rules** - 40+ TypeScript-specific rules
- **Import organization** - Alphabetical sorting with group separation
- **Code complexity limits** - Max complexity of 20
- **Naming conventions** - Strict camelCase enforcement
- **Security rules** - No console, eval, or unsafe patterns

**Prettier Integration:**
- Single quotes, 120 character line length
- 2-space indentation, trailing commas
- Arrow function parentheses avoided where possible

### 4. Build System Architecture

**Multi-Target Compilation:**
```bash
npm run build:cjs    # CommonJS (main entry point)
npm run build:esm    # ES Modules (module entry point)
npm run build:types  # TypeScript declarations (types entry point)
```

**Package.json Entry Points:**
```json
{
  "main": "./dist/cjs/index.js",      // Node.js CommonJS
  "module": "./dist/esm/index.js",    // Bundler ES modules
  "types": "./dist/types/index.d.ts"  // TypeScript definitions
}
```

## Key Technical Decisions

### 1. Single Source File Strategy
- **Rationale**: Simple API surface, minimal complexity
- **Benefits**: Easy maintenance, single source of truth
- **Trade-offs**: Limited modularity, but appropriate for focused library

### 2. Zero Dependencies
- **Rationale**: Minimize security surface, reduce bundle size
- **Implementation**: Pure JavaScript with TypeScript types
- **Impact**: Self-contained, reliable, fast installation

### 3. Comprehensive Type Safety
- **Pattern**: Every function has proper type predicates
- **Advanced**: Generic types preserve input type information
- **Result**: Compile-time type narrowing without runtime overhead

### 4. Performance-First Approach
- **Method Selection**: Benchmarked detection methods (see `// http://jsperf.com/isobject4`)
- **Optimization**: Cached `toString` reference for repeated calls
- **Result**: Minimal runtime performance impact

## Getting Started for Development

### 1. Initial Setup
```bash
git clone https://github.com/whisklabs/typeguards.git
cd typeguards
npm install
```

### 2. Development Workflow
```bash
# Type checking in watch mode
npm run check-types:watch

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Build all formats
npm run build
```

### 3. Quality Checks
```bash
# Full quality check (what CI runs)
npm run check-types && npm run lint

# Build verification
npm run build
```

### 4. Release Process
- **Automated**: Handled by GitHub Actions on master branch pushes
- **Manual**: `npm run release` (requires proper permissions)
- **Versioning**: Follows semantic versioning via simple-release

## Code Patterns & Conventions

### 1. Function Signature Pattern
```typescript
export function isSomeType(value: unknown): value is SomeType {
  // Implementation using most efficient detection method
  return /* boolean expression */;
}
```

### 2. Generic Type Preservation
```typescript
export function isArray<T>(value: T | unknown[]): value is ExtractPlus<T, any[] | readonly any[], unknown[]> {
  return Array.isArray(value);
}
```

### 3. Error Handling Pattern
```typescript
export function isError(value: unknown): value is Error {
  const tag = toString.call(value);
  switch (tag) {
    case '[object Error]':
    case '[object Exception]':
    case '[object DOMException]':
      return true;
    default:
      return value instanceof Error;
  }
}
```

### 4. Browser Compatibility Pattern
```typescript
export function isWindow(value: unknown): value is Window {
  return isObject(value) && value.window === value;
}
```

## Testing Philosophy

While this project doesn't include explicit test files, the design enables easy testing:
- **Pure functions** - No side effects, deterministic output
- **Type-safe inputs** - `unknown` parameter ensures safe testing
- **Clear contracts** - Type predicates define exact behavior

## Future Considerations

Based on the project's evolution patterns:
- **Compatibility**: Regular TypeScript version updates will be needed
- **Performance**: Monitor for new JavaScript type detection APIs
- **Functionality**: Additional type guards may be added based on community needs
- **Standards**: ESLint rules may need updates as TypeScript evolves

## Contributing Guidelines

When working on this project:
1. **Maintain zero dependencies** - No runtime dependencies allowed
2. **Follow existing patterns** - Use established type predicate structure
3. **Performance matters** - Benchmark new detection methods
4. **Type safety first** - Ensure proper TypeScript type narrowing
5. **Test thoroughly** - Verify edge cases and browser compatibility
6. **Document decisions** - Add comments for complex type manipulations

This library represents a mature, well-architected approach to TypeScript type guards with a focus on reliability, performance, and developer experience.