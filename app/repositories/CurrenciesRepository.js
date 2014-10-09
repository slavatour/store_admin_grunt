var pg = require('pg'),
    path = require('path'),
    moment = require('moment'),
    DbRepository = require('./dbRepository');

exports.CurrenciesRepository = function(conString) {
    var self = {}
        dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchCurrencies = function(callbackFunction) {
        var command = "SELECT * FROM currencies ORDER BY currency_id";
        dbRepository.actionData(command, function(options){
            if(options.error) {
                callbackFunction({data: options.error, status:500});
                return;
            }
            callbackFunction({data: options.result, status:200});
        });
    };
    self.fetchCurrenciesHistory = function(callbackFunction) {
        var command = "SELECT ch.*, c.currency_iso_code, c.currency_iso_number_code FROM currenciesHistory ch " +
            "LEFT JOIN currencies c ON (c.currency_id = ch.currency_parent_id) ORDER BY currency_history_date_update;";
        dbRepository.actionData(command, function(options){
            if(options.error) {
                callbackFunction({data: options.error, status:500});
                return;
            }
            callbackFunction({data: options.result, status:200});
        });
    };
    self.saveCurrency = function(model, callbackFunction) {
        console.log(model.headers["accept-language"]);
        console.log(moment().locale("en_CA").format("L"));
    };

    return self;
}