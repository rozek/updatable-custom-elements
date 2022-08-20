# updatable-custom-elements #

partial "hot module replacement" for custom Elements

"Hot Module Replacement" (or "Hot Module Reloading") is a well-established mechanisms for web applications - it works fine, but only as long as you don't try to replace the definitions of "[custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)".

`updatable-custom-elements` partially implements "Hot Module Reloading" for "custom elements" with the goal to facilitate development and debugging, but not for module replacement at runtime.
