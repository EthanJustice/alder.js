# alder.js

tiny scoped-css replacement

[Site](https://ethanjustice.github.io/alder.ts/) | [Repository](https://github.com/EthanJustice/alder.ts) | [NPM](https://www.npmjs.com/package/alder.js) | [bundlephobia](https://bundlephobia.com/result?p=alder.js@0.2.1).

+ [Docs](#docs)

## Roadmap

+ add docs using JSDoc
+ tests

## Docs

### Setup

Alder uses [ES6 Imports/Exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), so it can be imported using `import Alder from '{link}.js'`.

Alder is available using [JSDelivr](https://www.jsdelivr.com/package/npm/alder.js).

Alder is also available from [NPM](https://www.npmjs.com/) ([package](https://www.npmjs.com/package/alder.js)).

To use in an NPM project:

`npm i alder.js`

```json
"dependencies": {
    "alder.js": "~0.2.1"
    // ...
}
```

To use within your JavaScript/TypeScript file:

```javascript
const { Alder } = require("alder.js");
let alder = new Alder();
// ...
```

### Constructor

The constructor accepts a `Boolean` value that determines whether Alder is run automatically. It defaults to `true`. If an argument is not provided, all elements that match `* > style` are parsed.

```javascript
let alder = new Alder(); // will parse all style elements within '* > style' elements
```

### parse(element)

Accepts a single live node.  The node should be the parent of the `style` attribute you wish to scope.  If no arguments are provided, the `parse` method returns `false`.

```javascript
let alder = new Alder(false);
alder.parse(document.body.querySelector('style').parentElement) // will parse the style elements within the parent of the first style element
```

### Notes

When scoping pseudo-elements and pseudo-classes, if the parent element doesn't have a unique `id`, a `data-alder` attribute is added so that scoping can take place.

#### Not Parsed

+ Media queries
