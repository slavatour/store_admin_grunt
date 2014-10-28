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
    return self;
};