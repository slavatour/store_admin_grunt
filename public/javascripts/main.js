requirejs.config({
	baseUrl: "javascripts",
	paths: {
		// vendor libs
		backbone: "libs/js/backbone/backbone",//
		jquery: "libs/js/jquery/jquery.min",//
        jqueryui: "libs/js/jquery-ui",//
		marionette: "libs/js/backbone.marionette/backbone.marionette.min",//
		underscore: "libs/js/underscore/underscore",
		i18next: "libs/js/i18next/18next.amd.min",//
		"jquery-spin": "libs/jquery.spin",//
//		spin: "libs/spin",
		chartjs: "libs/js/chartjs/Chart",
		bootstrap: "libs/js/bootstrap-sass/bootstrap.min",
		"bootstrap-switch": "libs/js/bootstrap-switch/bootstrap-switch.min",


		//Application
		Store: "app",
        //Router file
        routes: "routes/routes",
		//models
		SliderModel: "models/sliderModel",
		CategoryModel: "models/categoryModel",
		SubcategoryModel: "models/subcategoryModel",
        ProductModel: "models/productModel",
        BrandModel: "models/brandModel",

		//collections
		SlidersCollection: "collections/slidersCollection",
		CategoriesCollection: "collections/categoriesCollection",
		SubcategoriesCollection: "collections/subcategoriesCollection",
		ProductsCollection: "collections/productsCollection",
		BrandsCollection: "collections/brandsCollection",

		//models views
		SliderModelView: "views/sliderModelView",
		ModalSliderView: "views/modalSliderView",
		CategoryModelView: "views/categoryModelView",
		SubcategoryModelView: "views/subcategoryModelView",
		ModalCategoryView: "views/modalCategoryView",
		ProductModelView: "views/productModelView",
		BrandModelView: "views/brandModelView",

		//collections views
		SlidersCollectionView: "views/slidersCollectionView",
		CategoryCollectionView: "views/categoriesCollectionView",
		SubcategoriesCollectionView: "views/subcategoriesCollectionView",
		ProductsCollectionView: "views/productCollectionView",
		BrandsCollectionView: "views/brandsCollectionViews",

		//controllers
		SliderController: "controllers/slidersController",
		CategoriesController: "controllers/categoriesController",
		SubcategoriesController: "controllers/subcategoriesController",
		ProductsController: "controllers/productsController",
		BrandsController: "controllers/brandsController"
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