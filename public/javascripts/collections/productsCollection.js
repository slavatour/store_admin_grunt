$(document).ready(function () {

	Store.module("Products.Collections", function (Collections, Store, Marionette, $, _) {
		Collections.ProductsCollection = Backbone.Collection.extend({
			model: Store.Models.ProductModel
		});
	});

});