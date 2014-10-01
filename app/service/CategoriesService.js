var CategoriesRepository = require('../repositories/CategoriesRepository');

exports.CategoriesService = function (conString) {
    var self = {};

    self.fetchCategories = function(callbackFunction) {
        var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
        categoriesRepository.fetchCategories(function(options){
            var result = options.result,
                categories = [],
                subcategories = [];
            for (var i= 0, length = result.length; i < length; i++) {
                result[i]["category_parent_id"] == null ? categories.push(result[i]) : subcategories.push(result[i]);
            }
            for(var i=0, length = categories.length; i<length; i++) {
                categories[i].subcategories = [];
//                for(var j=0, lengthSub = subcategories.length; j<lengthSub; j++) {
//                    if(subcategories[j].category_parent_id == categories[i].category_id) {
//                        categories[i].subcategories.push(subcategories[j]);
//                    }
//                }
            }
            console.log(_recursive(categories, subcategories));
        });
    };
    function _recursive (categories, subcategories) {
        for(var i = 0, length = categories.length; i < length; i++) {
            for(var lengthSub = subcategories.length, j = length; j > 0; j--) {
                if(categories[i].subcategories && categories[i].subcategories.length) {
                    categories[i].subcategories.push( _recursive(categories[i].subcategories, subcategories));
                } else if(subcategories[j].category_parent_id == categories[i].category_id) {
                    categories[i].subcategories = categories[i].subcategories || [];
                    categories[i].subcategories.push(subcategories[j]);
                }
            }
        }
        return categories;
    }

//    function _recursive (collection) {
//        var categories = [],
//            subcategories = [];
//        for (var i= 0, length = collection.length; i < length; i++) {
//            collection[i]["category_parent_id"] == null ? categories.push(collection[i]) : subcategories.push(collection[i]);
//        }
//
//    }

    return self;
};