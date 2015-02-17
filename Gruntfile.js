'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-6to5');

  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["./"],
          cleancss: true,
          modifyVars: {
            d: '"/"'
          }
        },
        files: {
          "./css/main.css": "./less/main.less"
        }
      }
    },
    uglify: {
      options: {
        compress: true,
        beautify: true,
        mangle: false
      },
      my_target: {
        files: {
          './js/plugins.min.js': [
          './js/lib/jquery/jquery.js',
          './js/lib/require/build/require.js',
          './js/lib/modernizr/modernizr.js'
          ]
        }
      }
    },
    '6to5': {
      options: {
        modules: 'common'
      },

      build: {
        files: [{
          expand: true,
          cwd: './js/src/',
          src: ['**/*.js'],
          dest: './js/dist/',
        }],
      }
    },
    watch: {
      less: {
        files: [
        './less/**',
        './fnt/*.less'
        ],
        tasks: ['less']
      },
      uglify: {
        files: [
        './js/lib/**',
        './js/init.js'
        ],
        tasks: ['uglify']
      },
      '6to5': {
        files: [
        './js/src/**'
        ],
        tasks: ['6to5']
      }
    }
  });

grunt.registerTask('default', ['6to5']);
};
