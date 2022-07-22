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

In your component:

```html
<LktButton v-on:click="doSomething" v-bind:disabled="disabledChecker"></LktButton>
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
<LktButton type="submit"></LktButton>
```

### name
Type: `String`<br>
Required: `false`<br>
Default: `a random string is generated` <br>

An identifier emitted on click.
```html
<LktButton name="sendMessage"></LktButton>
```

### value
Type: `String`<br>
Required: `false`<br>
Default: `'`

Set a value for form buttons. Emitted on click.
```html
<LktButton v-bind:value="myButton"></LktButton>
```

### state
Type: `String`<br>
Required: `false`<br>
Default: `''`

Appends a `data-state` attribute. It's useful for state control and styling.
```html
<LktButton state="calculating"></LktButton>
```

### disabled
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Determines if button is disabled or not.
```html
<LktButton disabled"></LktButton>
<LktButton v-bind:disabled="disabledChecker""></LktButton>
```


### Events

* LktButton emits these events:

  - `click`

HTML:
```HTML
<LktButton v-on:click="doSomething"></LktButton>
```

### Slots

#### default slot
This slot allows you to fill the button with whatever you want.

```html
<LktButton name="testButton" v-on:click="doSomething">
  Click, me!
</LktButton>
```