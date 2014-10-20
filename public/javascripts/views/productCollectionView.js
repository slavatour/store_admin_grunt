define(["Store", "marionette", "views/spinnerView", "jquery", "jqueryui/sortable"], function (Store, Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductsCollectionView = Backbone.Marionette.CompositeView.extend({
			template: "#productsCollectionTemplate",
            childView: Store.Products.Views.ProductModelView,
            childViewContainer: ".productsContainerView",
            events: {
                "click .addNewProduct": "openModalNewProduct"
            },
            onShow: function(){
                //initialize jquery UI sortable for products table
                this.initSortableCells();
            },
            initSortableCells: function() {
                $("#sortable").sortable({
                    placeholder: "ui-state-highlight",
                    axis: "y",
                    revert: true,
                    opacity: 0.7,
                    cursor: "move",
                    handle: ".sortableSelector"
                });
                $("#sortable").disableSelection();
            },
            openModalNewProduct: function() {
                require(["ProductModel", "modalPricesView"], function(ProductModel, ModalProductsView){
                    var modalProductsView = new ModalProductsView({
                        template: "#modalProductNew",
                        model: new ProductModel()
                    });
                    Store.modalRegionProducts.show(modalProductsView);
                });
            }
		});
	});
    return Store.Products.Views.ProductsCollectionView;
});