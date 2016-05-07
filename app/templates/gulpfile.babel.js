import gulp from 'gulp';
import del from 'del';
import {config, env} from './gulp/gulp.config';
import styles from './gulp/styles';
import scripts from './gulp/scripts';
import * as gutil from 'gulp-util';

const setProd = cb => {
  env.env = 'PROD';

  gutil.log(
      'Compiling APP in',
      gutil.colors.magenta(env.env),
      'mode'
    );

  return cb();
};

const clean = () => {
  gutil.log('Cleaning workspace directory');

  return del([
    config.dist
  ]);
};

const build = gulp.series(setProd, clean, gulp.parallel(styles, scripts));
const serve = gulp.series(clean, gulp.parallel(styles, scripts));

export {
  clean,
  styles,
  scripts,
  build,
  serve
};

export default build;
