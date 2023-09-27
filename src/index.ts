/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

const toString = Object.prototype.toString;
type ExtractPlus<T, U, K> = any extends T ? K : T extends U ? T : K;
type ObjectCheck<T> = T extends Record<any, unknown> ? T : Record<any, unknown>;
type Maybe<T> = T | null | undefined;

export function isPresent<T>(value: T): value is Exclude<T, undefined | null> {
  return value !== undefined && value !== null;
}

export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

export function isDefined<T>(value: T): value is Exclude<T, undefined> {
  return typeof value !== 'undefined';
}

// http://jsperf.com/isobject4
export function isObject<T extends Maybe<{}>>(value: T): value is ObjectCheck<T> {
  return value !== null && typeof value === 'object';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

// eslint-disable-next-line id-blacklist
type NumberPlus = Number & {
  isNaN(num: number): boolean;
};

export const isNaN: (num: number) => boolean = isFunction((Number as unknown as NumberPlus).isNaN)
  ? (Number as unknown as NumberPlus).isNaN
  : (num: number) => num !== num;

export function isDate(value: unknown): value is Date {
  return toString.call(value) === '[object Date]';
}

export function isArray<T>(value: T | unknown[]): value is ExtractPlus<T, any[] | readonly any[], unknown[]> {
  return Array.isArray(value);
}

export function isError(value: unknown): value is Error {
  const tag = toString.call(value);
  switch (tag) {
    case '[object Error]':
      return true;
    case '[object Exception]':
      return true;
    case '[object DOMException]':
      return true;
    default:
      return value instanceof Error;
  }
}

export function isErrorEvent(value: unknown): value is ErrorEvent {
  return toString.call(value) === '[object ErrorEvent]';
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isRegExp(value: unknown): value is RegExp {
  return toString.call(value) === '[object RegExp]';
}

export function isText(value: unknown): value is string {
  return typeof value === 'string' && value !== '';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isWindow(value: unknown): value is Window {
  return isObject(value) && value.window === value;
}

export function isFile(value: unknown): value is File {
  return toString.call(value) === '[object File]';
}

export function isFormData(value: unknown): value is FormData {
  return toString.call(value) === '[object FormData]';
}

export function isBlob(value: unknown): value is Blob {
  return toString.call(value) === '[object Blob]';
}

export function isPromiseLike<T>(
  obj: T | PromiseLike<unknown>
): obj is ExtractPlus<T, PromiseLike<any>, PromiseLike<unknown>> {
  return isObject(obj) && isFunction(obj.then);
}

export function isArrayBuffer(obj: unknown): obj is ArrayBuffer {
  return toString.call(obj) === '[object ArrayBuffer]';
}

const TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/;
export function isTypedArray(
  value: unknown
): value is
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array {
  return isObject(value) && isNumber(value.length) && TYPED_ARRAY_REGEXP.test(toString.call(value));
}
