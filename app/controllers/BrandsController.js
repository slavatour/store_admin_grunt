var BrandsRepository = require("../repositories/BrandsRepository");

exports.BrandsController = function(conString) {
    return {
        fetchBrands: new BrandsRepository.BrandsRepository(conString).fetchBrands,
        saveBrands: new BrandsRepository.BrandsRepository(conString).saveBrands,
        putBrands: new BrandsRepository.BrandsRepository(conString).putBrands
    }
};