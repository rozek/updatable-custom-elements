;(function () {
  const customElements_define = customElements.define
  customElements.define = function define (
    Name:string, Constructor:Function, Options?:any
  ):void {
    if (customElements.get(Name) == null) {                // not yet registered
      customElements_define.call(customElements, Name,Constructor,Options)
    } else {                                               // already registered
      let Class = customElements.get(Name)
      removePropertiesFrom(Class, protectedFunctionProps)
      copyPropertiesFrom(Constructor,Class, protectedFunctionProps)

      removePropertiesFrom(Class.prototype, protectedProtoProps)
      copyPropertiesFrom(Constructor.prototype,Class.prototype, protectedProtoProps)
    }
  }

/**** removePropertiesFrom ****/

  const protectedFunctionProps = Object.assign(Object.create(null),{
    length:true, name:true, prototype:true,
  })

  const protectedProtoProps = Object.assign(Object.create(null),{
    constructor:true,
  })

  function removePropertiesFrom (
    Candidate:any, protectedProps:any
  ):void {
    let staticProperties = Object.getOwnPropertyNames(Candidate)
    staticProperties.forEach((Name) => {
      if (! (Name in protectedProps)) {
        delete Candidate[Name]
      }
    })
  }

/**** copyPropertiesFrom ****/

  function copyPropertiesFrom (
    Constructor:Function, Candidate:any, protectedProps:any
  ):void {
    let staticProperties = Object.getOwnPropertyNames(Constructor)
    staticProperties.forEach((Name) => {
      if (! (Name in protectedProps)) {
        let Descriptor = Object.getOwnPropertyDescriptor(Constructor,Name)
        Object.defineProperty(Candidate, Name,Descriptor)
      }
    })
  }
})();