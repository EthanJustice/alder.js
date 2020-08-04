# alder

tiny scoped css parser

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

#### Not Parsed

+ Media queries
