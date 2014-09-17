var pg = require('pg');
var path = require('path');
var fs = require('fs');
var DbRepository = require('./dbRepository');

exports.ProductsRepository = function (conString) {
    var self = {};
    var dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchProducts = function (callbackFunction) {
        var command = "SELECT * FROM products ORDER BY product_position_in_list;";
        dbRepository.actionData(command, function (options) {
            //MYTODO finish this function
            callbackFunction(options.result);
        });
    };


    return self;
};