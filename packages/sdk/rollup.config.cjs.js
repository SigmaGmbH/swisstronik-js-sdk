import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import multiInput from "rollup-plugin-multi-input";

// List of ESM dependencies that are not compatible with CJS
const esmInCompatible = ["file-type", "uint8arrays", "multiformats"];

/*
  * Rollup configuration to build CJS compatible dependencies
*/
export default {
  input: esmInCompatible.map((m) => `../../node_modules/${m}/**/*.js`),
  plugins: [
    commonjs(),
    multiInput.default({ relative: "../../node_modules" }),
    nodeResolve(),
  ],
  output: {
    dir: "build/cjs/deps",
    format: "cjs",
  },
};