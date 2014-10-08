define(["marionette", "Store", "CurrencyHistoryModel"], function (Marionette, Store, CurrencyHistoryModel) {

    Store.module("Currencies.Collections", function(Collections, Store, Backbone, Marionette, $, _){
        Collections.CurrenciesHistoryCollectionCollection = Backbone.Collection.extend({
            model: CurrencyHistoryModel,
            url: "currenciesHistory"
        });
    });

    return Store.Currencies.Collections.CurrenciesHistoryCollectionCollection;
});