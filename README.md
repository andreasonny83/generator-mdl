[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]

# generator-mdl

> Material-Design-Lite Yeoman Generator

![generator-mdl logo][logo]

## Installation

First, install [Yeoman](http://yeoman.io), [Gulp](http://gulpjs.com), [Bower](http://bower.io) and [Generator-Mdl](https://github.com/andreasonny83/generator-mdl) using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```sh
npm install -g yo gulp-cli bower generator-mdl
```

Make a new directory, and cd into it:

```sh
mkdir my-new-mdl-project && cd $_
```

Then generate your new project:

```sh
yo mdl
```

## Gulp tasks

`serve` :     Render a debug version of your project in your browser and
              start watching over file changes.

`build` :       Build a distribution version of the website in a
                `dist` folder.

`versionify` :  Update your `package.json` version number.

`serveDist` :   Build a distribution version of the website in a `dist` and
                render it a browser.

## Getting To Know Yeoman

*   Yeoman has a heart of gold

*   Yeoman is a person with feelings and opinions,
    but is very easy to work with

*   Yeoman can be too opinionated at times but is easily convinced not
    to be

*   Feel free to [learn more about Yeoman](http://yeoman.io/)

## Contributing

See the [contributing docs](https://github.com/andreasonny83/generator-mdl/blob/master/CONTRIBUTING.md)

## License

MIT © [Andrea Sonny](https://github.com/andreasonny83)

[npm-image]: https://badge.fury.io/js/generator-mdl.svg
[npm-url]: https://npmjs.org/package/generator-mdl
[travis-image]: https://travis-ci.org/andreasonny83/generator-mdl.svg?branch=master
[travis-url]: https://travis-ci.org/andreasonny83/generator-mdl
[daviddm-image]: https://david-dm.org/andreasonny83/generator-mdl.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/andreasonny83/generator-mdl
[coveralls-image]: https://coveralls.io/repos/andreasonny83/generator-mdl/badge.svg
[coveralls-url]: https://coveralls.io/r/andreasonny83/generator-mdl
[logo]: http://i.imgur.com/k31v2Ui.jpg
