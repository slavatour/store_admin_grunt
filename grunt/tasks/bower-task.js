module.exports = function(grunt) {
    // Project configuration.
    grunt.config("bower", {
        pkg: grunt.file.readJSON('package.json'),
        install: {
            options: {
                targetDir: './public/javascripts/libs',
                layout: 'byType',
                install: true,
                verbose: false,
                cleanTargetDir: true,
                cleanBowerDir: true,
                bowerOptions: {}
            }
        }
    });
    grunt.loadNpmTasks('grunt-bower-task');
};