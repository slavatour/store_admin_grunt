var CurrenciesRepository = require("../repositories/CurrenciesRepository");

exports.CurrenciesService = function(conString) {
    var self = {},
        currenciesRepository = new CurrenciesRepository.CurrenciesRepository(conString);
    return self;
};