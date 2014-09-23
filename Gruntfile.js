module.exports = function (grunt) {
    //MYTODO finished task server!!!
    //MYTODO add task jshint!!!
    //MYTODO add task cssmin!!!
    //MYTODO add task uglify!!!
    //MYTODO add to BUILD task sass compile!!!
    //MYTODO add task for TESTs!!!

    //add config options
    grunt.initConfig({

    });

    //load tasks
    grunt.loadTasks("grunt/tasks");

    //register tasks
    grunt.registerTask('compile', "Compile SASS files.", ['compass']);

    grunt.registerTask('server', "Run nodejs server.", function(){
        grunt.task.run(['express']);
    });

    grunt.registerTask('build',"Load bower components.", function(){
        grunt.task.run(['bower:install']);
    });

//    grunt.registerTask('watch', "Run tasks that need watching.", function(){
//        grunt.task.run(['express']);
//    });
};