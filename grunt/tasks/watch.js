module.exports = function(grunt) {
    // Project configuration.
    grunt.config("watch", {
        express: {
            files:  [ '**/*.js' ],
            tasks:  [ 'express' ],
            options: {
                nospawn: true // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
};