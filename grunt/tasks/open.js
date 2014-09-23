module.exports = function(grunt) {
    grunt.config("open", {
        dev: {
            path: 'http://localhost:3000',
            app: 'Chrome'
        }
    });
    grunt.loadNpmTasks('grunt-open');
};
