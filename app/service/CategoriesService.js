var CategoriesRepository = require('../repositories/CategoriesRepository');

exports.CategoriesService = function (conString) {
    var self = {};

    self.fetchCategories = function(callbackFunction) {
        var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
        categoriesRepository.fetchCategories(function(options){
            var categories = options.result;
            console.log(categories);
            for(var i=0, length = categories.length; i<length; i++) {
                categories[i].subcategories = [];
                for(var j=0, lengthSub = categories.length; j<lengthSub; j++) {
                    if(categories[j].category_parent_id == categories[i].category_id) {
                        categories[i].subcategories.push(categories[j]);
                    }
                }
            }
            callbackFunction(categories);
        });
    };
    function _recursive (collection) {
        var categories = [],
            subcategories = [];
        for (var i= 0, length = collection.length; i < length; i++) {
            collection[i]["category_parent_id"] == null ? categories.push(collection[i]) : subcategories.push(collection[i]);
        }

    }

    return self;
};