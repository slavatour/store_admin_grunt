var ProductsService = require ("../service/ProductsService");
var ProductsRepository = require ("../repositories/ProductsRepository");

exports.ProductsController = function (conString) {
    return {
        fetchProducts: new ProductsService.ProductsService(conString).fetchProducts,
        fetchProduct: new ProductsRepository.ProductsRepository(conString).fetchProduct,
        putProductInfo: new ProductsRepository.ProductsRepository(conString).putProductInfo,
        getSpecifications: new ProductsRepository.ProductsRepository(conString).getSpecifications,
        saveProduct: new ProductsRepository.ProductsRepository(conString).saveProduct,
        patchProductSpecifications: new ProductsService.ProductsService(conString).patchProductSpecifications,
        fetchNewProductData: new ProductsService.ProductsService(conString).fetchNewProductData
    }
};