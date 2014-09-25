var CategoriesRepository = require('../repositories/CategoriesRepository');

exports.CategoriesService = function (conString) {
    var self = {};

    self.fetchCategories = function(callbackFunction) {
        var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
        categoriesRepository.fetchCategories(function(options){
            var categories = options.result;
            for(var i=0, length = categories.length; i<length; i++) {
                categories[i].subcategories = [];
                for(var j=0, lengthSub = categories.length; j<lengthSub; j++) {
                    if(categories[j].category_parent_id == categories[i].category_id) {
                        //MYDOTO !!!!! finish function
                        categories[i].subcategories.push(categories[j]);
                    }
                }
            }
            callbackFunction(categories);
        });
    }

    return self;
};