var ProductsService = require ("../service/ProductsService");
var ProductsRepository = require ("../repositories/ProductsRepository");

exports.ProductsController = function (conString) {
    return {
        fetchProducts: new ProductsService.ProductsService(conString).fetchProducts,
        saveProduct: new ProductsRepository.ProductsRepository(conString).saveProduct,
        fetchNewProductData: new ProductsService.ProductsService(conString).fetchNewProductData
    }
};