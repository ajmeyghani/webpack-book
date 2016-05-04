## Watching Files

If you want to watch the files and compile as you work you can tell Webpack to watch your files with the `-w` flag. That's all you need to do output files as you work:

```bash
bin/webpack -w
```

Now Webpack will auto compile after you make a change to any file that is loaded in Webpack. At this point the only file that is loaded by Webpack is the `main.js` file. So if you make any change in that file and hit save, Webpack will automatically build your bundle:

```
Hash: fc8b2b9b1cdb8b998df3
Version: webpack 1.12.9
Time: 6ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.65 kB       0  [emitted]  main
   [0] ./main.js 125 bytes {0} [built]
    + 1 hidden modules
```

