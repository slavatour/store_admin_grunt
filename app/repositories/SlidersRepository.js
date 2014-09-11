var pg = require('pg');
var path = require('path');
var fs = require('fs');
var DbRepository = require('./dbRepository');

exports.SlidersRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.DatabaseRepository(conString);

	self.fetchSliders = function (callbackFunction) {
		var command = "SELECT * FROM slider ORDER BY slider_position_in_list;";
		dbRepository.actionData(command, function (options) {
			for (var i = 0; i < options.result.length; i++) {
				if(options.result[i].slider_image_name) {
					var folder = path.resolve(__dirname, "../../", "public/images/temp/", options.result[i].slider_image_name);
					var command = "SELECT lo_export(slider.slider_image, '"+folder+"') FROM slider WHERE slider_id = "+
                        options.result[i].slider_id+";";
					dbRepository.actionData(command);
				}
			}
			callbackFunction(options.result);
		});	
	};
	self.putSlider = function (id, model, file) {
		var command = "SELECT * FROM slider WHERE slider_id='"+id+"';";
		dbRepository.actionData(command, function (options) {
			if(options.result[0]) {
                var command = "BEGIN;"
				for (key in model) {
					command += "UPDATE slider SET "+key+" = '"+model[key]+"' WHERE slider_id = "+id+";";
				}
				if(file !== undefined && file.file !== undefined) {
					command += "UPDATE slider SET slider_image = lo_import('"+file.file.path+"') WHERE slider_id = "+id+";"
				}
                command += "COMMIT;";
                dbRepository.actionData(command, function () {
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
	self.saveSlider = function (model, file) {
		var command = "SELECT max(slider_position_in_list) FROM slider;";
		dbRepository.actionData(command, function (options) {
			for(key in model) {
				if(model[key] === undefined) {
					model[key] = "";
				}
			}
			if(!options.result[0]) {
				model.number = 1;
			} else {
				model.number = 1*options.result[0].max+1;
			}
			var command = "SELECT max(id) FROM slider;";
			dbRepository.actionData(command, function (options) {
				var command = "INSERT INTO slider (slider_position_in_list, slider_name, slider_description, slider_url, slider_image, slider_image_name) VALUES ("+
					model.number+", '"+model.slider_name+"', '"+model.slider_description+"', '"+model.slider_url+"', lo_import('"+
					file.file.path+"'), 'slider"+(options.result[0].max+1)+".png');";
				dbRepository.actionData(command);
			});
		});
	};
	self.deleteSlider = function (id, callbackFunction) {
		var command = "DELETE FROM slider WHERE id="+id+";";
		dbRepository.actionData(command, function(options){
            options.error ? callbackFunction({error: options.error, status: 500}) : callbackFunction({status: 200});
        });
	};

	return self;
};