module.exports = function(grunt) {

  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'fictive-cilyan.zip',
          mode: 'zip'
        },
        files: [
          {expand: true, cwd: "src/", src: ['**'], dest: 'fictive-cilyan/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['compress']);

};
