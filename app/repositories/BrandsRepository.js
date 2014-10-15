var pg = require('pg'),
    path = require('path'),
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
            "FROM brands;";
        dbRepository.actionData(command, function(options){
            if (options.error) {
                callbackFunction({error: options.error, status: 500});
                return;
            }
            for(var i= 0; i < options.result.length; i++) {
                var model = options.result[i],
                    random = Math.random().toString(16).slice(2),
                    folder = path.resolve(__dirname, "../../", "public/images/temp/", random + ".png"),
                    command = "SELECT lo_export(brand_photo, '" + folder + "') FROM brands WHERE brand_id = " + model.brand_id;

                dbRepository.actionData(command, function(options){
                    if(options.error) {
                        callbackFunction({error: options.error, status: 500});
                        return;
                    }
                    model.brand_photo = random + ".png";
                    console.log(model);
                });
            }
            console.log(options);
            callbackFunction({data: options.result, status: 200});
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


    return self;
};