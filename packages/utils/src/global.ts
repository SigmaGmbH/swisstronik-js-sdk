type GlobalThis = typeof globalThis

function evaluateThis(fn: (code: string) => unknown): GlobalThis {
  return fn('return this') as GlobalThis
}

export const xglobal =
  /* eslint-disable no-restricted-globals */
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : evaluateThis(Function)
