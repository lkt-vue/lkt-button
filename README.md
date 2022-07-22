# LKT Table
Vue component (Vue.js 3.0) allowing a simple yet powerful table component.

## Features

* Custom slots per column
* Hide columns by config
* Automatically hide empty columns
* Full support of [Sortable.js](https://github.com/RubaXa/Sortable) features:
    * Supports touch devices
    * Supports drag handles and selectable text
    * Smart auto-scrolling
    * No jQuery dependency
* Keeps in sync HTML and view model list

## Installation

### With npm

```bash
npm i -S lkt-table
```

## Typical use:
In your main.js
```js
  import LktTable from 'lkt-table';
  
  app.use(LktTable);
```

In your component:

```html
<LktTable v-model="myArray" v-bind:columns="columns"></LktTable>
```
```js
import {createColumn} from 'lkt-table';

export default {
    data() {
        return {
            columns: [
                createColumn('name', 'Name'),
                createColumn('surname', 'Surname').setIsSortable(false),
            ],
            items: [
                {name: 'a', surname: 'n'},
                {name: 'b', surname: 'n1'},
            ]
        }
    }
}
```


### With `custom column slots`:
```html
<LktTable v-model:value="myArray" v-bind:columns="columns">
    <template v-slot:name="{item}">{{item.name}}</template
</LktTable>
```

## Usage of `createColumn`:
```js
const column = createColumn(elementProperty, propertyTextInHeader)
    
    // Enables/disables column being sortable 
    // by clicking in header
    // Default: true
    .setIsSortable(status)
    
    // Make this column hidden, available by clicking a button
    // Default: false
    .setIsHidden(status)
    
    // Defines a text formatter for this column
    // Useful if you don't need and slot
    // Must be a function
    // Default: undefined
    .setFormatter(formatter)
    
    // Defines a check function to test if this column
    // is empty.
    // If all items has this column empty, this column
    // won't be rendered
    // Default: undefined
    .setEmptyChecker(checker)
    
    // Defines a function to check which colspan should take
    // this column
    // Default: undefined
    .setColSpan(checker)
```

## Props

### value
Type: `Array`<br>
Required: `true`<br>
Default: `[]`

Input data array to display.
```html
<LktTable v-model:value="myArray"></LktTable>
```

### columns
Type: `Array`<br>
Required: `true`<br>
Default: `[]`

Columns configuration (data to be shown, order, ...)
```html
<LktTable v-bind:columns="columns"></LktTable>
```

### sorter
Type: `Function`<br>
Required: `false`<br>
Default: `undefined`

Sorting function which will be triggered each time a th is clicked (if column is sortable)
```html
<LktTable v-bind:sorter="sorter"></LktTable>
```
```js
export default {
    methods: {
        sorter(datum1, datum2, column, sortDirection) {
            return 1;
        }
    },
    ...
}
```


### sortable
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Enables drag and drop
```html
<LktTable v-bind:sortable="true"></LktTable>
```

### hideEmptyColumns
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Enables automatic hide empty columns
```html
<LktTable v-bind:hide-empty-columns="true"></LktTable>
```

### draggableChecker
Type: `Function`<br>
Required: `false`<br>
Default: `(evt) => true`

A function to determine if an item can be dragged
```html
<LktTable v-bind:draggable-checker="fn"></LktTable>
```

### checkValidDrag
Type: `Function`<br>
Required: `false`<br>
Default: `(evt) => true`

A function to determine if an item can be dropped in a certain position
```html
<LktTable v-bind:check-valid-drag="fn"></LktTable>
```


### Events

* LktTable emits these events:

  - `input` (for value v-model)
  - `sort` (same as input, but after sorting)

HTML:
```HTML
<LktTable v-on:sort="doSomething"></LktTable>
```

### Slots

#### custom column slot
LktTable generates one slot per column, so you can always control how a column will be shown.

The `custom column slot` will be named with the column key.

Slot props:
- `value` the element value for that column
- `item` the element itself
- `column` the column config
- `i` the row index

```html
<LktTable v-model:value="myArray" v-bind:columns="columns">
    <template v-slot:name="{item, value}">
        <div>{{value}}, {{item.surname}}</div>
    </template
</LktTable>
```