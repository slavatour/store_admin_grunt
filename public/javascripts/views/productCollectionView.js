define(["Store", "marionette", "views/spinnerView", "jquery", "jqueryUi"], function (Store, Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductsCollectionView = Backbone.Marionette.CompositeView.extend({
			template: "#productsCollectionTemplate",
            childView: Store.Products.Views.ProductModelView,
            childViewContainer: ".productsContainerView",
            onShow: function(){
                //initialize jquery UI sortable for products table
                this.initSortableCells();
            },
            initSortableCells: function() {
                $("#sortable").sortable({
                    placeholder: "ui-state-highlight",
                    axis: "y",
                    revert: true
                });
                $("#sortable").disableSelection();
            }
		});
	});
    return Store.Products.Views.ProductsCollectionView;
});