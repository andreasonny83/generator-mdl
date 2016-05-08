import gulp from 'gulp';
import {config} from './gulp.config';
import del from 'del';
import mainBowerFiles from 'main-bower-files';
import * as gutil from 'gulp-util';

const clean = () => {
  gutil.log('Cleaning workspace directory');

  return del([
    config.dist,
    config.temp.base
  ]);
};

const bowerify = () => {
  return gulp.src(mainBowerFiles())
   .pipe(gulp.dest(config.temp.libs));
};

module.exports = {
  bowerify: bowerify,
  clean: clean
};
