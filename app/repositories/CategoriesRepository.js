var pg = require('pg'),
    path = require('path'),
    DbRepository = require('./dbRepository');

exports.CategoriesRepository = function (conString) {
	var self = {};
    var dbRepository = new DbRepository.DatabaseRepository(conString);
	self.fetchCategories = function (callbackFunction) {
        var command = "SELECT * FROM categories ORDER BY category_position_in_list;";
		dbRepository.actionData(command, function (options) {
            for (var i = 0; i < options.result.length; i++) {
                if(options.result[i].category_image) {
                    var folder = path.resolve(__dirname, "../../", "public/images/temp/", "categoryImg" +
                        options.result[i].category_id + ".png");
                        command = "SELECT lo_export(categories.category_image, '"+folder+"') FROM categories WHERE category_id = "+
                            options.result[i].category_id+";";
                    dbRepository.actionData(command);
                    options.result[i].category_image_name = "categoryImg" + options.result[i].category_id + ".png";
                }
            }
            callbackFunction({result: options.result});
		});
	};
    self.saveCategory = function (model, file, callbackFunction) {
        var command = "SELECT max(category_position_in_list) FROM categories;";
        dbRepository.actionData(command, function (options) {
            if(options.error) {
                callbackFunction({error: options.error, status: 500});
            }
            if(!options.result[0]) {
                model.category_position_in_list = 1;
            } else {
                model.category_position_in_list = 1*options.result[0].max+1;
            }
            command = "INSERT INTO categories (category_name, category_position_in_list, category_description, " +
                "category_start_date, category_image) VALUES ('"+ model.category_name +
                "', "+ model.category_position_in_list +", '"+ model.category_description +"', "+
                getCurrentDate() +", lo_import('"+ file.file.path +"'));";
            dbRepository.actionData(command, function(options){
                if(options.error) {
                    callbackFunction({error: options.error, status: 500});
                } else {
                    callbackFunction({status: 200});
                }
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