define(["Store", "marionette", "SpecificationModelView", "views/spinnerView"], function (Store, Marionette, SpecificationModelView, Spinner) {

    Store.module("Specifications.Views", function (Views, Store, Backbone, Marionette, $, _) {
        Views.SpecificationCollectionView = Backbone.Marionette.CompositeView.extend({
            template: "#specificationsCollectionView",
            childView: SpecificationModelView,
            childViewContainer: ".specificationsItemsContainer",
            className: "panel panel-default subPanel"
        });
    });
    return Store.Specifications.Views.SpecificationCollectionView;
});