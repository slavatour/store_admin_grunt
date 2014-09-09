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

	return self;
};