define(["marionette", "Store", "BrandModelView"], function (Marionette, Store, BrandModelView) {

    Store.module("Brands.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.BrandsCollectionlView = Backbone.Marionette.CompositeView.extend({
            template: "#brandsCollectionTemplate",
            childView: BrandModelView,
            childViewContainer: ".brandsContainerView",
            initialize: function() {

            }
        });
    });

    return Store.Brands.Views.BrandsCollectionlView;
});