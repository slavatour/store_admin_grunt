define(["marionette", "Store", "SubcategoriesController"], function (Marionette, Store, SubcategoriesController) {

	Store.module("Categories.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.CategoryModel = Backbone.Model.extend({
			urlRoot: "category",
			defaults: {
				id: null,
				name: "noname",
				serial_number: null,
				subcategories: null
			},
			initialize: function () {
				this.id = this.get('id');
				var that = this;
				var subcategoriesController = new SubcategoriesController();
				var fetchedSubcat = subcategoriesController.fetchCollection(this.get('id'), function (collection) {
					that.setSubcategories(collection.models);
				});
			},
			setSubcategories: function (subcategoriesArray) {
				var subcategoriesCollection = Store.request("subcategory:collection");
				subcategoriesCollection.reset(subcategoriesArray);
				this.set("subcategories", subcategoriesCollection);
			},
			getSubcategories: function () {
				return this.get("subcategories");
			}
		});
	});
	return Store.Categories.Models.CategoryModel;
});