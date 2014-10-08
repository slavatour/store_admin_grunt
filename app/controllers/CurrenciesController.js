var CurrenciesRepository = require("../repositories/CurrenciesRepository");

exports.CurrenciesController = function(conString) {
    var currenciesRepository = new CurrenciesRepository.CurrenciesRepository(conString);
    return {
        fetchCurrencies: currenciesRepository.fetchCurrencies,
        fetchCurrenciesHistory: currenciesRepository.fetchCurrenciesHistory
    }
}