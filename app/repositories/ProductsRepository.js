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
    self.fetchProduct = function(req, callbackFunction) {
        var id = req.params.id,
            command = 'WITH RECURSIVE categories_temp ("category_id", PATH, LEVEL ) AS (' +
                'SELECT "category_id", CAST (T1."category_name" AS VARCHAR (50)) as PATH, 1 ' +
                'FROM categories T1 WHERE T1."category_parent_id" IS NULL union select T2."category_id", ' +
                'CAST ( categories_temp.PATH ||\'/\'|| T2."category_name" AS VARCHAR(50)) ,LEVEL + 1 ' +
                'FROM categories T2 INNER JOIN categories_temp ON( categories_temp."category_id"= T2."category_parent_id")) ' +
                'SELECT p.*, c.path, c.level FROM categories_temp c INNER JOIN products p ON (p.product_parent_id = c.category_id) WHERE product_id = ' + id + ' ;';
//            command = "SELECT * FROM products WHERE product_id = " + id + ";";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: options.result, status: 200});
        });
    };
    self.saveProduct = function(req, callbackFunction) {
        var model = req.body,
            command = "WITH rows AS (" +
                "SELECT max,  " +
                "CASE WHEN max IS NULL THEN 1 ELSE max + 1 END AS new_position FROM " +
                "(SELECT max(product_position_in_list)" +
                "FROM products " +
                "WHERE product_parent_id = " +
                model.product_parent_id + ") AS maximum) " +
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
            "(SELECT new_position FROM rows)";
        if(model.product_barcode_EAN13) {
            command += ", " + model.product_barcode_EAN13;
        }
        if(model.product_barcode_UPC) {
            command += ", " + model.product_barcode_UPC;
        }
        if(model.product_end_date) {
            command += ", " + model.product_end_date;
        }
        command += ") RETURNING product_id;";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: options.result[0], status: 200});
        });
    };

    self.putProduct = function(req, callbackFunction) {
        var id = req.params.id,
            model = req.body,
            command = "UPDATE products SET " +
                "product_parent_id = " + model.product_parent_id + ", " +
                "product_brand_id = " + model.product_brand_id + ", " +
                "product_full_name = '" + model.product_full_name + "', " +
                "product_short_name = '" + model.product_short_name + "', " +
                "product_short_description = '" + model.product_short_description + "', " +
                "product_full_description = '" + model.product_full_description + "', " +
                "product_start_date = " + model.product_start_date;
        if(model.product_barcode_ean13) {
            command += ", product_barcode_ean13 = " + model.product_barcode_ean13;
        }
        if(model.product_barcode_upc) {
            command += ", product_barcode_upc = " + model.product_barcode_upc;
        }
        if(model.product_end_date) {
            command += ", product_end_date = " + model.product_end_date;
        }
        command += " WHERE product_id = " +
                id + " " +
                "RETURNING product_id;";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: options.result[0], status: 200});
        });
    };

    return self;
};