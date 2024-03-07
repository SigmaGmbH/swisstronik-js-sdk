import pathModule from "path";
import fs from "fs";
import { esmCjsMaps } from "./esm-cjs-maps.js";


if (fs.existsSync("package.json")) {
  const packageJson = fs.readFileSync("package.json", "utf-8");
  const packageJsonObj = JSON.parse(packageJson);

  if (packageJsonObj && packageJsonObj.type === "commonjs") {
    module.constructor.prototype.require = function (path: string) {
      var self = this;

      if (
        // fs.existsSync(pathModule.resolve(__dirname, "deps", modules[path])) &&
        typeof esmCjsMaps[path] === "string"
      ) {
        const dep = pathModule.resolve(__dirname, "deps", esmCjsMaps[path]);
        // console.log("Loading from deps:", path);
        // console.log("dep path:", dep);
        return self.constructor._load(dep, self);
      }
      return self.constructor._load(path, self);
    };
  }
}
