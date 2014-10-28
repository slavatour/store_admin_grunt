var pg = require('pg'),
    path = require('path'),
    moment = require('moment'),
    DbRepository = require('./dbRepository');


exports.SpecificationsRepository = function(conString) {
    var self = {},
        dbRepository = new DbRepository.DatabaseRepository(conString);

    self.fetchSpecifications = function(callbackFunction){
        var command = 'WITH RECURSIVE specifications_temp ("specification_id", PATH, LEVEL ) AS (' +
            'SELECT "specification_id", CAST (T1."specification_name" AS VARCHAR (50)) as PATH, 1 ' +
            'FROM specifications T1 WHERE T1."specification_parent_id" IS NULL union select T2."specification_id", ' +
            'CAST ( specifications_temp.PATH ||\'/\'|| T2."specification_name" AS VARCHAR(50)) ,LEVEL + 1 ' +
            'FROM specifications T2 INNER JOIN specifications_temp ON( specifications_temp."specification_id"= T2."specification_parent_id")) ' +
            'SELECT p.*, c.path, c.level FROM specifications_temp c INNER JOIN specifications p ON (p.specification_id = c.specification_id);';
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: options.result});
        });
    };

    self.saveSpecification = function(req, callbackFunction) {
        var model = req.body,
            command = "INSERT INTO specifications (" +
                "specification_name, " +
                "specification_description";
        if(model.specification_values !== null) {
            command += ", specification_values";
        }
        if(model.specification_parent_id !== null) {
            command += ", specification_parent_id";
        }
        if(model.specification_group !== null) {
            command += ", specification_group";
        }
        command += ") VALUES ( '" +
        model.specification_name + "', '" +
        model.specification_description;
        if(model.specification_values !== null) {
            command += "', '" + model.specification_values;
        }
        if(model.specification_parent_id !== null) {
            command += "', '" + model.specification_parent_id;
        }
        if(model.specification_group !== null) {
            command += "', '" + model.specification_group;
        }
        command += "');";
        dbRepository.actionData(command, function (options) {
           options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: options.result});
        });
    };

    self.putSpecification = function(req, callbackFunction) {
        var model = req.body,
            id = req.params.id,
            command = "BEGIN; ";
        if(model.specification_parent_id !== null) {
            command += "UPDATE specifications SET specification_parent_id = " + model.specification_parent_id + " WHERE specification_id = " + id + "; "
        }
        if(model.specification_name !== null) {
            command += "UPDATE specifications SET specification_name = '" + model.specification_name + "' WHERE specification_id = " + id + "; "
        }
        if(model.specification_description !== null) {
            command += "UPDATE specifications SET specification_description = '" + model.specification_description + "' WHERE specification_id = " + id + "; "
        }
        if(model.specification_values !== null) {
            command += "UPDATE specifications SET specification_values = '" + JSON.stringify(model.specification_values) + "' WHERE specification_id = " + id + "; "
        }
        command += "COMMIT;";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: options.result});
        });
    };

    self.deleteSpecification = function(req, callbackFunction) {
        var id =  req.params.id,
            command = "DELETE FROM specifications WHERE specification_id = " + id + ";";
        dbRepository.actionData(command, function (options) {
            options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: {}});
        });
    };

    self.fetchSpecificationsClasses = function(callbackFunction) {
        var command = "SELECT specification_id, specification_name FROM specifications WHERE specification_parent_id IS NULL;";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({status: 500, result: options.error}) : callbackFunction({status: 200, result: options.result});
        });
    };

    return self;
};