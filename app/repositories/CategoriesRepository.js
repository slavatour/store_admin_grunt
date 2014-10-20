var pg = require('pg'),
    path = require('path'),
    moment = require('moment'),
    DbRepository = require('./dbRepository');

exports.CategoriesRepository = function (conString) {
	var self = {};
    var dbRepository = new DbRepository.DatabaseRepository(conString);
	self.fetchCategories = function (callbackFunction) {
        var command = 'WITH RECURSIVE categories_temp ("category_id", PATH, LEVEL ) AS (' +
            'SELECT "category_id", CAST (T1."category_name" AS VARCHAR (50)) as PATH, 1 ' +
            'FROM categories T1 WHERE T1."category_parent_id" IS NULL union select T2."category_id", ' +
            'CAST ( categories_temp.PATH ||\'/\'|| T2."category_name" AS VARCHAR(50)) ,LEVEL + 1 ' +
            'FROM categories T2 INNER JOIN categories_temp ON( categories_temp."category_id"= T2."category_parent_id")) ' +
            'SELECT p.*, c.path, c.level FROM categories_temp c INNER JOIN categories p ON (p.category_id = c.category_id);';
		dbRepository.actionData(command, function (options) {
            for (var i = 0; i < options.result.length; i++) {
                if(options.result[i].category_image) {
                    var folder = path.resolve(__dirname, "../../", "public/images/temp/", "categoryImg" +
                        options.result[i].category_id + ".png");
                        command = "SELECT lo_export(categories.category_image, '"+folder+"') FROM categories WHERE category_id = "+
                            options.result[i].category_id+";";
                    dbRepository.actionData(command);
                    options.result[i].category_image_name = "categoryImg" + options.result[i].category_id + ".png";
                }
            }
            callbackFunction({result: options.result});
		});
	};
    self.fetchCategoriesTree = function (callbackFunction) {
        var command = 'WITH RECURSIVE categories_temp ("category_id", PATH, LEVEL ) AS (' +
            'SELECT "category_id", CAST (T1."category_name" AS VARCHAR (50)) as PATH, 1 ' +
            'FROM categories T1 WHERE T1."category_parent_id" IS NULL union select T2."category_id", ' +
            'CAST ( categories_temp.PATH ||\'/\'|| T2."category_name" AS VARCHAR(50)) ,LEVEL + 1 ' +
            'FROM categories T2 INNER JOIN categories_temp ON( categories_temp."category_id"= T2."category_parent_id")) ' +
            'select * from categories_temp ORDER BY PATH;';
        dbRepository.actionData(command, function (options) {
            callbackFunction({result: options.result});
        });
    };
    self.saveCategory = function (req, callbackFunction) {
        var model = req.body,
            command = "SELECT max(category_position_in_list) FROM categories WHERE category_parent_id ";
        model.category_parent_id ? command += "= " + model.category_parent_id + ";"  : command += "IS NULL;";
        dbRepository.actionData(command, function (options) {
            if(options.error) {
                callbackFunction({result: options.error, status: 500});
            }
            if(!options.result[0]) {
                model.category_position_in_list = 1;
            } else {
                model.category_position_in_list = 1*options.result[0].max+1;
            }
//            //MYTODO set valaibility to write data without photo
            command = "INSERT INTO categories (" +
                "category_name, " +
                "category_position_in_list, " +
                "category_description, " +
                "category_start_date, ";
            if(model.category_parent_id) {
                command += "category_parent_id, ";
            }
            command += "category_image" +
                ") VALUES ('"+
                model.category_name + "', "+
                model.category_position_in_list +", '"+
                model.category_description +"', " +
                moment().format('X') +", ";
            if(model.category_parent_id) {
                command += model.category_parent_id +", ";
            }
            command += "lo_import('"+ model.category_image_name +"'));";
            dbRepository.actionData(command, function(options){
                if(options.error) {
                    callbackFunction({result: options.error, status: 500});
                } else {
                    callbackFunction({status: 200, result:{}});
                }
            });
        });
    };
    self.putCategory = function(id, model, file, callbackFunction) {
        var command = "SELECT * FROM categories WHERE category_id='"+id+"';";
        dbRepository.actionData(command, function (options) {
            if(options.error) {
                callbackFunction({error: options.error, status: 500});
                return;
            }
            if(options.result[0]) {
                var command = "BEGIN;"
                for (key in model) {
                    command += "UPDATE categories SET "+key+" = '"+model[key]+"' WHERE category_id = "+id+";";
                }
                if(file !== undefined && file.file !== undefined) {
                    command += "UPDATE categories SET category_image = lo_import('"+file.file.path+"') WHERE category_id = "+id+";"
                }
                command += "COMMIT;";
                dbRepository.actionData(command, function () {
                    options.error ? callbackFunction({error: options.error, status: 500}) : callbackFunction({status: 200});
                    if(file !== undefined && file.file !== undefined) {
                        fs.unlink(file.file.path, function (err) {
                            if(err){
                                console.error('error delete tepml file', err);
                            }
                        });
                    }
                });
            }
        });
    };
    self.deleteCategory = function (id, callbackFunction) {
        var command = "DELETE FROM categories WHERE id = "+ id +";";
        dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({result: options.error, status: 500}) : callbackFunction({result: {}, status: 200});
        });
    };

	return self;
};