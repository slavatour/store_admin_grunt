var pg = require('pg'),
    path = require('path'),
    DbRepository = require('./dbRepository');

exports.CategoriesRepository = function (conString) {
	var self = {};
    var dbRepository = new DbRepository.DatabaseRepository(conString);
	self.fetchCategories = function (callbackFunction) {
        var command = "SELECT * FROM categories ORDER BY category_position_in_list;";
		dbRepository.actionData(command, function (result) {
            for (var i = 0; i < result.length; i++) {
                if(result[i].category_image) {
                    var folder = path.resolve(__dirname, "../../", "public/images/temp/", "categoryImg" +
                        result[i].category_id + ".png");
                        command = "SELECT lo_export(categories.category_image, '"+folder+"') FROM categories WHERE category_id = "+
                        result[i].category_id+";";
                    dbRepository.actionData(command);
                    result[i].category_image_name = "categoryImg" + result[i].category_id + ".png";
                }
            }
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
                    "category_start_date, category_image) VALUES ('"+ model.category_name +
                    "', "+ model.category_position_in_list +", '"+ model.category_description +"', "+
                    getCurrentDate() +", lo_import('"+ file.file.path +"'));";
                dbRepository.actionData(command);
            });
        });
    };
    self.deleteCategory = function (id) {
        var command = "DELETE FROM categories WHERE id = "+ id +";";
        dbRepository.actionData(command);
    };
    function getCurrentDate() {
        var today = new Date(),
            currentDate = "'";
        currentDate += today.getFullYear();
        currentDate += "-" + today.getMonth();
        currentDate += "-" + today.getDay();
        currentDate += " " + today.getHours();
        currentDate += ":" + today.getMinutes();
        currentDate += ":" + today.getSeconds();
        currentDate += " " + today.getTimezoneOffset()/60;
        return currentDate + "'";
    }

	return self;
};