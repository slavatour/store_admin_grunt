define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Currencies.Models", function(Models, Store, Backbone, Marionette, $, _){
        Models.CurrencyHistoryModel = Backbone.Model.extend({
            defaults: {
                currency_history_id: null,
                currency_history_date_update: null,
                currency_history_value: null,
                currency_history_difference: null,
                currency_literal_code: null
            },
            urlRoot: "currencyHistory",
            initialize: function() {
                //initialize backbone-computedfields lib
                this.computedFields = new Backbone.ComputedFields(this);
                this.id = this.get("id");
            },
            computed: {
                local_history_last_update_date: {
                    depends: ["currency_history_date_update"],
                    toJSON: true,
                    get: function(fields) {
                        return moment.unix(fields.currency_history_date_update).locale(window.navigator.language).format("L");
                    }
                }
            }
        });
    });

    return Store.Currencies.Models.CurrencyHistoryModel;
});