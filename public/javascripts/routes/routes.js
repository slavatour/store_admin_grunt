define(["marionette"], function (Marionette) {
	var StoreRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"" 						: "index",
			"/" 					: "index",
			"categories" 			: "showCategories",
			"products" 				: "showProducts",
			"slider"				: "showSliderEdit",
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
            });
		},
		showSliderEdit: function () {
            this.routeView({
                toggleContainer: '.sliderContainer',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#slider']"
            });
			require(["SliderController"], function (SliderController) {
				new SliderController().renderView();
			});
		},
        examples: function () {
            this.routeView({
                toggleContainer: '.exampleWidgets',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#examples']"
            });
        },
        routeView: function(options) {
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
