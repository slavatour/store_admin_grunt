define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.CurrencyHistoryModelView = Backbone.Marionette.ItemView.extend({
            template: "#currencyHistoryModelTemplate",
            tagName: "tr"
        });
    });

    return Store.Currencies.Views.CurrencyHistoryModelView;
});