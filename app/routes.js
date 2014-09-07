var app = require(__dirname + "/app_config"),
    routes = require('../routes'),
    user = require('../routes/user'),
    admin = require('../routes/admin');

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', admin.login);
app.get('/admin', admin.admin);