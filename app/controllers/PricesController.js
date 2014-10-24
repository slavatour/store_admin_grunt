var PricesRepository = require("../repositories/PricesRepository");

exports.PricesController = function(conString) {
    var pricesRepository = new PricesRepository.PricesRepository(conString);
    return {
        fetchPrices: pricesRepository.fetchPrices,
        savePrices: pricesRepository.savePrices,
        putPrices: pricesRepository.putPrices,
        patchPrices: pricesRepository.patchPrices,
        fetchPricesRules: pricesRepository.fetchPricesRules,
        putPricesRules: pricesRepository.putPricesRules,
        deletePrices: pricesRepository.deletePrices
    }
};