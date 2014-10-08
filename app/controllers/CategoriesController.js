var CategoriesService = require ("../service/CategoriesService");
var CategoriesRepository = require ("../repositories/CategoriesRepository");

exports.CategoriesController = function (conString) {
	var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
    return {
        fetchCategories: new CategoriesService.CategoriesService(conString).fetchCategories,
        saveCategory: categoriesRepository.saveCategory,
        deleteCategory: categoriesRepository.deleteCategory,
        putCategory: categoriesRepository.putCategory
    }
};