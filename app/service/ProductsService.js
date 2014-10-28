var CategoriesRepository = require('../repositories/CategoriesRepository'),
    ProductsRepository = require('../repositories/ProductsRepository'),
    SpecificationsRepository = require('../repositories/SpecificationsRepository'),
    BrandsRepository = require('../repositories/BrandsRepository');

exports.ProductsService = function (conString) {
    var self = {},
        categoriesRepository = new CategoriesRepository.CategoriesRepository(conString),
        productsRepository = new ProductsRepository.ProductsRepository(conString),
        brandsRepository = new BrandsRepository.BrandsRepository(conString),
        specificationsRepository = new SpecificationsRepository.SpecificationsRepository(conString);

    self.fetchProducts = function(callbackFunction) {
        productsRepository.fetchProducts(function(options){
            if(options.error) {
                callbackFunction({data: options.error, status: 500});
                return;
            }
            var products = options.result;
            callbackFunction({data: products, status: 200});
        });
    };

    self.fetchNewProductData = function(callbackFunction) {
        var fetchResult = {};
        brandsRepository.fetchBrandsList(function(options){
            if(options.error) {
                callbackFunction({status:500, result: options.error});
                return;
            }
            fetchResult.brands = options.result;
            categoriesRepository.fetchCategoriesTree(function(options){
                if(options.error) {
                    callbackFunction({status:500, result: options.error});
                    return;
                }
                fetchResult.categories = options.result;
                specificationsRepository.fetchSpecificationsClasses(function(options){
                    if(options.error) {
                        callbackFunction({status:500, result: options.error});
                        return;
                    }
                    fetchResult.specifications = options.result;
                    callbackFunction({result: fetchResult, status: 200});
                });
            });
        });
    };

    return self;
};