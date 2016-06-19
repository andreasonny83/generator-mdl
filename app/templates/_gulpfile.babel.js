/**
  Material Design Lite Starter Kit
  Copyright (c) 2016 by andreasonny83. All Rights Reserved.

  This code may only be used under the MIT style license.

  MIT license: https://andreasonny.mit-license.org/@2016/
*/
import gulp from 'gulp';
import path from 'path';
import {config} from './gulp/gulp.config';
import del from 'del';
import eslint from 'gulp-eslint';
import $if from 'gulp-if';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import size from 'gulp-size';
import wiredep from 'wiredep';
import htmlmin from 'gulp-htmlmin';
import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import stylelint from 'stylelint';
import postcssBanner from 'postcss-banner';
import autoprefixer from 'autoprefixer';
import useref from 'gulp-useref';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
// import rev from 'gulp-rev';
// import collect from 'gulp-rev-collector';
import bump from 'gulp-bump';
import browserSync from 'browser-sync';
import * as gutil from 'gulp-util';
import pkg from './package.json';

let version = pkg.version;
let myGlobal = {};
myGlobal.fileName = null;

const reload = cb => {
  browserSync.reload();

  cb();
};

const now = () => {
  let now = new Date();

  return [[now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate()
  ].join('-'),
  [now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  ].join(':')].join(' ');
};

const banner = () =>
  ['Material Design Lite Starter Kit',
    'v.' + version + ' - ' + now(),
    '\nCopyright (c) 2016 by andreasonny83. All Rights Reserved.',
    'This code may only be used under the MIT style license.',
    '\nMIT license: https://andreasonny.mit-license.org/@2016/'
  ].join('\n');

/**
 * webpack plugins
 *
 * @type {Array}
 */
const webpackPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.BannerPlugin(banner())
];

// Clean temp and dist folders
const clean = () => {
  gutil.log('Cleaning workspace directory');

  return del([
    config.dist,
    config.temp
  ]);
};

// Lint JavaScript
const lint = () =>
  gulp.src(path.join(config.src, config.scripts))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe($if(!browserSync.active, eslint.failOnError()));

// Optimize images
const images = () =>
  gulp.src(path.join(config.src, config.images, '**/*'))
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(path.join(config.dist, config.images)))
    .pipe(size({title: 'images'}));

// Copy all files at the root level (app)
const copy = () =>
  gulp.src([
    path.join(config.src, '*.*'),
    path.join('!', config.src, '*.html'),
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest(config.dist))
    .pipe(size({title: 'copy'}));

const renderIndex = () =>
  gulp.src(path.join(config.temp, 'index.html'))
    .pipe(useref())
    .pipe($if('*.html', htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(config.dist));

// Inject Bower packages
const bowerify = () =>
  gulp.src(path.join(config.src, 'index.html'))
    .pipe(wiredep.stream())
    .pipe(gulp.dest(config.temp));

// postcss
const processors = [
  stylelint(),
  atImport(),
  autoprefixer({browsers: config.autoprefixer}),
  cssnano(),
  postcssBanner({banner: banner(), inline: true})
];

/**
 * Set a new path version in the package.json
 */
const versionify = () =>
  gulp.src('./package.json')
    .pipe(bump({type: 'patch'}))
    .pipe(gulp.dest('./'));

// Styles
const styles = () =>
  gulp.src(path.join(config.src, config.styles, '*.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', console.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.temp, config.styles)))
    .pipe(browserSync.stream({match: '**/*.css'}));

const stylesBuild = () =>
  gulp.src(path.join(config.src, config.styles, '*.css'))
    .pipe(postcss(processors))
    .on('error', console.log)
    // .pipe(rename({
    //   suffix: ".min"
    // }))
    // .pipe(rev())
    // .pipe(gulp.dest(path.join(config.temp, config.styles)))
    // .pipe(rev.manifest())
    .pipe(gulp.dest(path.join(config.temp, config.styles)));

// Scripts
const scripts = () =>
  gulp.src(path.join(config.src, config.scripts, 'main.js'))
    .pipe(webpackStream({
      output: {
        filename: 'main.js'
      },
      plugins: webpackPlugins,
      devtool: 'source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }))
    .pipe(gulp.dest(path.join(config.temp, config.scripts)));

const scriptsBuild = () =>
  gulp.src(path.join(config.src, config.scripts, 'main.js'))
    .pipe(webpackStream({
      output: {
        filename: 'main.js'
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.BannerPlugin(banner())
      ],
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }))
    // .pipe(rev())
    // .pipe(gulp.dest(path.join(config.temp, config.scripts)))
    // .pipe(rev.manifest())
    .pipe(gulp.dest(path.join(config.temp, config.scripts)));

// const revs = () =>
//   gulp.src([
//     path.join(config.temp, config.scripts, '**/main.min.js'),
//     path.join(config.temp, config.styles, '**/main.min.css')
//   ], {base: config.temp})
//   .pipe(rev())
//   .pipe(gulp.dest(path.join(config.dist)))
//   .pipe(rev.manifest())
//   .pipe(gulp.dest(path.join(config.dist)));

// const collects = () =>
//   gulp.src([
//     path.join(config.temp, '/**/*.json'),
//     path.join(config.temp, 'index.html')
//   ]).pipe(collect())
//   .pipe(gulp.dest(config.temp));

const startServer = cb => {
  browserSync.init({
    logPrefix: 'mdl-starter-kit',
    server: {
      baseDir: [
        config.temp,
        config.src
      ],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    notify: false,
    port: 3000
  });

  return cb();
};

const startServerDist = cb => {
  browserSync.init({
    logPrefix: 'mdl-starter-kit',
    server: {
      baseDir: config.dist
    },
    notify: false,
    port: 3000
  });

  return cb();
};

const watch = cb => {
  gulp.watch([
    path.join(config.src, '*.*'),
    path.join('!', config.src, '*.html')
  ],
  gulp.series(copy, reload));

  gulp.watch([
    path.join(config.src, 'index.html')
  ],
  gulp.series(bowerify, reload));

  gulp.watch(
    path.join(config.src, config.styles, '**/*.css'),
    styles);

  gulp.watch(
    path.join(config.src, config.scripts, '**/*.js'),
    gulp.series(lint, scripts, reload));

  return cb();
};

const serve = gulp.series(
    clean,
    bowerify,
    gulp.parallel(copy, styles, scripts, images),
    gulp.parallel(startServer, watch)
  );

const build = gulp.series(
    clean,
    bowerify,
    gulp.parallel(copy, stylesBuild, scriptsBuild, images),
    renderIndex
  );

const serveDist = gulp.series(
    build,
    gulp.parallel(startServerDist)
  );

export {
  versionify,
  serve,
  serveDist,
  build
};

export default serve;
