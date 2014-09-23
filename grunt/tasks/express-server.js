module.exports = function(grunt) {
    // Project configuration.
    grunt.config("express", {
        dev: {
            options: {
                script: './server.js',
                node_env: 'development'
            }
        },
        prod: {
            options: {
                script: 'server.js',
                node_env: 'production'
            }
        },
        test: {
            options: {
                script: 'server.js',
                spawn: false
            }
        }
    });
    grunt.loadNpmTasks('grunt-express-server');
};