# alder

tiny scoped css parser

[Site](https://ethanjustice.github.io/alder/) | [Repository](https://github.com/EthanJustice/alder)

+ [Docs](#docs)

## Docs

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
