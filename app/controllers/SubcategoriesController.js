var SubcategoriesRepository = require ("../repositories/SubcategoriesRepository");

exports.SubcategoriesController = function (conString) {
	var subcategoriesRepository = new SubcategoriesRepository.SubcategoriesRepository(conString);
	return subcategoriesRepository;
};