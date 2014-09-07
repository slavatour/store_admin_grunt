module.exports = function(grunt) {
    // Project configuration.
    grunt.config("express", {
        options: {
            port: 3000    // Override defaults here
        },
        dev: {
            options: {
                script: 'app.js',
                port: 3000
//                delay: 0,
//                output: ".+"
            }
        },
        prod: {
            options: {
                script: 'app.js',
                node_env: 'production'
            }
        },
        test: {
            options: {
                script: 'app.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-express-server');
};