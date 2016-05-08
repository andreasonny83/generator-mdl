import gulp from 'gulp';
import {config} from './gulp.config';

const copy = () => {
  return gulp.src(config.files)
    .pipe(gulp.dest(config.dist));
};

module.exports = copy;
