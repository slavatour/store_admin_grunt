define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Currencies.Models", function(Models, Store, Backbone, Marionette, $, _){
        Models.CurrencyHistoryModel = Backbone.Model.extend({
            defaults: {
                currency_history_id: null,
                currency_history_date_update: null,
                currency_history_value: null,
                currency_history_difference: null
            },
            urlRoot: "currencyHistory"
        });
    });

    return Store.Currencies.Models.CurrencyHistoryModel;
});