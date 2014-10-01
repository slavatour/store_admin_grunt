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
                categories = _buildCategoriesTree(categories, subcategories);
                callbackFunction({data: categories, status: 200});
            }
        });
    };
    return self;
};
 //MYTODO don't catch subcategory id=5
function _buildCategoriesTree (categories, subcategories) {
    console.log(subcategories);
    for (var i= 0, length = categories.length; i < length; i++) {
        for (var j= 0, length = subcategories.length; j < length; j++) {
            if(categories[i] && categories[i].subcategories && categories[i].subcategories.length) {
                _buildCategoriesTree(categories[i].subcategories, subcategories);
            } else if(categories[i] && categories[i].category_id == subcategories[j].category_parent_id) {
                categories[i].subcategories = categories[i].subcategories || [];
                categories[i].subcategories.push(subcategories[j]);
                subcategories.splice(j,1);
            }
        }
    }
    return categories;
}