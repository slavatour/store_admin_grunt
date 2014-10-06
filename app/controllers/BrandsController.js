var BrandsRepository = require("../repositories/BrandsRepository");

exports.BrandsController = function(conString) {
    return {
        fetchBrands: new BrandsRepository.BrandsRepository(conString).fetchBrands
    }
}