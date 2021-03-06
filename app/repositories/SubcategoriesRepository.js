var pg = require('pg');
var DbRepository = require('./dbRepository');

exports.SubcategoriesRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.DatabaseRepository(conString);

	self.fetchSubcategories = function (id, callbackFunction) {
		if(id === 'all') {
			var command = "SELECT * FROM subcategories ORDER BY subcategory_position_in_list;";
		} else {
			var command = "SELECT * FROM subcategories WHERE subcategory_parent_id = "+id+" " +
                "ORDER BY subcategories_position_in_list;";
		}
		dbRepository.actionData(command, callbackFunction)
	};
    self.saveSubcategory = function(model, file) {
        var command = "SELECT max(subcategory_position_in_list) FROM subcategories;";
        dbRepository.actionData(command, function (options) {
            if(!options.result[0]) {
                model.subcategory_position_in_list = 1;
            } else {
                model.subcategory_position_in_list = 1*options.result[0].max+1;
            }
            command = "INSERT INTO subcategories (subcategory_name, subcategory_position_in_list, subcategory_description, " +
                "subcategory_start_date, subcategory_image, subcategory_parent_id) VALUES ('"+ model.subcategory_name +
                "', "+ model.subcategory_position_in_list +", '"+ model.subcategory_description +"', "+
                getCurrentDate() +", lo_import('"+ file.file.path +"'), " + model.parent_id + ");";
            dbRepository.actionData(command);
        });
    };
	self.deleteSubcategory = function (id) {
		var command = "DELETE FROM subcategories WHERE id='"+id+"';";
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