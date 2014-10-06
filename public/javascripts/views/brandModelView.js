define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Brands.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.BrandModelView = Backbone.Marionette.ItemView.extend({
            template: "#brandtModelTemplate",
            tagName: "tr"
        });
    });

    return Store.Brands.Views.BrandModelView;
});