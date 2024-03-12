import pathModule from "path";
import { esmCjsMaps } from "./esm-cjs-maps.js";
// @ts-ignore
import packageJson from "./package.json" assert { type: "json" };

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
