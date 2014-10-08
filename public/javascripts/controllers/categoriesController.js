define([
		"marionette",
		"Store",
		"CategoryModel",
		"CategoriesCollection",
		"CategoryModelView",
		"CategoryCollectionView"
		], function (Marionette, Store, CategoryModel, CategoriesCollection, CategoryModelView, CategoryCollectionView) {

	Store.module("Categories.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.CategoriesController = Marionette.Controller.extend({
			initialize: function () {
				this.categoryModel = new CategoryModel();
				this.categoriesCollection = new CategoriesCollection({
					model: this.categoryModel
				});
				this.categoryModelView = new CategoryModelView({
					model: this.categoryModel
				});
				this.categoriesCollectionView = new CategoryCollectionView({
					collection: this.categoriesCollection
				});
				Store.reqres.setHandler("category:model", function () {
					return this.categoryModel;
				},this);
				Store.reqres.setHandler("category:collection", function () {
					return this.categoriesCollection;
				},this);
				Store.reqres.setHandler("category:modelView", function () {
					return this.categoryModelView;
				},this);
				Store.reqres.setHandler("category:collectionView", function () {
					return this.categoriesCollectionView;
				},this);
			},
			renderView: function () {
                var that = this;
				this.categoriesCollection.fetch({
                    success: function() {
                        Store.categoriesRegion.show(that.categoriesCollectionView);
                    }
                });
			}
		});
	});
	return Store.Categories.Controllers.CategoriesController;
});