var app = require('./app_config'),
    postgresConfig = require('./postgresql_config'),
    CategoriesController = require('./controllers/CategoriesController'),
    SubcategoriesController = require('./controllers/SubcategoriesController'),
    SliderController = require('./controllers/SliderController'),
    conString = 'postgres://' + postgresConfig.role.role_name + ':' + postgresConfig.role.role_password +
                '@localhost/' + postgresConfig.database.database_name,
    categoriesController = new CategoriesController.CategoriesController(conString),
    subcategoriesController = new SubcategoriesController.SubcategoriesController(conString),
    sliderController = new SliderController.SliderController(conString);

app.get("/categories", function (req, res) {
    categoriesController.fetchCategories(function (data) {
        res.header();
        res.end(JSON.stringify(data));
    });
});

app.post("/category", function (req, res) {
    categoriesController.saveCategory(req.body, req.files, function(options){
        res.header();
        res.status(options.status).end(options.error);
    });
});

app.delete("/category/:id", function (req, res) {
    categoriesController.deleteCategory(req.params.id, function(options){
        res.header();
        res.status(options.status).end(options.error);
    });
});

app.post("/subcategory", function (req, res) {
    subcategoriesController.saveSubcategory(req.body, req.files);
    res.header();
    res.end();
});

app.get("/slider", function (req, res) {
    sliderController.fetchSliders(function (data) {
        res.header();
        res.end(JSON.stringify(data));
    });
});

app.put("/slider/:id", function (req, res) {
    sliderController.putSlider(req.params.id, req.body, req.files);
    res.end();
});

app.post("/slider", function (req, res) {
    sliderController.saveSlider(req.body, req.files);
    res.header();
    res.end();
});

app.delete("/slider/:id", function (req, res) {
    sliderController.deleteSlider(req.params.id, function(options){
        res.header();
        res.status(options.status).end(options.error);
    });
});
