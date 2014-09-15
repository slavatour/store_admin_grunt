define(["marionette", "views/spinnerView"], function (Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductsCollectionView = Backbone.Marionette.CompositeView.extend({
			template: "#productsCollectionTemplate",
            childView: Store.Products.Views.ProductModelView,
            childViewContainer: ".productsContainerView"
		});
	});
    return Store.Products.Views.ProductsCollectionView;
});