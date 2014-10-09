define([
    "marionette",
    "Store",
    "CurrencyModel",
    "CurrencyHistoryModel",
    "CurrenciesCollection",
    "CurrenciesHistoryCollection",
    "CurrencyModelView",
    "CurrencyHistoryModelView",
    "CurrenciesCollectionView",
    "CurrenciesHistoryCollectionView"
    ], function (
    Marionette,
    Store,
    CurrencyModel,
    CurrencyHistoryModel,
    CurrenciesCollection,
    CurrenciesHistoryCollection,
    CurrencyModelView,
    CurrencyHistoryModelView,
    CurrenciesCollectionView,
    CurrenciesHistoryCollectionView) {

    Store.module("Currencies.Controllers", function(Controllers, Store, Backbone, Marionette, $, _){
        Controllers.CurrenciesController = Marionette.Controller.extend({
            initialize: function() {
                this.currencyModel = new CurrencyModel();
                this.currenciesCollection = new CurrenciesCollection({
                    model: this.currencyModel
                });
                this.currencyModelView = new CurrencyModelView({
                    model: this.currencyModel
                });
                this.currenciesCollectionView = new CurrenciesCollectionView({
                    collection: this.currenciesCollection
                });
                this.currencyHistoryModel = new CurrencyHistoryModel();
                this.currenciesHistoryCollection = new CurrenciesHistoryCollection({
                    model: this.currencyHistoryModel
                });
                this.currencyHistoryModelView = new CurrencyHistoryModelView({
                    model: this.currencyHistoryModel
                });
                this.currenciesHistoryCollectionView = new CurrenciesHistoryCollectionView({
                    collection: this.currenciesHistoryCollection
                });
                Store.reqres.setHandler("currencies:collection", function() {
                    return this.currenciesCollection;
                }, this);
                Store.reqres.setHandler("currencies:collectionView", function() {
                    return this.currenciesCollectionView;
                }, this);

            },
            renderView: function() {
                var that = this;
                that.currenciesCollection.fetch({
                    success: function(data) {
                        Store.currenciesRegion.show(that.currenciesCollectionView);
                    }
                });
                that.currenciesHistoryCollection.fetch({
                    success: function(data) {
                        Store.currenciesHistoryRegion.show(that.currenciesHistoryCollectionView);
                    }
                });
            }
        });
    });

    return Store.Currencies.Controllers.CurrenciesController;
});