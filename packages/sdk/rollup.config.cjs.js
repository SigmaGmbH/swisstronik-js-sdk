import { nodeResolve } from "@rollup/plugin-node-resolve";
// import multi from "@rollup/plugin-multi-entry";
import commonjs from "@rollup/plugin-commonjs";
import multiInput from "rollup-plugin-multi-input";

const esmCjsCompatible = ["file-type", "uint8arrays", "multiformats"];

export default {
  input: esmCjsCompatible.map((m) => `../../node_modules/${m}/**/*.js`),
  plugins: [
    commonjs(),
    // multi({preserveModules: true}),
    multiInput.default({ relative: "../../node_modules" }),
    nodeResolve(),
  ],
  output: {
    dir: "build/cjs/deps",
    format: "cjs",
    // preserveModules: true,
    // entryFileNames: "[name].js",
  },
};