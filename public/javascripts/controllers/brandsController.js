define([
    "marionette",
    "Store",
    "BrandModel",
    "BrandsCollection",
    "BrandModelView",
    "BrandsCollectionView"
], function (Marionette, Store, BrandModel, BrandsCollection, BrandModelView, BrandsCollectionView) {

    Store.module("Brands.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
        Controllers.BrandsController = Marionette.Controller.extend({
            initialize: function () {
                this.brandModel = new BrandModel();
                this.brandsCollection = new BrandsCollection({
                    model: this.brandModel
                });
                this.brandModelView = new BrandModelView({
                    model: this.brandModel
                });
                this.brandsCollectionView = new BrandsCollectionView({
                    collection: this.brandsCollection
                });
                Store.reqres.setHandler("brands:collection", function(){
                    return this.brandsCollection;
                }, this);
            },
            renderView: function () {
                var that = this;
                this.brandsCollection.fetch({
                    success: function() {
                        Store.brandsRegion.show(that.brandsCollectionView);
                    }
                });
            }
        });
    });
    return Store.Brands.Controllers.BrandsController;
});