define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Products.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.ProductNewModel = Backbone.Model.extend({
			defaults: {
                categories: null,
                brands: null,
                specifications: null,
                discounts: null,
                stocks: null,
                suppliers: null
			},
            urlRoot: "newProduct"
		});
	});
    return Store.Products.Models.ProductNewModel;
});
