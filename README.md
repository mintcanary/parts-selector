# Parts Selector

A design pattern, and jQuery plugin for choosing items from a list.

## Demos

- [Simple example](http://p.smth.uk/parts-selector)
- [Real world example](http://p.smth.uk/goodtables/sources)

## Use

Include `jQuery`, `parts-selector.css` and `parts-selector.js`.

Markup:

```html
<div class="parts-selector" id="#my-parts-selector">
  <div class="parts list">
    <h3 class="list-heading">Available items</h3>
    <ul>
      <li>
        Nut
      </li>
      <li>
        Bolt
      </li>
    </ul>
  </div>
  <div class="controls">
    <a class="moveto selected"><span class="icon"></span><span class="text">Add</span></a>
    <a class="moveto parts"><span class="icon"></span><span class="text">Remove</span></a>
  </div>
  <div class="selected list">
    <h3 class="list-heading">Chosen items</h3>
    <ul>
    </ul>
  </div>
</div>
```

Initialise:

```javascript
$( "#my-parts-selector" ).partsSelector();
```

### Options

- `added`: Message displayed when an item is moved to "selected" list. (Default: `Item added`)
- `removed`: Message displayed when an item is moved to "parts" list. (Default: `Item removed`)
- `noneSelected`: Message displayed when controls are clicked, but nothing is selected. (Default: `Click on items below to select them`)
- `itemButtons`: Boolean, to enable inline buttons. (Default: `false`)
- `callback`: Function called after an item is moved. (See below)

#### Example

```javascript
$( "#my-parts-selector" ).partsSelector({
  itemButtons: true,
  callback: function() {
    // do something
  }
});
```

## Dev
There are a few [dependencies](package.json), so do `npm install`.

`grunt` will watch for changes to your [SCSS and JS files](src).
