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
                "change:slider_position_in_list": "changeNumber",
                "change": "changeCollection"
			},
            initialize: function () {
                Spinner.initialize(".sliderContainer");
            },
            onBeforeRenderTemplate: function () {

            },
            onRender: function () {

            },
            changeCollection: function () {
//                this.render();
            },
			addNewSlider: function (e) {
				var modal = new Store.Common.Views.ModalView({
					template: '#modalNewSlider'
				});
				Store.modalRegion.show(modal);
			},
			changeNumber: function (model) {
				var array = this.collection.toJSON();
				var previousValue = model._previousAttributes.slider_position_in_list;
				var obj = model.toJSON();
				_.each(array, function (value) {
					if(obj.slider_position_in_list == value.slider_position_in_list) {
						if(obj.slider_id != value.slider_id) {
							var difference = (1*previousValue - 1*obj.slider_position_in_list);
							value.slider_position_in_list = 1*value.slider_position_in_list + difference;
						}
					}
				});
				this.collection.reset(array);
				_.each(this.collection.models, function (model) {
					model.save();
				});
			}
		});
	});
	return Store.Slider.Views.SlidersCollectionView;
});