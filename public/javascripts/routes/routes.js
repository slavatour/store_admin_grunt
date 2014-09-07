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
			require(["CategoriesController"], function (CategoriesController) {
				var categoriesController = new CategoriesController();
				categoriesController.renderView();
			});
			
		},
		showProducts: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.productsContainer').css('display', 'block');
            require(['views/spinnerView'], function(Spinner){
                new Spinner.initialize('.productsContainer');
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
