# Vitepress Extras

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

Useful extras for Vitepress.

## Usage

Install package:

```sh
# npm
npm install vitepress-extras

# yarn
yarn add vitepress-extras

# pnpm
pnpm install vitepress-extras

# bun
bun install vitepress-extras
```

Import:

```js
// ESM
import { generateSidebars } from "vitepress-extras";

// CommonJS
const { generateSidebars } = require("vitepress-extras");
```

### Functions

- `generateSidebars`: will generate the sidebars for your vitepress docs.

## Roadmap

- [x] Tests

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vitepress-extras?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/vitepress-extras
[npm-downloads-src]: https://img.shields.io/npm/dm/vitepress-extras?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/vitepress-extras
[codecov-src]: https://img.shields.io/codecov/c/gh/StevenJPx2/vitepress-extras/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/StevenJPx2/vitepress-extras
[bundle-src]: https://img.shields.io/bundlephobia/minzip/vitepress-extras?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=vitepress-extras
