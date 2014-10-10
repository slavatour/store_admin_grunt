
var app = require('./app/app_config'),
    router = require('./app/routes'),
    i18n = require('./app/i18n_config'),
    main = require('./app/main');

module.exports = app;

//MYTODO in initial module add: "Add main currency, currency of counting". When you add in currency table creates first row with currency value =1 and default =true