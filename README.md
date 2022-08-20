# updatable-custom-elements #

partial "hot module replacement" for "Custom Elements"

"Hot Module Replacement" (or "Hot Module Reloading") is a well-established mechanism for the development of web applications - it works fine, but only as long as you don't try to replace the definitions of "[custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)".

`updatable-custom-elements` _partially implements_ "Hot Module Reloading" for "custom elements" with the idea to facilitate development and debugging, but not for module replacement at runtime.






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
