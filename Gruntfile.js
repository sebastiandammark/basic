module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9000,
					base: 'public'
				}
			}
		},
		sass: {
		dev: {
			options: {
				style: 'expanded'
			},
			files: {
				'tmp/css/concat/styles.css': 'app/sass/styles.scss'
			}
		},
		dist: {
			options: {
				style: 'compressed'
			},
			files: {
				'tmp/css/concat/styles.css': 'app/sass/styles.scss'
			}
		}
	},
  	concat: {
			js: {
        src: ['app/scripts/**js', 'app/vendor/**/*.js'],
        dest: 'public/js/app.js'
			},
			css: {
      	src: ['tmp/css/concat/styles.css', 'app/vendor/**/*.css'],
        dest: 'tmp/css/prefix/styles.css'
			}
		},
		autoprefixer: {
			css: {
				options: {
					browsers: ['last 2 version', 'ie 8', 'ie 7']
				},
				src: 'tmp/css/prefix/styles.css',
				dest: 'public/css/styles.css'
			}
		},
		copy: {
	  	main: {
	    	files: [
	      	{expand: true, flatten: true, src: ['app/vendor/**/fonts/*.*'], dest: 'public/fonts/'},
	      	{expand: true, flatten: true, src: ['app/vendor/**/*.{png,jpg,gif}'], dest: 'tmp/images/vendor/'},
					{expand: true, flatten: true, src: ['app/markup/*.html'], dest: 'public/'}
	    	]
	  	},
	  	dist: {
	    	files: [
					{expand: true, flatten: false, cwd: 'public/', src: ['**/*'], dest: 'dist/'}
	    	]
	  	}
		},
		imagemin: {
			vendor: {
				files: [{
					expand: true,
					cwd: 'tmp/images/vendor/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/images/vendor/'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: 'app/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/images/'
				}]
			}
  	},
		min: {
		    dist: {
		        src: ['public/js/app.js'],
		        dest: 'dist/js/app.js'
		    }
		},
		cssmin: {
		    dist: {
		        src: ['public/css/styles.css'],
		        dest: 'dist/css/styles.css'
		    }
		},
		clean: ['tmp'],
		watch: {
			main: {
	    	files: ['app/**/*.{html,js,scss}'],
	    	tasks: ['build']
	  	}
		}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('build', ['sass:dev', 'concat', 'autoprefixer', 'copy:main', 'imagemin', 'clean']);
  grunt.registerTask('dist', ['build', 'copy:dist', 'min', 'cssmin', 'clean']);
  grunt.registerTask('server', ['connect', 'build', 'watch']);

};