## Resolving Basics

Let's spend a little time and see how Webpack resolves modules. Let's say we have an entry point like so:

**main.js**

```javascript
var person = require('person');
```
let's compre that with the following:

```javascript
var person = require('./person');
```
In the first case Webpack will look at any modules folders

**TODO**
