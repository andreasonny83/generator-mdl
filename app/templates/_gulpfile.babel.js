import gulp from 'gulp';
import {config, env} from './gulp/gulp.config';
import {clean, bowerify} from './gulp/utils';
import {styles, stylesDev} from './gulp/styles';
import scripts from './gulp/scripts';
import copy from './gulp/copy';
import browserSync from 'browser-sync';
import * as gutil from 'gulp-util';

const reload = browserSync.reload;

const setProd = cb => {
  env.env = 'PROD';

  gutil.log(
      'Compiling APP in',
      gutil.colors.magenta(env.env),
      'mode'
    );

  return cb();
};

const watch = () => {
  gutil.log('Whatching for file changes...');

  gulp.watch(config.files).on('change', gulp.series(copy, reload));
  gulp.watch(config.styles.src).on('change', gulp.series(styles, reload));
  gulp.watch(config.scripts.src).on('change', gulp.series(scripts, reload));
};

const startServer = () => {
  return browserSync.init({
    server: {
      baseDir: config.dist
    }
  });
};

const compile = gulp.series(
    clean,
    bowerify,
    gulp.parallel(
      stylesDev,
      scripts
    ),
    copy
  );

const build = gulp.series(setProd, compile);
const serve = gulp.series(compile, gulp.parallel(startServer, watch));

export {
  clean,
  build,
  serve,
  watch
};

export default build;
