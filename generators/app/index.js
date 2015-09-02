//'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var util = require('util');
var Promise = require('promise');
var Logo = require('./logo').Logo;
var exec = require('child_process').exec;
var gitConfig = require('git-config'),
curGitUser = gitConfig.sync().user,
curUserName = curGitUser.name,
curUserEmail = curGitUser.email;


var appGenerator = module.exports = function appGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../../package.json')));

  this.on('error', function () {
  })

  this.on('end', function () {
    var cb = this.async();  //  return a function callback
    var that = this;

    var cb = this.async();
    var that = this;

    var loadCallback = function (loadName, error, resolve, reject) {
      if (error !== null ) {
        console.error('Load' + loadName + 'error:' + error);
        reject(error);//  the reson
      } else {
        console.log('Load' + loadName + 'success');
        resolve();
      }
    };

    var loadBasePromise = new Promise(function (resolve, reject) {

      exec('cd src/widgets; bower install; cd ../../../../../', function (error, stdout, stderr) {
        if (error != null ) {
          console.log(error);
        };
        loadCallback('种子文件安装', error, resolve, reject);
      }.bind(that));

    });
    Promise.all([true, loadBasePromise])
    .then(function () {
      this.prompt([
      {
        name: 'npm_install',
        message: 'Install node_modules for grunt now?',
        default: 'N/y',
        warning: ''
      },
      {
        name: 'bower_install',
        message: 'Install bower_components now?',
        default: 'N/y',
        warning: ''
      }
      ], function (props, err) {
        if (err) {
          return this.emit('error', err);
        }

        this.npm_install = (/^y/i).test(props.npm_install);
        this.bower_install = (/^y/i).test(props.bower_install);
        if (this.npm_install) {
          this.npmInstall('', {}, function (err) {
            if (err) {
              return console.log(blue('\n' + 'please run "sudo npm install" \n'));
            }
            console.log(green('\n\n node modules was installed successful. \n\n'));
          });
        } else {
          console.log(yellow('\n\n please run "npm install --slient" before `grunt` \n'));
          console.log(purple('\n done! \n'));
        };
        if (this.bower_install) {
          this.bowerInstall('', {}, function (err) {
            if (err) {
              return console.log(blue('\n' + 'please run "bower install" \n'))
            }
            console.log(green('\n\n bower_components was installed successful. \n\n'));
          });
        } else {
          console.log(yellow('\n\n please run "bower install\n'));
          console.log(purple('\n done! \n'));
        };
      }.bind(that));

}.bind(that));
}.bind(this));

};

util.inherits(appGenerator, yeoman.generators.Base);
appGenerator.prototype.askFor = function askFor() {
  var cb = this.async();


  console.log(Logo(this));

  var folderName = path.basename(process.cwd());
  
  function parseCamelName (name) {
    return name.replace(/\b(\w)|(-\w)/g, function (m) {
      return m.toUpperCase().replace('-', '');
    });
  }
  var prompts = [
  {
    name   : 'projectName',
    message: 'widget Name?(名称)',
    default: folderName,
    warning: ''
  },
  {
    name   : 'projectDesc',
    message: 'Description of this Widget?(描述)',
    default: folderName,
    warning: ''
  },
  {
    name   : 'author',
    message: 'Author Name(姓名):',
    default: curUserName,
    warning: ''
  },
  {
    name   : 'email',
    message: 'Author Email(邮箱):',
    default: curUserEmail,
    warning: ''
  },
  {
    name   : 'version',
    message: 'Version(版本):',
    default: '0.1.0',
    warning: ''
  }
  ];

  /*
   * projectName：驼峰名称,比如 ProjectName
   * packageName：原目录名称，比如 project-name
   **/
   this.prompt(prompts, function (props) {

    this.packageName = props.projectName;// project-name
    this.projectName = parseCamelName(props.projectName); //ProjectName
    this.packageDesc = props.projectDesc;
    this.author = props.author;
    this.email = props.email;
    this.version = props.version;

    cb();

  }.bind(this));
 };

 appGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/src');
  this.mkdir('app/src/mods');
  this.mkdir('app/src/widgets');
  this.mkdir('app/src/pages');
  this.mkdir('app/build');

  this.template('src/pages/home/index.html', 'app/src/pages/index.html');
  this.template('src/widgets/bower.json', 'app/src/widgets/bower.json');


};

appGenerator.prototype.packageJSON = function packageJSON () {
 this.template('_package.json', 'package.json');
};

appGenerator.prototype.bowerJSON = function bowerJSON () {
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
};
appGenerator.prototype.gruntfile = function gruntfile () {
  this.template('_Gruntfile.js', 'Gruntfile.js');
}
appGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

function consoleColor(str, num) {
    if (!num) {
        num = '32';
    }
    return "\033[" + num + "m" + str + "\033[0m";
}

function green(str) {
    return consoleColor(str, 32);
}

function yellow(str) {
    return consoleColor(str, 33);
}

function red(str) {
    return consoleColor(str, 31);
}

function blue(str) {
    return consoleColor(str, 34);
}

function purple(str) {
    return consoleColor(str, 35);
}
