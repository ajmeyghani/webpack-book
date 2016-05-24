# Loaders

- Loaders are at the heart of Webpack that do the heavy lifting
- They parse files, run some transformation and pass them to Webpack
- There are many loaders that are already available including TypeScript, LESS, SASS, and more
- Whenever you require a file, it has to go through a loader so that it can be loaded
- For example, if you want to `require` a css file, you have to pass it through two loaders, i.e. `css` and `style` loaders
- The simplest loader that we can install is the `raw` loader. We can use it to load a `html` file.

