var pg = require('pg'),
    path = require('path'),
    moment = require('moment'),
    DbRepository = require('./dbRepository');


exports.CurrenciesRepository = function(conString) {
    var self = {},
        dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchCurrencies = function(callbackFunction) {
        var command = "SELECT * FROM currencies ORDER BY currency_id";
        dbRepository.actionData(command, function(options){
            if(options.error) {
                callbackFunction({result: options.error, status:500});
                return;
            }
            callbackFunction({result: options.result, status:200});
        });
    };
    self.fetchCurrenciesHistory = function(dates, callbackFunction) {
        var from, to, selectById;
        if(dates.from != 'undefined' && dates.to != 'undefined') {
            from = dates.from;
            to = dates.to
        } else {
            from = moment().add(-1, 'month').startOf('day').format("X");
            to = moment().endOf('day').format("X");
        }
        if(dates.id == 'All') {
            selectById = "";
        } else {
            selectById = "currency_iso_code ='" + dates.id + "' AND ";
        }
        var command = "SELECT " +
            "ch.*, " +
            "c.currency_iso_code, " +
            "c.currency_iso_number_code, " +
            "c.currency_numeric_code " +
            "FROM currenciesHistory ch " +
            "LEFT JOIN currencies c ON " +
            "(c.currency_id = ch.currency_parent_id) " +
            "WHERE " + selectById +
            "currency_history_date_update > " + from +
            " AND currency_history_date_update < " + to +
            " ORDER BY currency_history_date_update DESC;";
        dbRepository.actionData(command, function(options){
            if(options.error) {
                callbackFunction({result: options.error, status:500});
                return;
            }
            callbackFunction({result: options.result, status:200});
        });
    };

    self.saveCurrency = function(req, callbackFunction) {
        var data = req.body,
            today = moment().format("X");
        var command = "BEGIN; " +
            "WITH rows AS (" +
            "INSERT INTO currencies (" +
            "currency_country, " +
            "currency_iso_code, " +
            "currency_iso_number_code," +
            "currency_numeric_code, " +
            "currency_value, " +
            "currency_last_update" +
            ") VALUES (" +
            "'" + data.currency_country + "', " +
            "'" + data.currency_iso_code + "', " +
            data.currency_iso_number_code +" , " +
            "'" + data.currency_numeric_code + "', " +
            data.currency_value + ", " +
            today +
            ") RETURNING id) " +
            "INSERT INTO currencieshistory (" +
            "currency_parent_id, " +
            "currency_history_date_update, " +
            "currency_history_value, " +
            "currency_history_difference" +
            ") VALUES ( " +
            "(SELECT id FROM rows), " +
            today + ", " +
            data.currency_value + ", " +
            "0" +
            "); COMMIT;";
        dbRepository.actionData(command, function (options) {
            options.error ? callbackFunction({status:500, result: options.error}) : callbackFunction({status:200, result: {}});
        });
    };
    self.deleteCurrency = function(params, callbackFunction) {
        var command = "DELETE FROM currencies WHERE id=" + params.id + ";";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({status:500, result: options.error}) : callbackFunction({status:200, result: {}});
        });
    };
    self.putCurrency = function(id, req, callbackFunction) {
        var data = req.body,
            isValueNew,
            today = moment().format("X"),
            command = "SELECT * FROM currencieshistory WHERE currency_parent_id = '" + id +
            "' AND id = (SELECT max(id) FROM currencieshistory WHERE currency_parent_id = '" + id + "');";
        dbRepository.actionData(command, function(options){
            if(options.error) {
                callbackFunction({result: options.error, status: 500});
                return;
            }
            options.result.length ? isValueNew = !(1*options.result[0].currency_history_value === 1*data.currency_value) : isValueNew = true;
            command = "BEGIN;";
            if(isValueNew) {
                command += "INSERT INTO currencieshistory (" +
                    "currency_parent_id, " +
                    "currency_history_date_update," +
                    "currency_history_value, " +
                    "currency_history_difference" +
                    ") VALUES ( " +
                    data.currency_id +", " +
                    "'" + today + "'," +
                    data.currency_value + ", " +
                    (data.currency_value - options.result[0].currency_history_value) +
                    ");";
            }
            command += "UPDATE currencies SET " +
                "currency_country = '" + data.currency_country + "'," +
                "currency_iso_code = '" + data.currency_iso_code + "'," +
                "currency_iso_number_code = " + data.currency_iso_number_code +"," +
                "currency_numeric_code = '" + data.currency_numeric_code + "'," +
                "currency_value = " + data.currency_value +"," +
                "currency_last_update = '" + today + "' " +
                "WHERE currency_id = " + id + ";";
            command += "COMMIT;";
            dbRepository.actionData(command, function(options){
                if(options.error) {
                    callbackFunction({result: options.error, status: 500});
                    return;
                }
                callbackFunction({result: {}, status: 200});
            });
        });
    };

    return self;
};