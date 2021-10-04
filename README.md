![GitHub issues](https://img.shields.io/github/issues/CICCIOSGAMINO/color-scheme-button)
[![npm version](https://badgen.net/npm/v/@cicciosgamino/progress-ring)](https://www.npmjs.com/package/@cicciosgamino/color-scheme-button)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/cicciosgamino/color-scheme-button)

# 🌈 \<color-scheme-button\>

Simple button to handle the color-scheme auto / light / dark / dim . This custom elment it's a button with 4 SVG icons each for schema (auto, light, dark, dim). Dim schema it about orchestrating lightness and saturation, need to have enough saturation to still have a hue visible, but also just barely pass contrast scores. Check the very well done Adam Argyle intro about the shema / theme.

https://web.dev/building-a-color-scheme/
      
<p align="center">
  <a href="#examples">examples</a> •
  <a href="#usage">usage</a> •
  <a href="#api">api</a> •
  <a href="#accessibility">accessibility</a> •
  <a href="#todo">todo</a> •
</p>

# 🕹️ Examples

![Color Scheme Button](https://raw.githubusercontent.com/CICCIOSGAMINO/web.cicciosgamino.github.io/master/public/images/exampleSchemaButton.gif)

```html
<style>
  color-scheme-button {
      width: 128px;
      height: 128px;

      --icon-color: purple;
    }
</style>

<color-scheme-button
  id="btn"
  title="Color Scheme"
  aria-label="Color Scheme">
</color-scheme-button>
```


# 🚀 Usage

1. Install package
```bash
npm install --save @cicciosgamino/color-scheme-button
```

2. Import
```html
<!-- Import Js Module -->
<script type="module">
  // Importing this module registers <progress-ring> as an element that you
  // can use in this page.
  //
  // Note this import is a bare module specifier, so it must be converted
  // to a path using a server such as @web/dev-server.
  import '@cicciosgamino/color-scheme-button'
</script>
```

3. Place in your HTML
```html
<color-scheme-button
  id="btn"
  title="Color Scheme"
  aria-label="Color Scheme">
</color-scheme-button>
```

# 🐝 API

## 📒 Properties/Attributes

|    Name     |  Type   | Default  |  Description
| ----------- | ------- | -------- | --------------
|  title      | String  |   `''`   | Button title
|  ariaLabel  | String  |   `''`   | Button aria-label

## Methods
*None*

## Events
*None* events dispatched by default but you can uncomment the code to dispatch the *schema-event*. This event is dispateched with both, bubble and composed. In the *detail.schema* field you can retrieve the value of the schema.

|   Event Name |     Target     |    Detail    | Description
| ------------ | -------------- | ------------ | --------------
| schema-event |  color-schema-button  |  `{ schema: 'auto | light | dark | dim' }`  | Fired when button clicked

## 🧁 CSS Custom Properties

|       Name      | Default | Description
| --------------- | ------- | --------------------
| `--icon-color`  | `#000`  | SVG fill attribute

## 💪 Accessibility
Acessibility is guaranted with the use of a button with the *title* and *aria-label* set on it.SVG icons inside the inner button are set *role=img*,*aria-hidden="true"*,*focusable="false"* .

## 🔧 TODO
- [ ] Better Documentation
- [ ] More Examples

## 🧑‍💻 Author
| [![@cicciosgamino](https://raw.githubusercontent.com/CICCIOSGAMINO/cicciosgamino.github.io/master/images/justme%40412x412_round.png)](https://www.linkedin.com/in/marco-canali-859b6a52/) 	|
|:------------------------------------------------------------------------------------------:	|
|                                    **@cicciosgamino**                                      	|

## Support
Reach out to me at one of the following places:

- [Github](https://github.com/CICCIOSGAMINO)
- [Twitter](https://twitter.com/cicciosgamino)

## Donate
Donate help and contibutions!

## License
[GNU General Public License v3.0](https://github.com/CICCIOSGAMINO/init/blob/master/LICENSE)

Made 🧑‍💻 by [@cicciosgamino](https://cicciosgamino.web.app)
