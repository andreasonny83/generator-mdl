import gulp from 'gulp';
import {config} from './gulp.config';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
// import cleanCSS from 'gulp-clean-css';

/**
 * @todo: file version, production vs dev version
 */

const _concat = () => {
  return gulp.src(config.temp.styles)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.css'))
    .pipe(cssnano({
      discardComments: {removeAll: true},
      autoprefixer: {browsers: config.autoprefixer, add: true},
      safe: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.dest));
};

const _concatDev = () => {
  return gulp.src(config.temp.styles)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.css'))
    .pipe(cssnano({
      autoprefixer: {browsers: config.autoprefixer, add: true},
      safe: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.dest));
};

const _sass = () => {
  return gulp.src([
    config.styles.src
  ]).pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: true
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.temp.sass));
};

const _sassDev = () => {
  return gulp.src([
    config.styles.src
  ]).pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compact',
      sourceComments: false
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.temp.sass));
};

const styles = gulp.series(_sass, _concat);
const stylesDev = gulp.series(_sassDev, _concatDev);

module.exports = {
  styles: styles,
  stylesDev: stylesDev
};
