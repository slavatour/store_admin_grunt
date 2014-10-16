var app = require('./app_config'),
    postgresConfig = require('./postgresql_config'),
    CategoriesController = require('./controllers/CategoriesController'),
    SubcategoriesController = require('./controllers/SubcategoriesController'),
    SliderController = require('./controllers/SliderController'),
    ProductsController = require('./controllers/ProductsController'),
    BrandsController = require('./controllers/BrandsController'),
    CurrenciesController = require('./controllers/CurrenciesController'),
    conString = 'postgres://' + postgresConfig.role.role_name + ':' + postgresConfig.role.role_password +
                '@localhost/' + postgresConfig.database.database_name,
    categoriesController = new CategoriesController.CategoriesController(conString),
    subcategoriesController = new SubcategoriesController.SubcategoriesController(conString),
    sliderController = new SliderController.SliderController(conString),
    productsController = new ProductsController.ProductsController(conString),
    brandsController = new BrandsController.BrandsController(conString),
    currenciesController = new CurrenciesController.CurrenciesController(conString);
//MYTODO add error handler
app.get("/categories", function (req, res) {
    categoriesController.fetchCategories(function (options) {
        var response;
        options.error ? response = {error:options.error} : response = options.data;
        res.header();
        res.status(options.status).end(JSON.stringify(response));
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
        res.status(options.status).end(JSON.stringify({error:options.error}));
    });
});

app.put("/category/:id", function (req, res) {
    categoriesController.putCategory(req.params.id, req.body, req.files, function(options){
        res.header();
        res.status(options.status).end(JSON.stringify({error:options.error}));
    });
});

app.post("/subcategory", function (req, res) {
    subcategoriesController.saveSubcategory(req.body, req.files);
    res.header();
    res.end();
});
//MYTODO add error handler
app.get("/products", function (req, res) {
    productsController.fetchProducts(function(options){
        var response;
        options.error ? response = {error:options.error} : response = options.data;
        res.header();
        res.status(options.status).end(JSON.stringify(response));
    });
});
//MYTODO add error handler
app.get("/slider", function (req, res) {
    sliderController.fetchSliders(function (data) {
        res.header();
        res.end(JSON.stringify(data));
    });
});

app.put("/slider/:id", function (req, res) {
    sliderController.putSlider(req.params.id, req.body, req.files, function(options){
        res.header();
        res.status(options.status).end(JSON.stringify({error:options.error}));
    });
});

app.post("/slider", function (req, res) {
    sliderController.saveSlider(req.body, req.files, function(options){
        res.header();
        res.status(options.status).end(JSON.stringify({error:options.error}));
    });
});

app.delete("/slider/:id", function (req, res) {
    sliderController.deleteSlider(req.params.id, function(options){
        res.header();
        res.status(options.status).end(JSON.stringify({error:options.error}));
    });
});

app.get("/brands", function (req, res) {
    brandsController.fetchBrands(function (options) {
        res.header();
        res.status(options.status).end(JSON.stringify(options.result));
    });
});

app.post("/brand", function (req, res) {
    brandsController.saveBrands(req, function (options) {
        res.header();
        res.status(options.status).end(JSON.stringify(options.result));
    });
});

app.put("/brand/:id", function (req, res) {
    brandsController.putBrands(req, function (options) {
        res.header();
        res.status(options.status).end(JSON.stringify(options.result));
    });
});

app.get("/currencies", function (req, res) {
    currenciesController.fetchCurrencies(function(options){
        res.header();
        res.status(options.status).end(JSON.stringify(options.result));
    });
});

app.post("/currency", function (req, res) {
    currenciesController.saveCurrency(req, function(options){
        res.header();
        res.status(options.status).end(JSON.stringify(options.result));
    });
});

app.put("/currency/:id", function (req, res) {
    currenciesController.putCurrency(req.params.id, req, function(options){
        res.header();
        res.status(options.status).end(JSON.stringify(options.result));
    });
});

app.delete("/currency/:id", function (req, res) {
    currenciesController.deleteCurrency(req.params, function(options){
        res.header();
        res.status(options.status).end(JSON.stringify(options.result));
    });
});

app.get("/currenciesHistory/:from/:to/:id", function (req, res) {
    currenciesController.fetchCurrenciesHistory(req.params, function(options){
        res.header();
        res.status(options.status).end(JSON.stringify(options.result));
    });
});


app.post("/upload", function (req, res) {
    var status = 500,
        response = {};
    if (req.files.file) {
        status = 200;
        response = {path: req.files.file.path};
    }
    res.status(status).end(JSON.stringify(response));
});