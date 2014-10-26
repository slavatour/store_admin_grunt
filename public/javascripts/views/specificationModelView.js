define(["Store", "marionette", "views/spinnerView"], function (Store, Marionette, Spinner) {

    Store.module("Specifications.Views", function (Views, Store, Backbone, Marionette, $, _) {
        Views.SpecificationModelView = Backbone.Marionette.ItemView.extend({
            template: "#specificationsModelView"
        });
    });
    return Store.Specifications.Views.SpecificationModelView;
});