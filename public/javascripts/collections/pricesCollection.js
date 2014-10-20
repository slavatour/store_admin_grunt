define(["marionette", "Store", "PriceModel"], function (Marionette, Store, PriceModel) {

    Store.module("Prices.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
        Collections.PricesCollection = Backbone.Collection.extend({
            model: PriceModel,
            url: "prices",
            initialize: function () {
                // console.log("cat", this);
            }
        });
    });
    return Store.Prices.Collections.PricesCollection;
});