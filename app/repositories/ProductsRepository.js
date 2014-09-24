var pg = require('pg');
var path = require('path');
var fs = require('fs');
var DbRepository = require('./dbRepository');

exports.ProductsRepository = function (conString) {
    var self = {};
    var dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchProducts = function (callbackFunction) {
//        var command = "SELECT * FROM products ORDER BY product_position_in_list;";
        var command = "SELECT * FROM products p LEFT OUTER JOIN " +
            "(SELECT c.category_name, c.category_id, s.subcategory_name, s.subcategory_id FROM subcategories s " +
            "LEFT OUTER JOIN categories c ON (subcategory_parent_id = category_id)) s ON (product_parent_id = subcategory_id) " +
            "ORDER BY product_position_in_list;";
        dbRepository.actionData(command, function (options) {
            //MYTODO finish this function
            callbackFunction(options);
        });
    };


    return self;
};