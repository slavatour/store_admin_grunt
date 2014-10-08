define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Currencies.Models", function(Models, Store, Backbone, Marionette, $, _){
        Models.CurrencyModel = Backbone.Model.extend({
            defaults: {
                currency_id: null,
                currency_country: null,
                currency_literal_code: null,
                currency_numeric_code: null,
                currency_value: null,
                currency_default: null,
                currency_last_update: null
            },
            urlRoot: "currency"
        });
    });

    return Store.Currencies.Models.CurrencyModel;
});