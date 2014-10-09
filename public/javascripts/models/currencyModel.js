define(["marionette", "Store", "backbone-computedfields"], function (Marionette, Store, Computedfields) {

    Store.module("Currencies.Models", function(Models, Store, Backbone, Marionette, $, _){
        Models.CurrencyModel = Backbone.Model.extend({
            defaults: {
                currency_id: null,
                currency_country: null,
                currency_iso_code: null,
                currency_iso_number_code: null,
                currency_numeric_code: null,
                currency_value: null,
                currency_default: null,
                currency_last_update: null
            },
            urlRoot: "currency",
            initialize: function() {
                //initialize backbone-computedfields lib
                this.computedFields = new Backbone.ComputedFields(this);
            },
            validate: function(attr, options) {
                var invalide = [];
                if(!/^[A-Za-z]+$/.test(attr.currency_country)) {
                    invalide.push("currency_country");
                }
                if(!/^[A-Z]+$/.test(attr.currency_iso_code)) {
                    invalide.push("currency_iso_code");
                }
                if(!/[0-9]{3}/.test(attr.currency_iso_number_code)) {
                    invalide.push("currency_iso_number_code");
                }
                if(!/^(&[#]*[A-Za-z0-9]*;)$/.test(attr.currency_numeric_code)) {
                    invalide.push("currency_numeric_code");
                }
                if(!/^[0-9]*([,.][0-9]*)*$/.test(attr.currency_value)) {
                    invalide.push("currency_value");
                }
                if(invalide.length) {
                    return invalide;
                }
            }
        });
    });

    return Store.Currencies.Models.CurrencyModel;
});