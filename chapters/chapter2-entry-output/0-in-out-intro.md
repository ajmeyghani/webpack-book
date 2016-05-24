# Entry Points and Outputs

In this chapter we are going to look at entry points and outputs in detail. Below is a summary of what we are going to explore:

- `entry` accepts three types of values:
    - `string`: name of the module resolved by Webpack bundled into a single file.
    - `Array of Strings`: Array of modules resolved by Webpack bundled into a single file.
    - `object`: eg: `{bundleName1: 'module name', bundleName2: ['mod1', 'mod2']}`: Each entry point gets bundled into a separate file.

- `output`: Has several options, the important ones are:
    - `path`: absolute path to the output
    - `filename`: filename for the output module
    - `publicPath`: string used to define the output path for a server.
    - `library`: The type of library
    - ...

