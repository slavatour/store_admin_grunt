var pg = require('pg');
var path = require('path');
var fs = require('fs');
var DbRepository = require('./dbRepository');

exports.ProductsRepository = function (conString) {
    var self = {};
    var dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchProducts = function (callbackFunction) {
        var command = 'WITH RECURSIVE categories_temp ("category_id", PATH, LEVEL ) AS (' +
            'SELECT "category_id", CAST (T1."category_name" AS VARCHAR (50)) as PATH, 1 ' +
            'FROM categories T1 WHERE T1."category_parent_id" IS NULL union select T2."category_id", ' +
            'CAST ( categories_temp.PATH ||\'/\'|| T2."category_name" AS VARCHAR(50)) ,LEVEL + 1 ' +
            'FROM categories T2 INNER JOIN categories_temp ON( categories_temp."category_id"= T2."category_parent_id")) ' +
            'SELECT p.*, c.path, c.level FROM categories_temp c INNER JOIN products p ON (p.product_parent_id = c.category_id);';
        dbRepository.actionData(command, function (options) {
            //MYTODO finish this function
            callbackFunction(options);
        });
    };
    self.saveProduct = function(req, callbackFunction) {
        var model = req.body,
            command = "WITH rows AS (" +
                "SELECT max(product_position_in_list) " +
                "FROM products " +
                "WHERE product_parent_id = 22) " +
                "INSERT INTO products (" +
                "product_parent_id, " +
                "product_brand_id, " +
                "product_full_name, " +
                "product_short_name, " +
                "product_short_description, " +
                "product_full_description, " +
                "product_start_date, " +
                "product_position_in_list";
        if(model.product_barcode_EAN13) {
            command += ", product_barcode_EAN13";
        }
        if(model.product_barcode_UPC) {
            command += ", product_barcode_UPC";
        }
        if(model.product_end_date) {
            command += ", product_end_date";
        }
        command += ") VALUES (" +
            model.product_parent_id + ", " +
            model.product_brand_id + ", " +
            "'" + model.product_full_name + "', " +
            "'" + model.product_short_name + "', " +
            "'" + model.product_short_description + "', " +
            "'" + model.product_full_description + "', " +
            + model.product_start_date + ", " +
            "(SELECT max FROM rows)+1";
        if(model.product_barcode_EAN13) {
            command += ", " + model.product_barcode_EAN13;
        }
        if(model.product_barcode_UPC) {
            command += ", " + model.product_barcode_UPC;
        }
        if(model.product_end_date) {
            command += ", " + model.product_end_date;
        }
        command += ");";
        console.log(command);
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: {}, status: 200});
        });
    };

    return self;
};