var CategoriesService = require ("../service/CategoriesService");

exports.CategoriesController = function (conString) {
	return new CategoriesService.CategoriesService(conString);
};