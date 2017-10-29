module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.scss'],
          dest: '',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')
        ]
      },
      dist: {
        src: '*.css'
      }
    },

		watch: {
			css: {
				files: 'src/*.scss',
				tasks: ['sass', 'postcss:dist']
			}
		}
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default',['watch']);

};
