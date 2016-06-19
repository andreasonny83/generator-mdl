import path from 'path';

const src = path.join(__dirname, '../app');
const dist = path.join(__dirname, '../dist');
const temp = path.join(__dirname, '../.tmp');

const AUTOPREFIXER = [
  'last 2 versions',
  'safari >= 7',
  'ie >= 9',
  'ff >= 30',
  'ios 6',
  'android 4'
];

const config = {
  src: src,
  temp: temp,
  dist: dist,
  images: 'images',
  scripts: 'scripts',
  styles: 'styles',
  autoprefixer: AUTOPREFIXER
  // temp: {
  //   base: temp,
  //   libs: path.join(temp, 'libs'),
  //   sass: path.join(temp, 'styles'),
  //   js: path.join(temp, 'scripts'),
  //   styles: [
  //     path.join(temp, 'libs', '*.css'),
  //     path.join(temp, 'styles', '*.css')
  //   ],
  //   scripts: [
  //     path.join(temp, 'libs', '*.js'),
  //     path.join(temp, 'scripts', '*.js')
  //   ]
  // },
  // bowers: path.join(src, 'bower_components'),
  // files: [
  //   path.join(src, '*.html')
  // ]
  // styles: {
  //   src: path.join(src, 'sass/**/*.scss'),
  //   dist: path.join(dist, 'styles')
  // }
  // scripts: {
  //   src: path.join(src, 'scripts/entry.js'),
  //   webpack: path.join(__dirname, '../webpack.config.js'),
  //   dist: path.join(dist, 'scripts')
  // },
};

var env = {
  env: 'DEV'
};

module.exports = {
  config: config,
  env: env
};
