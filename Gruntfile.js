'use strict';

module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js',
        'client/**/*.js',
        'server/**/*.js',
        '!public/**/*.js'
      ]
    },

    stylus: {
      compile: {
        options: {
          paths: ['client/**/*']
        },
        files: {
          'public/css/application.css': 'client/styles/application.styl'
        }
      }
    },

    jade: {
      compile: {
        options: {
          client: false,
          pretty: false
        },
        files: [ {
          cwd: 'client/',
          src: '*.jade',
          dest: 'public',
          expand: true,
          ext: '.html'
        } ]
      }
    },

    exec: {
      npmTest: 'npm test'
    },

    watch: {
      styles: {
        files: ['client/**/*.styl'],
        tasks: ['stylus']
      },
      html: {
        files: ['client/**/*.jade'],
        tasks: ['jade']
      },
      scripts: {
        files: [
          '*.js',
          'server/**/*.js',
          '!public/**/*.js',
          'client/**/*.js'
        ],
        tasks: ['jshint:all', 'exec:npmTest']
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['stylus', 'jade']);
};
