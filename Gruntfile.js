module.exports = function (grunt) {


    //add config options
    grunt.initConfig({

    });

    //load tasks
    grunt.loadTasks("grunt/tasks");

    //register tasks
    grunt.registerTask('compile', "Compile SASS files.", ['compass']);

    grunt.registerTask('server', "Run nodejs server.", ['express:dev']);

    grunt.registerTask('build',"Load bower components.", function(){
        grunt.task.run(['bower:install']);
    });
};