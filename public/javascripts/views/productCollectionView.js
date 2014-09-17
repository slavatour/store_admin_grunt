define(["Store", "marionette", "views/spinnerView"], function (Store, Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductsCollectionView = Backbone.Marionette.CompositeView.extend({
			template: "#productsCollectionTemplate",
            childView: Store.Products.Views.ProductModelView,
            childViewContainer: ".productsContainerView",
            onRender: function(){

            }
		});
	});
    return Store.Products.Views.ProductsCollectionView;
});