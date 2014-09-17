define(["Store", "marionette", "views/spinnerView", "//code.jquery.com/ui/1.11.1/jquery-ui.js"], function (Store, Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductsCollectionView = Backbone.Marionette.CompositeView.extend({
			template: "#productsCollectionTemplate",
            childView: Store.Products.Views.ProductModelView,
            childViewContainer: ".productsContainerView",
            onRender: function(){
                $(function() {
                    $( "#sortable" ).sortable({
                        placeholder: "ui-state-highlight"
                    });
                    $( "#sortable" ).disableSelection();
                });
            }
		});
	});
    return Store.Products.Views.ProductsCollectionView;
});