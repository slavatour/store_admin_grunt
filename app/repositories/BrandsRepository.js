var pg = require('pg'),
    path = require('path'),
    fs = require('fs'),
    app = require('../app_config'),
    DbRepository = require('./dbRepository');

exports.BrandsRepository = function(conString) {
    var self = {},
        dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchBrands = function(callbackFunction) {
        var command = "SELECT " +
            "id, " +
            "brand_id, " +
            "brand_name, " +
            "brand_description, " +
            "brand_url " +
            "FROM brands " +
            "ORDER BY brand_id;";
        dbRepository.actionData(command, function(options){
            var brands = options.result;
            if (options.error) {
                callbackFunction({result: options.error, status: 500});
                return;
            }
            command = "BEGIN; ";
            for(var i= 0; i < brands.length; i++) {
                var brand = brands[i],
                    random = Math.random().toString(16).slice(2),
                    folder = path.resolve(__dirname, "../../", "public/images/temp/", random + ".png");
                command += "SELECT lo_export(brand_photo, '" + folder + "') FROM brands WHERE brand_id = " + brand.brand_id + "; ";
                brand.brand_photo = random + ".png";
            }
            command += "COMMIT;";
            dbRepository.actionData(command, function(options){
                if(options.error) {
                    callbackFunction({result: options.error, status: 500});
                    return;
                }
                callbackFunction({result: brands, status: 200});
            });
        });
    };
    self.fetchBrandsList = function(callbackFunction){
        var command = "SELECT brand_id, brand_name FROM brands;";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: options.result});
        });
    };
    self.saveBrands = function(req, callbackFunction) {
        var model = req.body,
            command = "INSERT INTO brands (" +
                "brand_name, " +
                "brand_description, " +
                "brand_url, " +
                "brand_photo) " +
                "VALUES(" +
                "'" + model.brand_name + "', " +
                "'" + model.brand_description + "', " +
                "'" + model.brand_url + "', " +
                "lo_import('" + model.brand_photo + "'));";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: {}});
        });
    };
    self.putBrands = function(req, callbackFunction) {
        var id = req.params.id,
            model = req.body,
            command = "UPDATE brands SET " +
                "brand_name = '" + model.brand_name + "', " +
                "brand_description = '" + model.brand_description + "', " +
                "brand_url = '" + model.brand_url + "'";
        fs.exists("./files/" + model.brand_photo, function (exists) {
            if(exists) {
                command += ", brand_photo = lo_import('" + model.brand_photo + "') " +
                    "WHERE brand_id = " + id + ";";
            } else {
                command += " WHERE brand_id = " + id + ";";
            }
            dbRepository.actionData(command, function (options) {
                options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: {}});
            });
        });
    };
    self.deleteBrand = function(req, callbackFunction) {
        var id = req.params.id,
            command = "DELETE FROM brands WHERE brand_id = " + id + ";";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: {}});
        });
    };

    return self;
};