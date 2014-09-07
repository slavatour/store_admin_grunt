define(["marionette", "Store", "CategoryModel"], function (Marionette, Store, CategoryModel) {

	Store.module("Categories.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
		Collections.CategoriesCollection = Backbone.Collection.extend({
			model: CategoryModel,
			url: "categories",
			initialize: function () {
				// console.log("cat", this);
			}
		});
	});
	return Store.Categories.Collections.CategoriesCollection;
});