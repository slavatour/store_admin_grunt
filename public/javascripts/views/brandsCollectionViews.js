define(["marionette", "Store", "BrandModelView", "views/spinnerView"], function (Marionette, Store, BrandModelView, Spinner) {

    Store.module("Brands.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.BrandsCollectionlView = Backbone.Marionette.CompositeView.extend({
            template: "#brandsCollectionTemplate",
            childView: BrandModelView,
            childViewContainer: ".brandsContainerView",
            initialize: function() {
                Spinner.initialize(".brandsContainer");
            }
        });
    });

    return Store.Brands.Views.BrandsCollectionlView;
});