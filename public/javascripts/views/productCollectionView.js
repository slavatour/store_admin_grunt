$(document).ready(function () {
	
	Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductsCollectionView = Backbone.Marionette.CompositeView.extend({
			template: "#productsCollectionTemplate",
			itemView: Store.Products.Views.ProductModelView,
			itemViewContainer: ".productsContainerView"
		});
	});

});