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
    self.saveCurrency = function(req, callbackFunction) {
//        console.log(moment().locale(locale[0]).format());
//        var locale = req.headers["accept-language"].split(",");
        var data = req.body;
        data.currency_last_update = new Date().toString();
        var command = "INSERT INTO currencies (currency_country, currency_iso_code, currency_iso_number_code," +
            "currency_numeric_code, currency_value, currency_last_update) VALUES ('" + data.currency_country +
            "', '" + data.currency_iso_code + "', '" + data.currency_iso_number_code + "', '" + data.currency_numeric_code +
            "', " + data.currency_value + ", '" + new Date().toString() + "');";
        dbRepository.actionData(command, function (options) {
            options.error ? callbackFunction({status:500, data: options.error}) : callbackFunction({status:200, data: {}});
        });
    };

    return self;
}