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
		"ckeditor": "libs/bower_components/ckeditor/ckeditor",


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
        ProductNewModel: "models/productNewModel",
        BrandModel: "models/brandModel",
        CurrencyModel: "models/currencyModel",
        CurrencyHistoryModel: "models/currencyHistoryModel",
        PriceModel: "models/priceModel",
        PriceRulesModel: "models/priceRulesModel",
        SpecificationModel: "models/specificationModel",

		//collections
		SlidersCollection: "collections/slidersCollection",
		CategoriesCollection: "collections/categoriesCollection",
		SubcategoriesCollection: "collections/subcategoriesCollection",
		ProductsCollection: "collections/productsCollection",
		BrandsCollection: "collections/brandsCollection",
		CurrenciesCollection: "collections/currenciesCollection",
		CurrenciesHistoryCollection: "collections/currenciesHistoryCollection",
		PricesCollection: "collections/pricesCollection",
        SpecificationsCollection: "collections/specificationsCollection",

		//models views
		SliderModelView: "views/sliders/sliderModelView",
		CategoryModelView: "views/categories/categoryModelView",
		ProductModelView: "views/products/productModelView",
		ProductNewModelView: "views/products/productNewModelView",
		BrandModelView: "views/brands/brandModelView",
		CurrencyModelView: "views/currencies/currencyModelView",
		CurrencyHistoryModelView: "views/currencies/currencyHistoryModelView",
		PriceModelView: "views/prices/priceModelView",
		PriceRulesModelView: "views/prices/priceRulesModelView",
        PricesChartModelView: "views/prices/pricesChartModelView",
        SpecificationModelView: "views/specifications/specificationModelView",

		//collections views
		SlidersCollectionView: "views/sliders/slidersCollectionView",
		CategoryCollectionView: "views/categories/categoriesCollectionView",
		ProductsCollectionView: "views/products/productCollectionView",
		BrandsCollectionView: "views/brands/brandsCollectionViews",
		CurrenciesCollectionView: "views/currencies/currenciesCollectionView",
		CurrenciesHistoryCollectionView: "views/currencies/currenciesHistoryCollectionView",
		PricesCollectionView: "views/prices/pricesCollectionView",
        SpecificationCollectionView: "views/specifications/specificationsCollectionView",

        //modals
        ModalCategoryView: "views/categories/modalCategoryView",
        ModalBrandsView: "views/brands/modalBrandsView",
        ModalSliderView: "views/sliders/modalSliderView",
        ModalCurrencyView: "views/currencies/modalCurrenciesView",
        ModalPricesView: "views/prices/modalPricesView",
        ModalProductsView: "views/products/modalProductsView",
        ModalSpecificationsView: "views/specifications/modalSpecificationsView",

		//controllers
		SliderController: "controllers/slidersController",
		CategoriesController: "controllers/categoriesController",
		SubcategoriesController: "controllers/subcategoriesController",
		ProductsController: "controllers/productsController",
		ProductsNewController: "controllers/productsNewController",
		BrandsController: "controllers/brandsController",
        CurrenciesController: "controllers/currenciesController",
        AlertsController: "controllers/alertsController",
        PricesController: "controllers/pricesController",
        SpecificationsController: "controllers/specificationsController"
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
        },
        ckeditor: {
            exports: "CKEDITOR"
        }
	}
});

require(["marionette", "Store", "bootstrap"], function (Marionette, Store) {
	Store.start();
});