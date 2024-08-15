# Typescript SDK for Swisstronik Network

## Overview

The purpose of this [`@swisstronik/sdk` NPM package](https://www.npmjs.com/package/@swisstronik/sdk) is to provide base functionality for interacting with cosmos-related parts of Swisstronik network (governance, staking, etc.).

## Developer Guide

### Installing in ESM projects

To install this NPM package in a project that needs ESM builds, use our `latest` release channel to install the stable version:

```bash
npm install @swisstronik/sdk@latest
```

### Installing in CommonJS projects

To install this NPM package in a project that needs CommonJS builds, use our `cjs` release channel to install the latest stable CommonJS version:

```bash
npm install @swisstronik/sdk@cjs
```


### Installing using yarn

For yarn projects, you may need to add the following resolution to the package.json

```json
"resolutions": {
    "protobufjs": "6.11.3"
}
```

After that, you can proceed to install the sdk:

```bash
yarn add @swisstronik/sdk
``` 

### Frontend considerations

`Buffer` is not available in a client side environment, so you'll need to polyfill

Example for react with `vite` and typescript:

In your `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {nodePolyfills} from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({
    globals: {
      Buffer: true,
    }
  }), 
],
});
```