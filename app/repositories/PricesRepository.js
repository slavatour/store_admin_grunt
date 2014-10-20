var pg = require('pg'),
    path = require('path'),
    moment = require('moment'),
    DbRepository = require('./dbRepository');


exports.PricesRepository = function(conString) {
    var self = {},
        dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchPrices = function(callbackFunction) {
        var command = "SELECT * FROM prices ORDER BY price_id;";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: options.result, status: 200});
        });
    };

    self.savePrices = function(req, callbackFunction) {
        var model = req.body,
            command = "INSERT INTO prices (" +
                "price_name, " +
                "price_description, " +
                "price_calculation_method, " +
                "price_include_tax, " +
                "price_calculation_percent" +
                ") VALUES( " +
                "'" + model.price_name + "' ," +
                "'" + model.price_description + "', " +
                "'" + model.price_calculation_method + "', " +
                "'"+ model.price_include_tax + "', " +
                + model.price_calculation_percent +
                ")";
        console.log(command);
        console.log(model);
        dbRepository.actionData(command, function (options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: {}, status: 200});
        });
    };

    return self;
};