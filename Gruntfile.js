module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  
  var config = {
    banner: '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
    jsfiles: [
      'js/custom/*.js',
      
      // 'bower_components/foundation/js/foundation/foundation.js',
      
      'bower_components/foundation/js/foundation/foundation.abide.js',
      'bower_components/foundation/js/foundation/foundation.accordion.js',
      'bower_components/foundation/js/foundation/foundation.alert.js',
      'bower_components/foundation/js/foundation/foundation.clearing.js',
      'bower_components/foundation/js/foundation/foundation.dropdown.js',
      'bower_components/foundation/js/foundation/foundation.equalizer.js',
      'bower_components/foundation/js/foundation/foundation.interchange.js',
      'bower_components/foundation/js/foundation/foundation.joyride.js',
      'bower_components/foundation/js/foundation/foundation.magellan.js',
      'bower_components/foundation/js/foundation/foundation.offcanvas.js',
      'bower_components/foundation/js/foundation/foundation.orbit.js',
      'bower_components/foundation/js/foundation/foundation.reveal.js',
      'bower_components/foundation/js/foundation/foundation.slider.js',
      'bower_components/foundation/js/foundation/foundation.tab.js',
      'bower_components/foundation/js/foundation/foundation.tooltip.js',
      'bower_components/foundation/js/foundation/foundation.topbar.js'
    ],
    releasefiles: [
      '**',
      '!.*',
      '!bower.json',
      '!Gruntfile.js',
      '!package.json',
      '!README.md',
      '!**/custom/**',
      '!bower_components/**',
      '!node_modules/**',
      '!release/**',
      '!sass/**',
    ]
  };
  
  grunt.initConfig({
  
    pkg: grunt.file.readJSON('package.json'),    
    config: config,
    
    copy: {
      fontawesome: {
        files: [{
          expand: true,
          cwd: 'bower_components/fontawesome/fonts',
          src: '**',
          dest: 'fonts/'
        },
        {
          expand: true,
          cwd: 'bower_components/fontawesome/scss',
          src: '**',
          dest: 'sass/fontawesome/'
        }]
      },
      foundation: {
        files: [{
          expand: true,
          cwd: 'bower_components/foundation/js/vendor',
          src: ['**', '!jquery.js'],
          dest: 'js/vendor'
        },
        {
          expand: true,
          cwd: 'bower_components/foundation/scss',
          src: '**',
          dest: 'sass'
        }]
      },
      release: {
        expand: true,
        src: '<%= config.releasefiles %>',
        dest: 'release/<%= pkg.name %>-<%= pkg.version %>/'
      }
    },
    
    clean: {
      release: ["release/<%= pkg.name %>-<%= pkg.version %>"]
    },
    
    compress: {
      release: {
        options: {
          archive: 'release/<%= pkg.name %>-<%= pkg.version %>.zip',
          mode: 'zip'
        },
        expand: true,
        cwd: 'release/<%= pkg.name %>-<%= pkg.version %>/',
        src: '**',
        dest: '<%= pkg.name %>-<%= pkg.version %>'
      }
    },
    
    'string-replace': {
      fontawesomevariables: {
        files: {'sass/fontawesome/_variables.scss': 'sass/fontawesome/_variables.scss'},
        options: {
          replacements: [{
            pattern: '../fonts',
            replacement: '../../fonts'
          }]
        }
      },
      foundationsettings: {
        files: {'sass/foundation/_settings.scss': 'sass/foundation/_settings.scss'},
        options: {
          replacements: [{
            pattern: '@import \'foundation/functions\';',
            replacement: '@import \'functions\';'
          }]
        }
      },
      foundationcustom: {
        files: {'sass/foundation/_custom-settings.scss': 'sass/foundation/_settings.scss'},
        options: {
          replacements: [{
            pattern: '@import \'functions\';',
            replacement: '// @import \'functions\';'
          }]
        }
      },
      stylescss: {
        files: {'sass/style.scss': 'sass/style.scss'},
        options: {
          replacements: [{
            pattern: '@import \"normalize\";',
            replacement: '@import \"normalize.scss\";'
          }]
        }
      }
    },
    
    file_append: {
      stylescss: {
        files: [{
          append: "\n@import \"fontawesome/font-awesome.scss\";" +
                  "\n@import \"foundation/settings\";" +
                  "\n@import \"foundation/custom-settings\";" +
                  "\n@import \"foundation.scss\";\n",
          input: 'sass/style.scss'
        }]
      }
    },
    
    sass: {
      dev: {
        options: {outputStyle: 'expanded'},
        files: {'css/<%= pkg.name %>.css': 'sass/style.scss'}
      },
      dist: {
        options: {outputStyle: 'compressed'},
        files: {'css/<%= pkg.name %>.min.css': 'sass/style.scss'}
      }
    },
    
    jshint: {
      files: [
        'Gruntfile.js',
        'js/*.js',
        '!js/<%= pkg.name %>.js',
        '!js/<%= pkg.name %>.min.js'
      ]
    },
    
    uglify: {
      dev: {
        options: {
          banner: '<%= config.banner %>',
          beautify: true,
          compress: false,
          mangle: false
        },
        files: {'js/<%= pkg.name %>.js': '<%= config.jsfiles %>'}
      },
      dist: {
        options: {
          banner: '<%= config.banner %>',
          report: 'gzip'
        },
        files: {'js/<%= pkg.name %>.min.js': '<%= config.jsfiles %>'}
      }
    },
    
    watch: {
      options: {livereload: true},
      sass: {
        files: 'sass/**/*.scss',
        tasks: 'sass:dev'
      },
      js: {
        files: [
          'Gruntfile.js',
          'js/**/*.js',
          '!js/<%= pkg.name %>.js',
          '!js/<%= pkg.name %>.min.js'
        ],
        tasks: ['jshint', 'uglify:dev']
      },
      image: {
        files: ['images/**/*.{gif,jpeg,jpg,png,svg,webp}'],
        tasks: 'imagemin'
      },
      php: {files: '**/*.php'}
    },
    
    imagemin: {
      dist: {
        options: {optimizationLevel: 7},
        files: [{
          expand: true,
          cwd: 'images',
          src: '*.{gif,jpeg,jpg,png}',
          dest: 'images'
        }]
      }
    }
  
  });
  
  grunt.registerTask('init', ['copy:fontawesome', 'copy:foundation', 'string-replace', 'file_append']);
  grunt.registerTask('build', ['newer:sass:dev', 'newer:uglify:dev', 'newer:imagemin']);
  grunt.registerTask('dist', ['newer:sass:dist', 'newer:uglify:dist', 'newer:imagemin']);
  grunt.registerTask('deploy', ['build', 'dist', 'clean', 'copy:release', 'compress']);
  grunt.registerTask('test', ['build', 'watch']);
  grunt.registerTask('default', ['test']);
  
};
