var ProductsService = require ("../service/ProductsService");
var ProductsRepository = require ("../repositories/ProductsRepository");

exports.ProductsController = function (conString) {
    return {
        fetchProducts: new ProductsService.ProductsService(conString).fetchProducts,
        fetchProduct: new ProductsRepository.ProductsRepository(conString).fetchProduct,
        putProduct: new ProductsRepository.ProductsRepository(conString).putProduct,
        saveProduct: new ProductsRepository.ProductsRepository(conString).saveProduct,
        fetchNewProductData: new ProductsService.ProductsService(conString).fetchNewProductData
    }
};