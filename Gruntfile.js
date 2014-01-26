module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9000,
					base: 'public',
					hostname: '*'
				}
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					lineNumbers: true
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
		file_append: {
			default_options: {
				files: {
					'logging.txt': {
						append: '<%= grunt.template.today("yyyy-mm-dd HH:MM") %>\n',
						input: 'logging.txt'
					}
				}
			}
		},
		copy: {
		  	main: {
		    	files: [
		      		{expand: true, flatten: true, src: ['app/vendor/**/fonts/*.*'], dest: 'public/fonts/'},
		      		{expand: true, flatten: true, src: ['app/vendor/**/*.{png,jpg,gif}'], dest: 'tmp/images/vendor/'},
		      		{expand: true, flatten: true, src: ['app/images/**/*.svg'], dest: 'public/images/'},
					{expand: true, flatten: true, src: ['app/markup/*.html'], dest: 'public/'},
					{expand: true, flatten: true, src: ['app/fonts/*.*'], dest: 'public/fonts'}
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
		clean: ['tmp', 'public', 'dist'],
		'ftp-deploy': {
			stage: {
			    auth: {
			      	host: '192.168.2.100',
			      	port: 21,
			      	authKey: 'stage'
			    },
		    	src: 'dist',
		    	dest: 'Web/maptech',
		    	exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db'],
		    	server_sep: '/'
		  	},
		  	live: {
			    auth: {
			      	host: 'muliphein.dreamhost.com',
			      	port: 21,
			      	authKey: 'live'
			    },
		    	src: 'dist',
		    	dest: '/maptech',
		    	exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db'],
		    	server_sep: '/'
		  	}
		},
		cachebreaker: {
			js: {
				asset_url : '/js/app.js',
				files: {
					src : 'dist/*.html'
				},
			},
			css: {
				asset_url : '/css/styles.css',
				files: {
					src : 'dist/*.html'
				},
			}
		},
		watch: {
			main: {
	    	files: ['app/**/*.{html,js,scss}'],
	    	tasks: ['build']
	  	}
		}
  });

  // Load the plugins.
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
	grunt.loadNpmTasks('grunt-file-append');
	grunt.loadNpmTasks('grunt-cache-breaker');

  // Default task(s).
  grunt.registerTask('build', ['clean', 'sass:dev', 'concat', 'autoprefixer', 'copy:main', 'imagemin', 'file_append']);
  grunt.registerTask('dist', ['clean', 'build', 'copy:dist', 'cssmin', 'cachebreaker:js', 'cachebreaker:css', 'ftp-deploy:stage', 'clean']);
  grunt.registerTask('live', ['clean', 'build', 'copy:dist', 'cssmin', 'cachebreaker:js', 'cachebreaker:css', 'ftp-deploy:live', 'clean']);
  grunt.registerTask('server', ['connect', 'build', 'watch']);

};