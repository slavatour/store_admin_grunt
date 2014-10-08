define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.CurrencyModelView = Backbone.Marionette.ItemView.extend({
            template: "#currencyModelTemplate",
            tagName: "tr"
        });
    });

    return Store.Currencies.Views.CurrencyModelView;
});