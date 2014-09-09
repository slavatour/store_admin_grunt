var CategoriesRepository = require('../repositories/CategoriesRepository'),
    SubcategoriesRepository = require('../repositories/SubcategoriesRepository');

exports.CategoriesService = function (conString) {
    var self = {};

    self.fetchCategories = function(callbackFunction) {
        var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
        var subcategoriesRepository = new SubcategoriesRepository.SubcategoriesRepository(conString);
        categoriesRepository.fetchCategories(function(categories){
            subcategoriesRepository.fetchSubcategories('all', function(subcategories){
                for(var i=0, length = categories.length; i<length; i++) {
                    categories[i].subcategories = [];
                    for(var j=0, lengthSub = subcategories.length; j<lengthSub; j++) {
                        if(subcategories[j].subcategory_parent_id == categories[i].category_id) {
                            categories[i].subcategories.push(subcategories[j]);
                        }
                    }
                }
                callbackFunction(categories);
            });
        });
    }

    return self;
};