define([
		"marionette", 
		"SliderModel", 
		"SlidersCollection",
		"SliderModelView",
		"SlidersCollectionView"
		], function (Marionette, SliderModel, SlidersCollection, SliderModelView, SlidersCollectionView) {
	
	Store.module("Slider.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.SliderController = Marionette.Controller.extend({
			initialize: function () {
				this.sliderModel = new SliderModel();
				this.slidersCollection = new SlidersCollection({
					model: this.sliderModel
				});
				this.sliderModelView = new SliderModelView({
					model: this.sliderModel
				});
				this.slidersCollectionView = new SlidersCollectionView({
					collection: this.slidersCollection
				});
				Store.reqres.setHandler("slider:model", function () {
					return this.sliderModel;
				},this);
				Store.reqres.setHandler("slider:collection", function () {
					return this.slidersCollection;
				},this);
				Store.reqres.setHandler("slider:modelView", function () {
					return this.sliderModelView;
				},this);
				Store.reqres.setHandler("slider:collectionView", function () {
					return this.slidersCollectionView;
				},this);
			},
			renderView: function () {
                var that = this;
				this.slidersCollection.fetch({
                    success: function (data) {
                        console.log(data);
                        that.slidersCollection.sort();
                        setTimeout(function(){
                            Store.sliderRegion.show(that.slidersCollectionView);
                        }, 2000);
                    }
                });
			}
			
		});
	});
	return Store.Slider.Controllers.SliderController;
});	