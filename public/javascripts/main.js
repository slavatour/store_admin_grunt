requirejs.config({
	baseUrl: "javascripts",
	paths: {
		// vendor libs
		backbone: "libs/js/backbone/backbone",//
		"backbone-computedfields": "libs/js/backbone-computedfields/backbone.computedfields.min",//
		jquery: "libs/js/jquery/jquery.min",//
        jqueryui: "libs/js/jquery-ui",//
		marionette: "libs/js/backbone.marionette/backbone.marionette.min",//
		underscore: "libs/js/underscore/underscore",
		i18next: "libs/js/i18next/18next.amd.min",//
		"jquery-spin": "libs/jquery.spin",//
//		spin: "libs/spin",
		chartjs: "libs/js/chartjs/Chart",
		bootstrap: "libs/js/bootstrap-sass/bootstrap.min",
		moment: "libs/js/moment/moment-with-locales.min",
		"bootstrap-switch": "libs/js/bootstrap-switch/bootstrap-switch.min",


		//Application
		Store: "app",
        //Router file
        routes: "routes/routes",
        //configuration files
        config: "common/config",

		//models
		SliderModel: "models/sliderModel",
		CategoryModel: "models/categoryModel",
		SubcategoryModel: "models/subcategoryModel",
        ProductModel: "models/productModel",
        BrandModel: "models/brandModel",
        CurrencyModel: "models/currencyModel",
        CurrencyHistoryModel: "models/currencyHistoryModel",
        PriceModel: "models/priceModel",
        PriceRulesModel: "models/priceRulesModel",

		//collections
		SlidersCollection: "collections/slidersCollection",
		CategoriesCollection: "collections/categoriesCollection",
		SubcategoriesCollection: "collections/subcategoriesCollection",
		ProductsCollection: "collections/productsCollection",
		BrandsCollection: "collections/brandsCollection",
		CurrenciesCollection: "collections/currenciesCollection",
		CurrenciesHistoryCollection: "collections/currenciesHistoryCollection",
		PricesCollection: "collections/pricesCollection",

		//models views
		SliderModelView: "views/sliderModelView",
		CategoryModelView: "views/categoryModelView",
		SubcategoryModelView: "views/subcategoryModelView",
		ProductModelView: "views/productModelView",
		BrandModelView: "views/brandModelView",
		CurrencyModelView: "views/currencyModelView",
		CurrencyHistoryModelView: "views/currencyHistoryModelView",
		PriceModelView: "views/priceModelView",
		PriceRulesModelView: "views/priceRulesModelView",
        PricesChartModelView: "views/pricesChartModelView",

		//collections views
		SlidersCollectionView: "views/slidersCollectionView",
		CategoryCollectionView: "views/categoriesCollectionView",
		SubcategoriesCollectionView: "views/subcategoriesCollectionView",
		ProductsCollectionView: "views/productCollectionView",
		BrandsCollectionView: "views/brandsCollectionViews",
		CurrenciesCollectionView: "views/currenciesCollectionView",
		CurrenciesHistoryCollectionView: "views/currenciesHistoryCollectionView",
		PricesCollectionView: "views/pricesCollectionView",

        //modals
        ModalCategoryView: "views/modalCategoryView",
        ModalBrandsView: "views/modalBrandsView",
        ModalSliderView: "views/modalSliderView",
        ModalCurrencyView: "views/modalCurrenciesView",
        ModalPricesView: "views/modalPricesView",

		//controllers
		SliderController: "controllers/slidersController",
		CategoriesController: "controllers/categoriesController",
		SubcategoriesController: "controllers/subcategoriesController",
		ProductsController: "controllers/productsController",
		BrandsController: "controllers/brandsController",
        CurrenciesController: "controllers/currenciesController",
        AlertsController: "controllers/alertsController",
        PricesController: "controllers/pricesController"
	},
	shim: {
		jquery: {
			exports: "$"
		},
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["backbone"],
			exports: "Marionette"
		},
		i18next: {
			deps: ["jquery"]
		},
		"jquery-spin": {
			deps: ["jquery"]
		},
		spin: {
			deps: ["jquery-spin"]
		},
		bootstrap: {
			deps: ["jquery"]
		},
		"bootstrap-switch": {
			deps: ["bootstrap"]
		},
        Store: {
            exports: "Store"
        },
        jquerySortable: {
            deps: ["jquery", "libs/js/jquery-ui/core", "libs/js/jquery-ui/widget", "libs/js/jquery-ui/mouse"]
        },
        chartjs: {
            exports: "Chart"
        }
	}
});

require(["marionette", "Store", "bootstrap"], function (Marionette, Store) {
	Store.start();
});