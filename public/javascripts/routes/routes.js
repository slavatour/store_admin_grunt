define(["marionette"], function (Marionette) {
	var StoreRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"" 						: "index",
			"/" 					: "index",
			"categories" 			: "showCategories",
			"products" 				: "showProducts",
			"slider"				: "showSliderEdit"

		},
		index: function () {
            $('.contentContainer > div').css('display', 'none');
			$('.indexContainer').css('display', 'block');
		},
		showCategories: function () {
			$('.contentContainer > div').css('display', 'none');
            $('#categoriesContainer').fadeIn();
            $('#tabProducts').trigger('click');
            $('a[href="#products"]').trigger('click');
            require(["CategoriesController"], function (CategoriesController) {
				var categoriesController = new CategoriesController();
				categoriesController.renderView();
			});
			
		},
		showProducts: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.productsContainer').css('display', 'block');
            $('#tabProducts').trigger('click');
            require(["ProductsController"], function(ProductsController){
                var productsController = new ProductsController();
                productsController.renderView();
            });
		},
		showSliderEdit: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.sliderContainer').css('display', 'block');
            $('#tabOther').trigger('click');
			require(["SliderController"], function (SliderController) {
				new SliderController().renderView();
			});
		}
	});
	return StoreRouter;
});
