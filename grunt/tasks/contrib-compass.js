module.exports = function(grunt) {
    // Project configuration.
    grunt.config("compass", {
        dev: {
            options: {
                sassDir: 'public/stylesheets/sass',
                cssDir: 'public/stylesheets/css'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
};