define(["marionette", "Store", "BrandModelView", "views/spinnerView"], function (Marionette, Store, BrandModelView, Spinner) {

    Store.module("Brands.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.BrandsCollectionlView = Backbone.Marionette.CompositeView.extend({
            template: "#brandsCollectionTemplate",
            childView: BrandModelView,
            childViewContainer: ".brandsContainerView",
            events: {
                "click .addNewCurrency": "openNewBrandModal"
            },
            initialize: function() {
                Spinner.initialize(".brandsTable");
            },
            openNewBrandModal: function(event) {
                require(["BrandModel", "ModalBrandsView"], function(BrandModel, ModalBrandsView){
                    var modalBrandsView = new ModalBrandsView({
                        template: "#modalAddBrand",
                        model: new BrandModel()
                    });
                    Store.modalRegionBrands.show(modalBrandsView);
                });
            }
        });
    });

    return Store.Brands.Views.BrandsCollectionlView;
});