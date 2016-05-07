import path from 'path';

const src = path.join(__dirname, '../src');
const dist = path.join(__dirname, '../dist');

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
  dist: dist,
  autoprefixer: AUTOPREFIXER,
  styles: {
    src: path.join(src, 'sass/**/*.scss'),
    dest: path.join(dist, 'styles')
  },
  scripts: {
    src: path.join(src, 'scripts/entry.js'),
    webpack: path.join(__dirname, '../webpack.config.js'),
    dest: path.join(dist, 'scripts')
  }
};

var env = {
  env: 'DEV'
};

module.exports = {
  config: config,
  env: env
};
