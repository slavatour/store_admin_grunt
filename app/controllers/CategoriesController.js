var CategoriesRepository = require ("../repositories/CategoriesRepository");

exports.CategoriesController = function (conString) {
	return new CategoriesRepository.CategoriesRepository(conString);
};