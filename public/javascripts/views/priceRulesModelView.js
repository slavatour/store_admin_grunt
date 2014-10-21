define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Prices.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.PriceRulesModelView = Backbone.Marionette.ItemView.extend({
            template: "#pricesRulesTemplate",
            tagName: "div",
            className: "panel panel-default",
            events: {
                "click .radioRules": "radioChange",
                "change .coinsRound": "radioChange",
                "click .savePricesRules": "savePricesRules"
            },
            onShow: function() {
                $(".tooltipHas").tooltip();
            },
            radioChange: function(event) {
                var selector = $(".radioRules:checked").attr("data-targer-input");
                $("select").prop("disabled", true);
                $("." + selector).prop("disabled", false);
                $(".savePricesRules").removeClass("disabled");
            },
            savePricesRules: function(event) {
                event.preventDefault();
                var that = this,
                    select = $(".coinsRound:enabled"),
                    integer = select.attr("data-integer"),
                    round = select.find("option:selected").attr("data-value");
                this.model.save({
                    price_rules_integer: integer,
                    price_rules_round_to: round
                }, {
                    wait: true,
                    success: function() {
                        Store.request("prices:controller").rerenderPriceRules();
                    },
                    error: function() {
                        require(["AlertsController"], function(AlertsController){
                            var msg = "Server could not save rules, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: ".priceRules",
                                message: msg
                            });
                        });
                    }
                });
            }
        });
    });

    return Store.Prices.Views.PriceRulesModelView;
});