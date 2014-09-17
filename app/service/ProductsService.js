var CategoriesRepository = require('../repositories/CategoriesRepository'),
    SubcategoriesRepository = require('../repositories/SubcategoriesRepository'),
    ProductsRepository = require('../repositories/ProductsRepository');

exports.ProductsService = function (conString) {
    var self = {};

    self.fetchProducts = function(callbackFunction) {
        var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
        var subcategoriesRepository = new SubcategoriesRepository.SubcategoriesRepository(conString);
        var productsRepository = new ProductsRepository.ProductsRepository(conString);
        categoriesRepository.fetchCategories(function(options){
            var categories = options.result;
            subcategoriesRepository.fetchSubcategories('all', function(options){
                var subcategories = options.result;
                productsRepository.fetchProducts(function(options){
                    var products = options.result;
                    for(var i=0, length = subcategories.length; i<length; i++) {
                        subcategories[i].products = [];
                        for(var j=0, lengthProd = products.length; j<lengthProd; j++) {
                            if(products[j].product_parent_id == subcategories[i].subcategory_id) {
                                subcategories[i].products.push(products[j]);
                            }
                        }
                    }
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
        });
    }

    return self;
};