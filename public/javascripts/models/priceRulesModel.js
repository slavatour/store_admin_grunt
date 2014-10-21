define(["marionette", "Store", "backbone-computedfields"], function (Marionette, Store, Computedfields) {

    Store.module("Prices.Models", function (Models, Store, Backbone, Marionette, $, _) {
        Models.PriceRulesModel = Backbone.Model.extend({
            defaults: {
                price_rules_base_id: null, //
                price_rules_base_name: null,
                price_rules_base_value: 1,
                price_rules_base_tax: null,
                price_rules_default_id: null,
                price_rules_default_name: null,
                price_rules_default_value: null,
                price_rules_default_tax: null,
                price_rules_integer: null, //
                price_rules_round_to: null //
            },
            url: "/priceRules",
            initialize: function() {
//                this.id = this.get('id');
            }
        });
    });

    return Store.Prices.Models.PriceRulesModel;
});