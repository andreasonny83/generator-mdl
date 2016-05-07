import gulp from 'gulp';
import {config} from './gulp.config';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
// import cleanCSS from 'gulp-clean-css';

/**
 * @todo: file version, production vs dev version
 */

const styles = () => {
  return gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(cssnano({
      discardComments: {removeAll: true},
      autoprefixer: {browsers: config.autoprefixer, add: true},
      safe: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.dest));
};

module.exports = styles;
