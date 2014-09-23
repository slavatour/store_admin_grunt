module.exports = function (grunt) {
    //MYTODO add task jshint!!!
    //MYTODO add task cssmin!!!
    //MYTODO add task uglify!!!
    //MYTODO add task for TESTs!!!

    //add config options
    grunt.initConfig();

    //load tasks
    grunt.loadTasks("grunt/tasks");

    //register tasks
    grunt.registerTask('compile', "Compile SASS files.", ['compass']);

    grunt.registerTask('server', "Run nodejs server.", function(){
        grunt.task.run(['express:prod', 'open:dev', 'watch']);
    });

    grunt.registerTask('build',"Load bower components.", function(){
        grunt.task.run(['bower:install', 'compile', 'server', 'open:dev', 'watch']);
    });

};