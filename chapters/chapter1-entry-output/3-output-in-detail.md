## Output in Detail

In the previous chapter we briefly touched on the `output` property. In this section we are going to look at this option in detail.

The `output` property defines how to output the bundles. Below is a full list of all the options:


- **`output.path`**: Absolute path containing all the output files<sup>*</sup>**required**

- **`output.filename`**: Filename of each bundle or chunk outputted by Webpack

- **`output.publicPath`**: specifies the public URL address of the output files when referenced in a browser

- **`output.pathinfo`**: Include comments with information about the modules. Should not be set to `true` for production

- **`output.library`**: If set, export the bundle as library where `output.library` is the name of the library

- **`output.libraryTarget`**: Which format to export the library such as `commonjs`, `umd`, or `amd`

- `output.chunkFilename`: The file for non-entry chuncks

- `output.sourceMapFilename`: The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.

- `output.devtoolModuleFilenameTemplate`: Filename template string of function for the `sources` array in a generated SourceMap.

- `output.devtoolFallbackModuleFilenameTemplate`: Similar to `output.devtoolModuleFilenameTemplate`, but used in the case of duplicate module identifiers.

- `output.devtoolLineToLine`: Enable line to line mapped mode for all/specified modules. By default it is disabled. Only use it if your performance needs to be better and you are sure that input lines match which generated lines. When set to `true`, it is enabled for all modules (not recommended)


- `output.hotUpdateChunkFilename`: The filename of the Hot Update Chunks outputted in the `output.path` directory

- `output.hotUpdateMainFilename`: The filename of the Hot Update Main File which is outputted in the `output.path` directory

- `output.jsonpFunction`: The JSONP function used by Webpack for asynchronous loading of chunks

- `output.hotUpdateFunction`: The JSONP function used by Webpack for asynchronous loading of hot update chunks


- `output.umdNamedDefine`: If `output.libraryTarget` is set to `umd` and `output.library` is set, setting this to `true` will name the AMD module.

- `output.sourcePrefix`: Prefixes every line of the source in the bundle with this string. The default value is `"\t"`

- `output.crossOriginLoading`: This option enables cross-origin loading of chunks

In this section we are going to focus on the most important ones and briefly talk about the other options.

### `output.path`

**TODO**

### `output.filename`

**TODO**

### `output.publicPath`

**TODO**

### `output.pathinfo`

**TODO**

### `output.library`

**TODO**

### `output.libraryTarget`

**TODO**


