var pg = require('pg');

exports.DatabaseRepository = function (conString) {
	var self = {};

	self.actionData = function (command, callbackFunction) {

		var client = new pg.Client(conString);
		client.connect(function (err) {
			if(err) {
                if(callbackFunction) {
                    callbackFunction({error: 'could not connect to data base'+ err});
                }
				return console.error('could not connect to pg', err);
			}
			
			client.query(command, function (err, result) {
				if(err) {
                    if(callbackFunction) {
                        callbackFunction({error: 'error running query'+ err});
                    }
					return console.error('error running query', err);
				}
				if(callbackFunction) {
					callbackFunction({result: result.rows});
				}
				client.end();
			});
		});
	};

	return self;
};