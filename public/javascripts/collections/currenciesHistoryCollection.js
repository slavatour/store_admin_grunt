define(["marionette", "Store", "CurrencyHistoryModel", "moment"], function (Marionette, Store, CurrencyHistoryModel, moment) {

    Store.module("Currencies.Collections", function(Collections, Store, Backbone, Marionette, $, _){
        Collections.CurrenciesHistoryCollectionCollection = Backbone.Collection.extend({
            model: CurrencyHistoryModel,
            url: "currenciesHistory",
            defaults: {
                endDate: moment().endOf('day').format("X"),
                startDate: moment().add(-1, "month").startOf('day').format("X"),
                currency_id: "All",
                uniq_iso: null
            },
            initialize: function() {
                this.setUrl();
            },
            setUrl: function() {
                this.url = "currenciesHistory" + "/" + this.defaults.startDate + "/" + this.defaults.endDate + "/" + this.defaults.currency_id;
                return this;
            }
        });
    });

    return Store.Currencies.Collections.CurrenciesHistoryCollectionCollection;
});