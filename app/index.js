'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  welcome: function() {
    this.log(yosay(
      'Welcome to the HotTowel AngularJS generator!'
    ));
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the brilliant ' + chalk.red('generator-mdl') + ' generator!'
    ));

    // var prompts = [{
    //   type: 'confirm',
    //   name: 'someAnswer',
    //   message: 'Would you like to enable this option?',
    //   default: true
    // }];

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      // Defaults to the project's folder name if the input is skipped
      default: this.appname
    }];

    // this.prompt(prompts, function(props) {
    this.prompt(prompts, function(answers) {
      // this.props = props;
      this.props = answers;
      this.log(answers.name);
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'), {
        name: this.props.name
      }
    );

    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );
  },

  install: function() {
    this.installDependencies();
  }
});
