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
                for (var i= 0, length = categories.length; i < length; i++) {
                    categories[i].subcategories = categories[i].subcategories || [];
                    var subcategory =_buildCategoriesTree(categories[i], subcategories);
                    categories[i]= subcategory;
                }
//                console.log(categories[0]);
//                callbackFunction({data: categories, status: 200});
            }
        });
    };
    return self;
};
////MYTODO don't catch subcategory id=5
//function _buildCategoriesTree (categories, subcategories) {
//    for (var i= 0, length = categories.length; i < length; i++) {
//        for (var j= 0, length = subcategories.length; j < length; j++) {
//            if(categories[i] && categories[i].subcategories && categories[i].subcategories.length) {
//                _buildCategoriesTree(categories[i].subcategories, subcategories);
//            } else if(categories[i] && categories[i].category_id == subcategories[j].category_parent_id) {
//                categories[i].subcategories = categories[i].subcategories || [];
//                categories[i].subcategories.push(subcategories[j]);
//                subcategories.splice(j,1);
//            }
//        }
//    }
//    return categories;
//}
function _recursive (collection) {
    var categories = [],
        subcategories = [];
    for (var i= 0, length = collection.length; i < length; i++) {
        collection[i]["category_parent_id"] == null ? categories.push(collection[i]) : subcategories.push(collection[i]);
    }
    for (var i= 0, length = categories.length; i < length; i++) {
        categories[i].subcategories = categories[i].subcategories || [];
        var subcategory =_buildCategoriesTree(categories[i], subcategories);
        categories[i].subcategories.push(subcategory);
    }
}

function _buildCategoriesTree (category, subcategories) {
    console.log(category);
    console.log("sub-------", subcategories);
    for(var i = 0; i < subcategories.length; i++) {
        if(category.category_id == subcategories[i].category_parent_id){
            console.log(category.category_id,"==", subcategories[i].category_parent_id);
            category.subcategories = category.subcategories || [];
//            var newSubcategories = subcategories;
//            newSubcategories.splice(i, 1);
            var subcategory =_buildCategoriesTree(subcategories.splice(i,1), subcategories);
            category.subcategories.push(subcategory);
        }
    }
    return category;
}
