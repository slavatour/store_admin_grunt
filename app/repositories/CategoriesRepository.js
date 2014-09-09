var pg = require('pg'),
    DbRepository = require('./dbRepository');

exports.CategoriesRepository = function (conString) {
	var self = {};
    var dbRepository = new DbRepository.DatabaseRepository(conString);
	self.fetchCategories = function (callbackFunction) {
        var command = "SELECT * FROM categories;";
		dbRepository.actionData(command, function (result) {
            callbackFunction(result);
		});
	};
    self.saveCategory = function (model, file) {
        var command = "SELECT max(category_position_in_list) FROM categories;";
        dbRepository.actionData(command, function (result) {
            if(!result[0]) {
                model.category_position_in_list = 1;
            } else {
                model.category_position_in_list = 1*result[0].max+1;
            }
            command = "SELECT max(category_id) FROM categories;";
            dbRepository.actionData(command, function(result){
                command = "INSERT INTO categories (category_name, category_position_in_list, category_description, " +
                    "category_start_date, category_image, category_image_name) VALUES ('"+ model.category_name +
                    "', "+ model.category_position_in_list +", '"+ model.category_description +"', "+
                    new Date(year, month, date) +", lo_import('"+ file.file.path +"'), 'category"+ (result[0].max+1) +".png');";
                dbRepository.actionData(command);
            });
        });
    };

	return self;
};