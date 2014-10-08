define(["marionette", "Store", "CurrencyModel"], function (Marionette, Store, CurrencyModel) {

    Store.module("Currencies.Collections", function(Collections, Store, Backbone, Marionette, $, _){
        Collections.CurrenciesCollection = Backbone.Collection.extend({
            model: CurrencyModel,
            url: "currencies"
        });
    });

    return Store.Currencies.Collections.CurrenciesCollection;
});