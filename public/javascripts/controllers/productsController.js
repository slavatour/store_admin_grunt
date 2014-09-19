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
                        console.log(data);
                        that.productsCollection.sort();
                        setTimeout(function(){
                            Store.productsRegion.show(that.productsCollectionView);
                        }, 2000);
                    }
                });
			}
		});
	});
    return Store.Products.Controllers.ProductsController;
});