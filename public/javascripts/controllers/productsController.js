define([
    "marionette",
    "ProductModel",
    "ProductsCollection",
    "ProductModelView",
    "ProductsCollectionView"
    ], function (Marionette, ProductModel, ProductsCollection, ProductModelView, ProductsCollectionView) {

    Store.module("Products.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.ProductsController = Marionette.Controller.extend({
			initialize: function () {
                console.log("init");
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
                console.log("render");
                var that = this;
                this.productsCollection.fetch({
                    success: function (data) {
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