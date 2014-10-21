define([
    "marionette",
    "Store",
    "PriceModel",
    "PricesCollection",
    "PriceModelView",
    "PricesCollectionView",
    "PricesChartModelView",
    "PriceRulesModel",
    "PriceRulesModelView"
], function (
    Marionette,
    Store,
    PriceModel,
    PricesCollection,
    PriceModelView,
    PricesCollectionView,
    PricesChartModelView,
    PriceRulesModel,
    PriceRulesModelView) {

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

                this.priceRulesModel = new PriceRulesModel();
                this.priceRulesModelView = new PriceRulesModelView({
                    model: this.priceRulesModel
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
                that.renderPriceRules();
                this.pricesCollection.fetch({
                    success: function(data) {
                        Store.pricesRegion.show(that.pricesCollectionView);
                        that.buildChart(data);
                    }
                });
            },
            rerenderView: function() {
                var that = this;
                this.pricesCollection.fetch({
                    success: function(data) {
                        that.pricesCollectionView.render();
                        that.buildChart(data);
                    }
                });
            },
            buildChart: function(data) {
                this.pricesChartModelView = new PricesChartModelView();
                this.pricesChartModelView.model = this.setChartModel(data);
                Store.pricesChartRegion.show(this.pricesChartModelView);
            },
            renderPriceRules: function() {
                var that = this;
                that.priceRulesModel.fetch({
                    success: function() {
                        Store.priceRulesRegion.show(that.priceRulesModelView);
                    }
                });
            },
            rerenderPriceRules: function() {
                var that = this;
                that.priceRulesModel.fetch({
                    success: function() {
                        that.priceRulesModelView.render();
                    }
                });
            },
            setChartModel: function(collection) {
                var labels = _.pluck(collection.toJSON(), "price_name");
                var prices = _.map(_.pluck(collection.toJSON(), "price_value"), function(num){
                    if(num == null) {
                        return 1;
                    } else {
                        return num;
                    }
                });
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