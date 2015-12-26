module.exports = function(grunt) {

	var es2015 = require('babel-preset-es2015');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'client/index.min.css' : 'client/index.css'
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
					'client/index_es5.js'
				],
				dest: 'client/index_es5.min.js'
			}
		},
		babel: {
			options: {
				sourceMap: false,
				"presets": es2015
			},
			dist: {
				files: {
					"client/index_es5.js": "client/index.js"
				}
			}
		},
		concat: {
			js: {
				src: [
					'client/angular.min.js',
					'client/angular-route.min.js',
					'client/jquery-2.1.4.min.js',
					'client/semantic.min.js',
					'client/index_es5.min.js'
				],
				dest: 'public/bundle.min.js',
			},
			css: {
				options: {
					separator: ''
				},
				src: [
					'client/semantic.min.css',
					'client/index.min.css'
				],
				dest: 'public/bundle.min.css'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-concat');

	require('load-grunt-tasks')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['babel', 'uglify', 'cssmin', 'concat']);
};