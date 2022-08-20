# updatable-custom-elements #

partial "hot module replacement" for "Custom Elements"

"Hot Module Replacement" (or "Hot Module Reloading") is a well-established mechanism for the development of web applications - it works fine, but only as long as you don't try to replace the definitions of "[custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)".

`updatable-custom-elements` _partially implements_ "Hot Module Reloading" for "custom elements" with the idea to facilitate development and debugging, but not for module replacement at runtime.

**NPM users**: please consider the [Github README](https://github.com/rozek/updatable-custom-elements/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

> Just a small note: if you like this module and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), so that I know which of my repositories to take most care of.

## Technical Background ##

In order to understand the benefits and limitations of `updatable-custom-elements`, it is important to know how they work:

* when a given class is registered as a "custom element" for the first time, it is registered as usual
* but whenever a class is registered for an already existing "custom element", `updatable-custom-elements` simply replaces all class and instance properties and methods

Consequently, **the following details are left untouched**:

1. as the class itself is not changed, its **inheritance chain is kept**,
2. **the constructor remains unchanged** as well,
3. since the **custom element callbacks** seem to be cached internally, they **cannot be updated** either
4. and since the observable attributes seem to be cached as well, **changing the getter for `observedAttributes` has no effect**.

Restrictions 2 and 3 can easily be circumvented by providing redirections in the class implementation:

```javascript
class updatableElement extends HTMLElement {
  constructor () {
    super()
    this.initialize()
  }
  
  connectedCallback ()    { this.onConnect() }
  disconnectedCallback () { this.onDisconnect() }
  adoptedCallback ()      { this.onAdopt() }

  attributeChangedCallback (Name, oldValue, newValue) {
    this.onAttributeChange(Name, oldValue, newValue)
  }
  
  initialize ()   { ... }
  
  onConnect ()    { ... }
  onDisconnect () { ... }
  onAdopt ()      { ... }
  
  onAttributeChange (Name, oldValue, newValue) { ... }
}
```

Additionally, the typical caveats of "hot module replacement" apply here as well:

* since any existing instances of the affected "custom element" are left untouched, their state remains (in fact, this is often a fundamental reason for "hot module replacement")
* in particular, any already registered event handlers are still present and react on incoming events (you will have to handle this inconvenience yourself, however)

If you still want to update "custom elements" at runtime, just read on.

## Installation ##

`updatable-custom-elements` may be used as an ECMAScript module (ESM) or explicitly loaded by inserting a `<script>` element into the web document.

For the ESM variant, install the package into your build environment using [NPM](https://docs.npmjs.com/) with the command

```
npm install updatable-custom-elements
```

and `import` it into your code whereever needed

```javascript
import "updatable-custom-elements"
```

Otherwise, load the plain script file directly

```html
<script src="https://unpkg.com/updatable-custom-elements"></script>
```

## Usage ##

Once loaded or imported, `updatable-custom-elements` work silently in the background - just define (and use) your "custom elements" as usual:

```javascript
class A extends HTMLElement {
  ...
}
customElements.define('custom-element',A)

class B extends HTMLElement {
  ...
}
customElements.define('custom-element',B)
```

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/updatable-custom-elements/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
