module.exports = function(grunt) {

  var CSS_SRC = 'assets/sass';
  var CSS_DEST = 'www/css';
  var HTML_SRC = 'assets/jade';
  var HTML_DEST = 'www';
  var JS_SRC = 'assets/ts';
  var JS_DEST = 'www/js';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.JSON'),
    'recursive-compass': {
      dist: {
        src: [CSS_SRC + '/**/*.{scss,sass}'],
        options: {
          sassDir: CSS_SRC,
          cssDir: CSS_DEST,
          outputStyle: 'compressed'
        }
      }
    },
    jade: {
      compile: {
        files: [{
          expand: true,
          cwd: HTML_SRC,
          src: ['{,*/}*.jade'],
          dest: HTML_DEST,
          ext: '.html'
        }]
      }
    },
    typescript: {
      base: {
        src: [JS_SRC + '/**/*.ts'],
        dest: JS_DEST
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      html: {
        files: HTML_SRC + '/*.jade',
        tasks: ['jade']
      },
      js: {
        files: [JS_SRC + '/**/*.ts'],
        tasks: ['typescript']
      },
      css: {
        files: CSS_SRC + '/*.sass',
        tasks: ['recursive-compass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-recursive-compass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['recursive-compass', 'jade', 'typescript']);
};