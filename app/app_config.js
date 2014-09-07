var express = require('express'),
    app = express(),
    path = require('path'),
    i18n = require('i18next');


// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.multipart({uploadDir:path.join(__dirname,'../files')})); //uploaded files path join
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(i18n.handle); //multilamguage modal, have to be after cookie, before router
app.use(app.router);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '../public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

module.exports = app;