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
    },

    concat: {
      options: {
        separator: '\n',
        banner: '/*! <%= pkg.name %>: <%= pkg.description %> \n *\n * <%= pkg.author %> \n *\n * <%= pkg.homepage %>\n*/\n// This plugin uses finderSelect, which is included below, followed by the partsSelector core code.\n\n',
      },
      dist: {
        src: ['node_modules/finderselect/jquery.finderSelect.js', 'src/parts-selector.js'],
        dest: 'parts-selector.js',
      },
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default',['watch']);

};
