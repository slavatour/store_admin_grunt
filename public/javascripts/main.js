requirejs.config({
	baseUrl: "javascripts",
	paths: {
		// vendor libs
		backbone: "libs/js/backbone/backbone",//
		jquery: "libs/js/jquery/jquery.min",//
		marionette: "libs/js/backbone.marionette/backbone.marionette.min",//
		underscore: "libs/js/underscore/underscore",
		i18next: "libs/js/i18next/18next.amd.min",//
		"jquery-spin": "libs/jquery.spin",//
//		spin: "libs/spin",
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

		//collections
		SlidersCollection: "collections/slidersCollection",
		CategoriesCollection: "collections/categoriesCollection",
		SubcategoriesCollection: "collections/subcategoriesCollection",

		//models views
		SliderModelView: "views/sliderModelView",
		ModalSliderView: "views/modalSliderView",
		CategoryModelView: "views/categoryModelView",
		SubcategoryModelView: "views/subcategoryModelView",
		ModalCategoryView: "views/modalCategoryView",

		//collections views
		SlidersCollectionView: "views/slidersCollectionView",
		CategoryCollectionView: "views/categoriesCollectionView",
		SubcategoriesCollectionView: "views/subcategoriesCollectionView",

		//controllers
		SliderController: "controllers/slidersController",
		CategoriesController: "controllers/categoriesController",
		SubcategoriesController: "controllers/subcategoriesController"
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
        }
	}
});

require(["marionette", "Store", "bootstrap", "bootstrap-switch"], function (Marionette, Store) {
	Store.start();
});