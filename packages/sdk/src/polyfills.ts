import pathModule from "path";
import fs from "fs";
import { esmCjsMaps } from "./esm-cjs-maps.js";


/* 
This is a polyfill for the "require" Commonjs function
This is needed because there are some dependencies that are not ESM compatible
and we need to use the Commonjs version of the package
*/
if (fs.existsSync("package.json")) {
  const packageJson = fs.readFileSync("package.json", "utf-8");
  const packageJsonObj = JSON.parse(packageJson);

  if (packageJsonObj && packageJsonObj.type === "commonjs") {
    module.constructor.prototype.require = function (path: string) {
      var self = this;

      if (
        typeof esmCjsMaps[path] === "string"
      ) {
        const dep = pathModule.resolve(__dirname, "deps", esmCjsMaps[path]);
        return self.constructor._load(dep, self);
      }
      return self.constructor._load(path, self);
    };
  }
}
