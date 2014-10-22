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

    self.fetchPricesRules = function(callbackFunction) {
        var command = "SELECT " +
            "rules.*, " +
            "base.price_id AS price_rules_base_id, " +
            "base.price_name AS price_rules_base_name, " +
            "base.price_include_tax AS price_rules_base_tax, " +
            "def.price_id AS price_rules_default_id, " +
            "def.price_name AS price_rules_default_name, " +
            "def.price_include_tax AS price_rules_default_tax, " +
            "def.price_calculation_percent AS price_rules_default_value " +
            "FROM pricesRules rules " +
            "LEFT JOIN prices base ON " +
            "(base.price_id = rules.price_rules_base_id) " +
            "LEFT JOIN prices def ON " +
            "(def.price_id = rules.price_rules_default_id);";
        dbRepository.actionData(command, function (options) {
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: options.result, status:200});
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
        dbRepository.actionData(command, function (options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: {}, status: 200});
        });
    };

    self.putPrices = function(req, callbackFunction) {
        var model = req.body,
            id = req.params.id,
            command = "UPDATE prices SET " +
                "price_name = '" + model.price_name + "', " +
                "price_description = '" + model.price_description + "', " +
                "price_calculation_method = '" + model.price_calculation_method + "', " +
                "price_include_tax = '" + model.price_include_tax + "', " +
                "price_calculation_percent = " + model.price_calculation_percent + " " +
                "WHERE price_id = " + id + ";";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result:{}, status:200});
        });
    };
    self.putPricesRules = function(req, callbackFunction) {
        var model = req.body,
            command = "UPDATE pricesRules SET " +
                "price_rules_integer = '" + model.price_rules_integer + "', " +
                "price_rules_round_to = " + model.price_rules_round_to + ";";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result:{}, status:200});
        });
    };

    self.deletePrices = function(req, callbackFunction) {
        var id = req.params.id,
            command = "DELETE FROM prices WHERE price_id = " + id + ";";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result:{}, status:200});
        });
    };

    return self;
};