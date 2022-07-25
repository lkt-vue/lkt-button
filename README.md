# LKT Button
A simple button component for Vue.js 3.0.

## Installation

### With npm

```bash
npm i -S lkt-button
```

## Typical use:
In your main.js
```js
  import LktButton from 'lkt-button';
  
  app.use(LktButton);
```

App use options:

* `defaultState` string (default: undefined) => Set a default state for all buttons

In your component:

```html
<lkt-button v-on:click="doSomething" v-bind:disabled="disabledChecker"></lkt-button>
```
```js
export default {
    methods: {
      doSomething() {
          console.log('May the force be with you');
      },
      disabledChecker() {
          return false;
      },
      
    }
}
```

## Props

### type
Type: `String`<br>
Required: `false`<br>
Default: `button` <br>
Options: `button`, `submit`, `reset`

Determines which kind of button will be.
```html
<lkt-button type="submit"></lkt-button>
```

### name
Type: `String`<br>
Required: `false`<br>
Default: `a random string is generated` <br>

An identifier emitted on click.
```html
<lkt-button name="sendMessage"></lkt-button>
```

### value
Type: `String`<br>
Required: `false`<br>
Default: `'`

Set a value for form buttons. Emitted on click.
```html
<lkt-button v-bind:value="myButton"></lkt-button>
```

### state
Type: `String`<br>
Required: `false`<br>
Default: `''`

Appends a `data-state` attribute. It's useful for state control and styling.
```html
<lkt-button state="calculating"></lkt-button>
```

### disabled
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines if button is disabled or not.
```html
<lkt-button disabled></lkt-button>
<lkt-button v-bind:disabled="disabledChecker"></lkt-button>
```


### Events

* LktButton emits these events:

  - `click`

HTML:
```HTML
<lkt-button v-on:click="doSomething"></lkt-button>
```

### Slots

#### default slot
This slot allows you to fill the button with whatever you want.

```html
<lkt-button name="testButton" v-on:click="doSomething">
  Click, me!
</lkt-button>
```
