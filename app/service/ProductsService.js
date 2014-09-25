var CategoriesRepository = require('../repositories/CategoriesRepository'),
    ProductsRepository = require('../repositories/ProductsRepository');

exports.ProductsService = function (conString) {
    var self = {};

        self.fetchProducts = function(callbackFunction) {
            var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
            var productsRepository = new ProductsRepository.ProductsRepository(conString);
            productsRepository.fetchProducts(function(options){
                if(options.error) {
                    callbackFunction({data: options.error, status: 500});
                    return;
                }
                var products = options.result;
                categoriesRepository.fetchCategoriesTree(function(options){
                    if(options.error) {
                        callbackFunction({data: options.error, status: 500});
                        return;
                    }
                    var parentsPaths = options.result;
                    for(var i=0, length = products.length; i < length; i++) {
                        for(var j=0, lengthParent = parentsPaths.length; j < lengthParent; j++) {
                            if(products[i].product_parent_id == parentsPaths[j].category_id) {
                                products[i].product_parents = parentsPaths[j];
                            }
                        }
                    }
                    callbackFunction({data: products, status: 200});
                });
            });
        };
    return self;
};