define(["marionette", "Store", "SubcategoryModel"], function (Marionette, Store, SubcategoryModel) {

	Store.module("Categories.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
		Collections.SubcategoriesCollection = Backbone.Collection.extend({
			model: SubcategoryModel,
			url: "subcategories",
			initialize: function () {
				// console.log("sub", this);
			}
		});
	});
	return Store.Categories.Collections.SubcategoriesCollection;
});