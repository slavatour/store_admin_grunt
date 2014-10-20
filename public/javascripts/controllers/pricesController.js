define([
    "marionette",
    "Store",
    "PriceModel",
    "PricesCollection",
    "PriceModelView",
    "PricesCollectionView",
    "PricesChartModelView"
], function (
    Marionette,
    Store,
    PriceModel,
    PricesCollection,
    PriceModelView,
    PricesCollectionView,
    PricesChartModelView) {

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
                this.pricesChartModelView = new PricesChartModelView();
                Store.reqres.setHandler("prices:collection", function(){
                    return this.pricesCollection;
                }, this);
                Store.reqres.setHandler("prices:collectionView", function(){
                    return this.pricesCollectionView;
                }, this);
                Store.reqres.setHandler("prices:chart", function(){
                    return this.pricesChartModelView;
                }, this);
            },
            renderView: function () {
                var that = this;
                this.pricesCollection.fetch({
                    success: function(data) {
                        Store.pricesRegion.show(that.pricesCollectionView);
                        that.pricesChartModelView.model = that.setChartModel(data);
                        Store.pricesChartRegion.show(that.pricesChartModelView);
                    }
                });
            },
            setChartModel: function(collection) {
                console.log(collection.toJSON());
                var labels = _.pluck(collection.toJSON(), "price_name");
                var prices = _.pluck(collection.toJSON(), "price_value");
                var model = Backbone.Model.extend({
                    defaults: {
                        labels: labels,
                        data: prices
                    }
                });
                return new model();
            }
        });
    });
    return Store.Prices.Controllers.PricesController;
});