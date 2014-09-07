var pg = require('pg');
var path = require('path');
var fs = require('fs');
var DbRepository = require('./dbRepository');

exports.SlidersRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.DatabaseRepository(conString);

	self.fetchSliders = function (callbackFunction) {
		var command = "SELECT * FROM slider ORDER BY slider_position_in_list;";
		dbRepository.actionData(command, function (result) {
			for (var i = 0; i < result.length; i++) {
				if(result[i].slider_image_name) {
					var folder = path.resolve(__dirname, "../../", "public/images/temp/", result[i].slider_image_name);
					var command = "SELECT lo_export(slider.slider_image, '"+folder+"') FROM slider WHERE slider_id = "+
                        result[i].slider_id+";";
					dbRepository.actionData(command);
				}
			}
			callbackFunction(result);
		});	
	};
	self.putSlider = function (id, model, file) {
		var command = "SELECT * FROM slider WHERE slider_id='"+id+"';";
		dbRepository.actionData(command, function (result) {
			if(result[0]) {
				for (key in model) {
					var command = "UPDATE slider SET "+key+" = '"+model[key]+"' WHERE slider_id = "+id+";";
                    console.log(command);
					dbRepository.actionData(command);
				}
				if(file !== undefined && file.file !== undefined) {
					var command = "UPDATE slider SET slider_image = lo_import('"+file.file.path+"') WHERE slider_id = "+id+";"
					dbRepository.actionData(command, function (result) {
						fs.unlink(file.file.path, function (err) {
							if(err){
								console.error('error delete tepl file', err);
							}
						});
					});
				}
			}
		});	
	};
	self.saveSlider = function (model, file) {
		var command = "SELECT max(slider_position_in_list) FROM slider;";
		dbRepository.actionData(command, function (result) {
			for(key in model) {
				if(model[key] === undefined) {
					model[key] = "";
				}
			}
			if(!result[0]) {
				model.number = 1;
			} else {
				model.number = 1*result[0].max+1;
			}
			var command = "SELECT max(id) FROM slider;";
			dbRepository.actionData(command, function (result) {
				var command = "INSERT INTO slider (slider_position_in_list, slider_name, slider_description, slider_url, slider_image, slider_image_name) VALUES ("+
					model.number+", '"+model.slider_name+"', '"+model.slider_description+"', '"+model.slider_url+"', lo_import('"+
					file.file.path+"'), 'slider"+(result[0].max+1)+".png');";
                console.log(command);
				dbRepository.actionData(command);
			});
		});
	};
	self.deleteSlider = function (id) {
		var command = "DELETE FROM slider WHERE id="+id+";";
		dbRepository.actionData(command);
	};

	return self;
};