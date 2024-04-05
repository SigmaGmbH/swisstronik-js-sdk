import pathModule from "path";
// @ts-ignore
import packageJson from "./package.json" assert { type: "json" };


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

/* 
This is a polyfill for the "require" Commonjs function
This is needed because there are some dependencies that are not ESM compatible
and we need to use the Commonjs version of the package
*/

if (packageJson && packageJson.type === "commonjs") {
  module.constructor.prototype.require = function (path: string) {
    var self = this;

    if (typeof esmCjsMaps[path] === "string") {
      const dep = pathModule.resolve(__dirname, "deps", esmCjsMaps[path]);
      return self.constructor._load(dep, self);
    }
    return self.constructor._load(path, self);
  };
}
