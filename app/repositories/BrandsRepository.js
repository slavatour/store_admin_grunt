var pg = require('pg'),
    path = require('path'),
    DbRepository = require('./dbRepository');

exports.BrandsRepository = function(conString) {
    var self = {},
        dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchBrands = function(callbackFunction) {
        var command = "SELECT * FROM brands1;";
        dbRepository.actionData(command, function(options){
            if (options.error) {
                callbackFunction({error:options.error, status: 500});
            } else {
                callbackFunction({data: options.result, status: 200});
            }
        });
    };


    return self;
}