define(["marionette", "SliderModel"], function (Marionette, SliderModel) {
	
	Store.module("Slider.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
		Collections.SlidersCollection = Backbone.Collection.extend({
			model: SliderModel,
			url: "slider",
            //sort collection
			comparator: function (modelA, modelB) {
				if(1*modelA.get('number') > 1*modelB.get('number')) {
					return 1;
				} else {
					return -1;
				}
			}
		});
	});
	return Store.Slider.Collections.SlidersCollection;
});