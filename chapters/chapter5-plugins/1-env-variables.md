## Defining Environment Variables

Using the `webpack.DefinePlugin` you can easily define environment-specefic values:

```javascript
var plugins = [
  new webpack.DefinePlugin({ IS_PROD: process.env.NODE_ENV === 'production' }),
  new webpack.DefinePlugin({ IS_TEST: process.env.NODE_ENV === 'test' }),
  new webpack.DefinePlugin({ IS_DEV: process.env.NODE_ENV === undefined }),
];
```
**TODO**

