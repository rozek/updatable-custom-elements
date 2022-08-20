(function () {
    var customElements_define = customElements.define;
    customElements.define = function define(Name, Constructor, Options) {
        if (customElements.get(Name) == null) { // not yet registered
            customElements_define.call(customElements, Name, Constructor, Options);
        }
        else { // already registered
            var Class = customElements.get(Name);
            removePropertiesFrom(Class, protectedFunctionProps);
            copyPropertiesFrom(Constructor, Class, protectedFunctionProps);
            // @ts-ignore "Class" exists
            removePropertiesFrom(Class.prototype, protectedProtoProps);
            // @ts-ignore "Class" exists
            copyPropertiesFrom(Constructor.prototype, Class.prototype, protectedProtoProps);
        }
    };
    /**** removePropertiesFrom ****/
    var protectedFunctionProps = Object.assign(Object.create(null), {
        length: true, name: true, prototype: true,
    });
    var protectedProtoProps = Object.assign(Object.create(null), {
        constructor: true,
    });
    function removePropertiesFrom(Candidate, protectedProps) {
        var staticProperties = Object.getOwnPropertyNames(Candidate);
        staticProperties.forEach(function (Name) {
            if (!(Name in protectedProps)) {
                delete Candidate[Name];
            }
        });
    }
    /**** copyPropertiesFrom ****/
    function copyPropertiesFrom(Constructor, Candidate, protectedProps) {
        var staticProperties = Object.getOwnPropertyNames(Constructor);
        staticProperties.forEach(function (Name) {
            if (!(Name in protectedProps)) {
                var Descriptor = Object.getOwnPropertyDescriptor(Constructor, Name);
                // @ts-ignore "Descriptor" exists
                Object.defineProperty(Candidate, Name, Descriptor);
            }
        });
    }
})();
//# sourceMappingURL=updatable-custom-elements.esm.js.map
