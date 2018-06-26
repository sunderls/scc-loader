# scc-loader

![badge](https://travis-ci.org/sunderls/scc-loader.svg?branch=master)

This is webpack loader for [scc(Styled Components in Css](https://github.com/sunderls/scc)


# how to use

just add it to your webpack loader like this:

```js

rules: [
    {
        test: /\.scc$/,
        use: ['babel-loader', 'scc-loader']
    }
}

```

Beacause scc-loader just transform your code into js in styled components, 
you still needs babel-loader to make it work
