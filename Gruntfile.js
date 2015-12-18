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
					'dest/style.min.css' : 'src/index.css'
				}
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: true
			},
			build: {
				src: ['src/index_es5.js'],
				dest: 'dest/bundle.min.js'
			}
		},
		babel: {
			options: {
				sourceMap: false,
				"presets": es2015
			},
			dist: {
				files: {
					"src/index_es5.js": "src/index.js"
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-babel');

	require('load-grunt-tasks')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['babel', 'uglify', 'cssmin']);
};