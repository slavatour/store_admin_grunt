$(document).ready(function () {
	
	Store.module("Products.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.ProductsController = Marionette.Controller.extend({
			initialize: function () {
				var this.productModel = new Store.Products.Models.ProductModel();
				var this.productsCollection = new Store.Products.Collections.ProductsCollection({
					model: this.productModel
				});
				var this.productModelView = new Store.Products.Views.ProductModelView({
					model: this.productModel
				});
				var this.productsCollectionView = new Store.Products.Views.ProductsCollectionView({
					collection: this.productsCollection
				});
			},
			renderView: function () {
				
			}
		});
	});

});