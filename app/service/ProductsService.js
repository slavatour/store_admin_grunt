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
                callbackFunction({data: products, status: 200});
            });
        };
    return self;
};