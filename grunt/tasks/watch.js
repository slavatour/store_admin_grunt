module.exports = function(grunt) {
    // Project configuration.
    grunt.config("watch", {
        sass: {
            files: [
                "public/stylesheets/sass/*.scss",
                "public/stylesheets/sass/imports/*.scss",
                "public/stylesheets/libs/scss/bootstrap-sass/*.scss"
            ],
            task: ["compass"]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
};