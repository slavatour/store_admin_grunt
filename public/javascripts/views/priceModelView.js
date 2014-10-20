define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Prices.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.PriceModelView = Backbone.Marionette.ItemView.extend({
            template: "#pricesModelTemplate",
            tagName: "tr"
        });
    });

    return Store.Prices.Views.PriceModelView;
});