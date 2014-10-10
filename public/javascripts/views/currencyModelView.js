define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.CurrencyModelView = Backbone.Marionette.ItemView.extend({
            template: "#currencyModelTemplate",
            tagName: "tr",
            events: {
                "click .deleteCurrency": "deleteCurrency"
            },
            deleteCurrency: function() {
                var that = this;
                this.model.destroy({
                    wait: true,
                    error: function(model, xhr, options) {
                        require(["AlertsController"], function(AlertsController){
                            var msg = "Could't delete currency, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: ".currenciesContainer",
                                message: msg
                            });
                        });

                    }
                });
            }
        });
    });

    return Store.Currencies.Views.CurrencyModelView;
});