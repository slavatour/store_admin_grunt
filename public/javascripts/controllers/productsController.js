define([
    "Store",
    "marionette",
    "ProductModel",
    "ProductsCollection",
    "ProductModelView",
    "ProductsCollectionView"
    ], function (Store, Marionette, ProductModel, ProductsCollection, ProductModelView, ProductsCollectionView) {

    Store.module("Products.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.ProductsController = Marionette.Controller.extend({
			initialize: function () {
				this.productModel = new ProductModel();
				this.productsCollection = new ProductsCollection({
					model: this.productModel
				});
				this.productModelView = new ProductModelView({
					model: this.productModel
				});
				this.productsCollectionView = new ProductsCollectionView({
					collection: this.productsCollection
				});
			},
			renderView: function () {
                var that = this;
                this.productsCollection.fetch({
                    success: function (data) {
                        that.productsCollection.sort();
                        Store.productsRegion.show(that.productsCollectionView);
                    }
                });
			}
		});
	});
    return Store.Products.Controllers.ProductsController;
});