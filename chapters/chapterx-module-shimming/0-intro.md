# Shimming and Loading Modules

In this chapter we are going to explore how shimming and how Webpack can help you with modules that do not follow the standards. Dealing with shims is probably the most annoying thing to deal with when working with packages, especially front-end packages. If all the packages followed a UMD standard then we wouldn't have such a hard time loading them. For example, if you install Angular 1.2, you can't simply require it because the module is not defined as a UMD. But that's not the case with Angular 1.5, you can simply `require('angular')` and it would work as you expect. Hopefully this chapter can save you some headaches when working with modules.

**TODO**

