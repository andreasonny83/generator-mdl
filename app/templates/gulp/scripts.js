import gulp from 'gulp';
import {config, env} from './gulp.config';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';

/**
 * @todo: file version, js linting before running webpack
 */

const _concat = () => {
  return gulp.src(config.temp.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.dest));
};

const _webpack = () => {
  return gulp.src(config.scripts.src)
    .pipe(webpackStream({
      output: {
        filename: env.env === 'PROD' ? 'bundle.min.js' : 'bundle.js'
      },
      plugins: env.env === 'PROD' ? [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
      ] : [],
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
    .pipe(gulp.dest(config.temp.js));
};

const scripts = gulp.series(_webpack, _concat);

module.exports = scripts;
