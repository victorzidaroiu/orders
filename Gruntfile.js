module.exports = function(grunt) {
	var es2015 = require('babel-preset-es2015');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'tmp/index.css': 'src/sass/index.sass',
            }
        }
    },
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'tmp/index.min.css': 'tmp/index.css',
				}
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: true
			},
			build: {
				src: [
					'tmp/index_es6.js'
				],
				dest: 'tmp/index_es6.min.js'
			}
		},
		babel: {
			options: {
				sourceMap: false,
				"presets": es2015
			},
			dist: {
				files: {
					"tmp/index_es6.js": "src/client/index.js"
				}
			}
		},
		concat: {
			js: {
				src: [
					'src/client/vendor/angular.min.js',
					'src/client/vendor/angular-route.min.js',
					'src/client/vendor/angular-cookies.min.js',
					'src/client/vendor/jquery-2.1.4.min.js',
					'src/client/vendor/semantic.min.js',
					'tmp/index_es6.min.js'
				],
				dest: 'public/bundle.min.js'
			},
			css: {
				options: {
					separator: ''
				},
				src: [
					'src/client/vendor/semantic.min.css',
					'tmp/index.min.css',
					'tmp/catalogue.min.css'
				],
				dest: 'public/bundle.min.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['sass', 'babel', 'uglify', 'cssmin', 'concat']);
};
