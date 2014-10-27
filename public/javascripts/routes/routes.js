define(["marionette", "views/spinnerView"], function (Marionette, Spinner) {
	var StoreRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"" 						: "index",
			"/" 					: "index",
			"categories" 			: "showCategories",
			"products" 				: "showProducts",
			"new_product"			: "showNewProduct",
			"new_product/:subTab"	: "showNewProductSubTab",
            "specifications"    	: "showSpecification",
            "slider"				: "showSliderEdit",
			"brands"				: "showBrands",
			"currencies"			: "showCurrencies",
			"discounts"	    		: "showDiscounts",
			"prices"		    	: "showPrices",
			"examples"				: "examples"

		},
		index: function () {
            $('.contentContainer > div').css('display', 'none');
			$('.indexContainer').css('display', 'block');
		},
		showCategories: function () {
            this.routeView({
                toggleContainer: '#categoriesContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#categories']"
            });
            require(["CategoriesController"], function (CategoriesController) {
				var categoriesController = new CategoriesController();
				categoriesController.renderView();
                Spinner.destroy({timeout: 700});
            });
		},
		showProducts: function () {
            this.routeView({
                toggleContainer: '.productsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#products']"
            });
            require(["ProductsController"], function(ProductsController){
                var productsController = new ProductsController();
                productsController.renderView();
                Spinner.destroy({timeout: 700});
            });
		},
        showNewProduct: function() {
            this.routeView({
                toggleContainer: '.newProductsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#products']"
            });
            Spinner.destroy({timeout: 700});
        },
        showNewProductSubTab: function(subTab) {
            this.routeView({
                toggleContainer: '.newProductsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#products']"
            });
            Spinner.destroy();
            $(".subTab").hide();
            $("."+subTab).show(700);
            $(".newProductNav").removeClass("active");
            $(".newProductNav[href='#new_product/" + subTab + "']").addClass("active");
            require(["ckeditor"], function(CKEDITOR){
                CKEDITOR.replace( 'shortSprsificationProduct' );
                CKEDITOR.replace( 'fullSprsificationProduct' );
            });
        },
        showSpecification: function() {
            this.routeView({
                toggleContainer: '.specificationsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#products']"
            });
            require(["SpecificationsController"], function(SpecificationsController){
                var specificationController = new SpecificationsController();
                specificationController.renderView();
                Store.reqres.setHandler("specifications:controller", function(){
                    return this;
                }, specificationController);
            });
            Spinner.destroy({timeout: 700});
        },
		showSliderEdit: function () {
            this.routeView({
                toggleContainer: '.sliderContainer',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#slider']"
            });
			require(["SliderController"], function (SliderController) {
				new SliderController().renderView();
                Spinner.destroy({timeout: 700});
			});
		},
        showBrands: function() {
            this.routeView({
                toggleContainer: '.brandsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#brands']"
            });
            require(["BrandsController"], function (BrandsController) {
                new BrandsController().renderView();
                Spinner.destroy({timeout: 700});
            });
        },
        showCurrencies: function() {
            this.routeView({
                toggleContainer: '.currenciesContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#currencies']"
            });
            require(["CurrenciesController"], function (CurrenciesController) {
                new CurrenciesController().renderView();
                Spinner.destroy({timeout: 700});
            });
        },
        showDiscounts: function() {
            this.routeView({
                toggleContainer: '.discountsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#discounts']"
            });
            Spinner.destroy({timeout: 700});
        },
        showPrices: function() {
            this.routeView({
                toggleContainer: '.pricesContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#prices']"
            });
            require(["PricesController"], function (PricesController) {
                var pricesController =  new PricesController();
                pricesController.renderView();
                Spinner.destroy({timeout: 700});
                Store.reqres.setHandler("prices:controller", function(){
                    return this;
                }, pricesController);
            });
        },
        examples: function () {
            this.routeView({
                toggleContainer: '.exampleWidgets',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#examples']"
            });
            Spinner.destroy({timeout: 700});
        },
        routeView: function(options) {
            Spinner.initialize(options.toggleContainer);
            $('.contentContainer > div').css('display', 'none');
            $(options.toggleContainer).css('display', 'block');
            var idCollapse = $(options.selectorTab).attr("href");
            if(!$(idCollapse).hasClass('in')) {
                $(".leftNav").removeClass('active');
                $(options.selectorTab).trigger('click');
                $(options.selectorBtn).addClass('active');
            }
        }
	});
	return StoreRouter;
});
