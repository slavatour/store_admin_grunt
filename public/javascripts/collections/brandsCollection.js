define(["marionette", "Store", "BrandModel"], function (Marionette, Store, BrandModel) {

    Store.module("Brands.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
        Collections.BrandsCollection = Backbone.Collection.extend({
            model: BrandModel,
            url: "brands",
            initialize: function () {
                // console.log("cat", this);
            }
        });
    });

    return Store.Brands.Collections.BrandsCollection;
});