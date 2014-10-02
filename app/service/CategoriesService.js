var CategoriesRepository = require('../repositories/CategoriesRepository');

exports.CategoriesService = function (conString) {
    var self = {};

    self.fetchCategories = function(callbackFunction) {
        var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
        categoriesRepository.fetchCategories(function(options){
            if(options.error) {
                callbackFunction({error: options.error, status: 500});
            } else {
                var categories = [],
                    subcategories = [];
                for (var i= 0, length = options.result.length; i < length; i++) {
                    options.result[i]["category_parent_id"] == null ? categories.push(options.result[i]) : subcategories.push(options.result[i]);
                }
                var subcategoriesTree = [];
                for (var i= 0, length = subcategories.length; i < length; i++) {
                    var subcategory =_buildCategoriesTree(subcategories[i], subcategories);
                    subcategories[i].subcategories = subcategory;
                    subcategoriesTree.push(subcategories[i]);
                }
                for (var i= 0, length = categories.length; i < length; i++) {
                    var subcategory =_buildCategoriesTree(categories[i], subcategoriesTree);
                    categories[i].subcategories = subcategory;
                }
                callbackFunction({data: categories, status: 200});
            }
        });
    };
    return self;
};

function _buildCategoriesTree (category, subcategories) {
    category.subcategories = category.subcategories || [];
    for (var i= 0, length = subcategories.length; i < length; i++) {
        if(category.category_id == subcategories[i].category_parent_id) {
            category.subcategories.push(subcategories[i]);
        }
    }
    return category.subcategories;
}
