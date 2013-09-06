/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
			dev: {
        src: ['app/js/*.js'],
        dest: 'public/js/functions.min.js'
      },
			dist: {
        src: ['app/js/*.js'],
        dest: 'tmp/js/functions.min.js'
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'public/js/functions.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
		compass: {
	    dist: {
	      options: {
					httpPath: 'public',
	        sassDir: 'app/sass',
	        cssDir: 'public/css',
	        environment: 'production',
					outputStyle: 'compressed',
					relativeAssets: true,
					noLineComments: true,
					force: true
	      },
	    },
	    dev: {
	      options: {
					httpPath: 'public',
	        sassDir: 'app/sass',
	        cssDir: 'public/css',
					environment: 'development',
					outputStyle: 'expanded',
					relativeAssets: true,
					noLineComments: false
	      },
	    }
	  },
		clean: ["tmp"],
		watch: {
		  css: {
		    files: ['app/**/*.scss', 'app/**/*.js'],
		    tasks: ['compass:dev', 'concat:dev'],
		    options: {
		      livereload: true,
		    },
		  },
		},
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['watch', 'concat:dev', 'compass:dev', 'clean']);
  grunt.registerTask('build', ['concat:dist', 'uglify:dist', 'compass:dist', 'clean']);
};
