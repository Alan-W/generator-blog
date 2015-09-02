'use strict';
var path = require('path'),
fs = require('fs'),
exec = require('child_process').exec;

module.exports = function(grunt) {// 获得执行时间
    require('time-grunt')(grunt);
    //Project configuration.
    grunt.initConfig({
        // 读取项目配置信息
        pkg: grunt.file.readJSON('package.json'),
       jshint: {
        options: {
            smarttabs:true,
            browser:true,
            devel:true,
            sub:true,
            evil:true,
            globals: {
                jQuery: true
            }
        },
        all: ['**/*.js','!node_modules/**/*']
    },
        // 打包后压缩文件
        // 压缩文件和入口文件一一对应
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            base: {
                files: [{
                 expand: true,
                 src: ['**/*.js','!*-min.js'],
                 dest: '../build/<%=pkg.name %>/<%=pkg.version %>/',
                 cwd: '../build/<%=pkg.name %>/<%=pkg.version %>',
                 ext: '-min.js'

             }]
         }
     },
     copy: {
        main: {
            expand: true,
            cwd: '<%=pkg.version %>/',
            src: ['*.*','!*.js'],
            dest: '../build/<%=pkg.name %>/<%=pkg.version %>/',
            flatten: true,
            filter: 'isFile'
        }
    },


});

    // 使用到的任务，可以增加其他任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
   // grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-copy');
    return grunt.registerTask('default', ['uglify', 'copy']);
};