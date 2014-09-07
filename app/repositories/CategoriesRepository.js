var pg = require('pg'),
    DbRepository = require('./dbRepository');

exports.CategoriesRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.DatabaseRepository(conString);
	self.fetchCategories = function (callbackFunction) {
		var command = "SELECT c.name, c.serial_number, s.parent_id, s.name, s.id, s.serial_number "+
                    "FROM categories c LEFT JOIN subcategories s ON c.id = s.parent_id;";
//        var command = "SELECT * FROM subcategories INNER JOIN categories ON categories.id = subcategories.parent_id;";
		dbRepository.actionData(command, function (result) {
            callbackFunction(result);
		});
	};

	return self;
};