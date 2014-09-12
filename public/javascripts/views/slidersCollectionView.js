define(["marionette", "SliderModelView", "views/spinnerView"], function (Marionette, SliderModelView, Spinner) {
	
	Store.module("Slider.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SlidersCollectionView = Backbone.Marionette.CompositeView.extend({
			template: '#templateSliderCompositeView',
            childView: Views.SliderModelView,
            childViewContainer: "tbody",
			events: {
				"click .addSliderBtn": "addNewSlider"
			},
			collectionEvents: {
                "change": "changeCollection"
			},
            initialize: function () {
                Spinner.initialize(".sliderContainer");
            },
            changeCollection: function () {
//                this.render();
            },
			addNewSlider: function (e) {
				var modal = new Store.Common.Views.ModalView({
					template: '#modalNewSlider'
				});
				Store.modalRegion.show(modal);
			}
		});
	});
	return Store.Slider.Views.SlidersCollectionView;
});