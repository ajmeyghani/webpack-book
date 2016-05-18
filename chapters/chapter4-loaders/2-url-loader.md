## Url Loader

In this section we are going to use Webpack to automatically load our assets, including images and font files.

Using the following loader definition, you can automatically embed or load the assets in your app whenever they are required or referenced:

```javascript
loaders: [
  {
    test: /\.(png|jpg|jpeg)$|\.(woff|woff2|ttf|eot|svg)(.*)?$/,
    loader: "url?limit=10000&name=[name][hash:6].[ext]", // spit out a file if larger than 10kb
  }
]
```

With this definition we are checking for any file that has any of the following extensions:

`.png`, `.jpg`, `.jpeg`, `.woff`, `.woff2`, `.ttf`, `.eot`, `.svg`

Whenever Webpack comes across any of these files, it would pass them through the `url` loader and would embed them if the filesize is less than the given limit. For example if you set the limit value to 10000, Webpack will only embed the file if the filesize is less 10kb, otherwise it will spit out a file for the asset named using the name string. For example if you set the name to `name=[name][hash:6].[ext]`, you will get the filename followed by a short hash and then followed by the extension of the file.

Now if the size of the is larger than the limit, Webpack would use the `file-loader` to extract the content and spit out a file for the asset.

**TODO**

