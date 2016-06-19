import version from './version';

(global => {
  global.MY_MDL = global.MY_MDL || {};
  var myMDL = global.MY_MDL;

  myMDL.name = 'mdl-starter-kit';
  myMDL.version = version;

  console.log(myMDL);
})(window);
