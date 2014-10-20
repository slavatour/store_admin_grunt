define([
    "marionette",
    "Store",
    "PriceModel",
    "PricesCollection",
    "PriceModelView",
    "PricesCollectionView"
], function (Marionette, Store, PriceModel, PricesCollection, PriceModelView, PricesCollectionView) {

    Store.module("Prices.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
        Controllers.PricesController = Marionette.Controller.extend({
            initialize: function () {
                this.priceModel = new PriceModel();
                this.pricesCollection = new PricesCollection({
                    model: this.priceModel
                });
                this.priceModelView = new PriceModelView({
                    model: this.priceModel
                });
                this.pricesCollectionView = new PricesCollectionView({
                    collection: this.pricesCollection
                });
                Store.reqres.setHandler("prices:collection", function(){
                    return this.pricesCollection;
                }, this);
                Store.reqres.setHandler("prices:collectionView", function(){
                    return this.pricesCollectionView;
                }, this);
            },
            renderView: function () {
                var that = this;
                this.pricesCollection.fetch({
                    success: function() {
                        Store.pricesRegion.show(that.pricesCollectionView);
                    }
                });
            }
        });
    });
    return Store.Prices.Controllers.PricesController;
});