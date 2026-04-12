# TypeGuards

A lightweight TypeScript library providing runtime type checking utilities with proper TypeScript type narrowing.

## Install

```bash
npm i @whisklabs/typeguards
```

## Usage

```ts
import { isString, isNumber, isArray } from '@whisklabs/typeguards';

// Type narrowing works automatically
function processValue(value: unknown) {
  if (isString(value)) {
    // value is now typed as string
    console.log(value.toUpperCase());
  }
  
  if (isArray(value)) {
    // value is now typed as unknown[]
    console.log(value.length);
  }
}
```

## Functions

- **isPresent** - not undefined or null
- **isUndefined** - undefined value
- **isDefined** - not undefined value
- **isObject** - object with Generic support
- **isString** - string value
- **isNumber** - number value
- **isNaN** - NaN value
- **isDate** - Date object
- **isArray** - Array with Generic support
- **isError** - any Error types
- **isErrorEvent** - Error Event
- **isFunction** - any function
- **isRegExp** - RegExp value
- **isText** - non empty string
- **isBoolean** - boolean value
- **isWindow** - window object
- **isFile** - File object
- **isFormData** - Form Data object
- **isBlob** - blob value
- **isPromiseLike** - Promise-like object
- **isArrayBuffer** - any type of ArrayBuffer
- **isTypedArray** - any type of TypedArray

## Documentation

- **[Newcomer's Guide](NEWCOMER.md)** - Comprehensive guide for developers new to this project, including architecture details, development patterns, and contributing guidelines
