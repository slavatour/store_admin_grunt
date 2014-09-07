define([
		"marionette",
		"Store",
		"SubcategoryModel",
		"SubcategoriesCollection",
		"SubcategoryModelView",
		"SubcategoriesCollectionView"
		], function (Marionette, Store, SubcategoryModel, SubcategoriesCollection, SubcategoryModelView, SubcategoriesCollectionView) {
	
	Store.module("Categories.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.SubcategoriesController = Marionette.Controller.extend({
			initialize: function () {
				this.subcategoryModel = new SubcategoryModel();
				this.subcategoryCollection = new SubcategoriesCollection({
					model: this.subcategoryModel
				});
				this.subcategoryModelView = new SubcategoryModelView({
					model: this.subcategoryModel
				});
				this.subcategoryCollectionView = new SubcategoriesCollectionView({
					collection: this.subcategoryCollection
				});
				Store.reqres.setHandler("subcategory:model", function () {
					return this.subcategoryModel
				}, this);
				Store.reqres.setHandler("subcategory:collection", function () {
					return this.subcategoryCollection
				}, this);
				Store.reqres.setHandler("subcategory:modelView", function () {
					return this.subcategoryModelView
				}, this);
				Store.reqres.setHandler("subcategory:collectionView", function () {
					return this.subcategoryCollectionView
				}, this);
			},
			fetchCollection: function (id, callbackFunction) {
//				this.subcategoryCollection.url = "/subcategories/parent_id/"+id;
				this.subcategoryCollection.fetch({
					success: function (data) {
						callbackFunction(data);
					}
				});
			}
		});

	});
	return Store.Categories.Controllers.SubcategoriesController;
});