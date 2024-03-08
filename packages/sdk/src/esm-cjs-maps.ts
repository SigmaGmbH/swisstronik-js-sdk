
/*
`esmCjsMaps` is a map of ESM package names to their CJS equivalents. 
This is used to resolve ESM imports to CJS imports for CommonJS build.
*/
export const esmCjsMaps = {
  "file-type": "file-type",
  uint8arrays: "uint8arrays/dist/src",
  "uint8arrays/to-string": "uint8arrays/dist/src/to-string.js",
  multiformats: "multiformats/src",
  "multiformats/basics": "multiformats/src/basics.js",
} as Record<string, string>;