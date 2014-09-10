var CategoriesService = require ("../service/CategoriesService");
var CategoriesRepository = require ("../repositories/CategoriesRepository");

exports.CategoriesController = function (conString) {
	return {
        fetchCategories: new CategoriesService.CategoriesService(conString).fetchCategories,
        saveCategory: new CategoriesRepository.CategoriesRepository(conString).saveCategory
    }
};