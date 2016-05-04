# What is Webpack?

If you build a lot of large single page applications, then Webpack is going to be your best tool in your toolbox. Webpack is a powerful node module that you can use to create your app's dependencies among other things. At its core, Webpack works by creating a dependency graph for your app and creating static files that represent that graph. Although Webpack can be used on the server, it truly shines on the client-side, particularly when building single-page apps. This is due to the fact that single-page apps have become very complex and there is no easy way to define modules and handle dependencies.

## How Does it Look Like ?

You install Webpack with `npm` in your project, create a `config` file and use the `require` construct to load your app's dependencies. Webpack overloads the `require` construct to load dependencies that can be represented by:

- JavaScript or anything that compiles to JS
- CSS or anything that compiles to CSS like LESS or SASS
- HTML or JSON, etc
- Visual dependencies represented in svg, png, jpeg, etc
- Font dependencies like .eot, .otf, .ttf, etc

And the best part is that you can teach Webpack about a dependency type that it's not aware of which is another reason why it makes Webpack so powerful.

## Why Should You Care?

In order to know if you should care about Webpack, first you need to truly understand what Webpack is and what it's trying to solve. Webpack can be best described in terms of its goals:

- Splitting the dependency tree into chunks loaded on demand
- Keeping initial app load time low
- Making static assets to be used as modules
- Integrating with 3rd-party libraries as modules
- Being able to customize nearly every part of Webpack

Now what does all that mean:

- Splitting dependencies means loading the dependencies when you only need them resulting in smoother user experience
- Keeping initial app load time low means faster star up and higher user retention
- Making static assets to be used as modules means static assets like images won't be any different than JavaScript code and can enjoy Webpack's features like on-demand loading
- Integrating with 3rd-party libraries means that libraries can enjoy optimizations and other features that JavaScript modules enjoy
- Customizability means that you can mold Webpack into your specific needs, and you would be surprised what you can make it do

So if you are working on a large single-page app and care about providing a great user experience for your users, then Webpack is going to be your best friend. Otherwise, you may not see the benefits that Webpack has to offer and probably you won't event need it.

