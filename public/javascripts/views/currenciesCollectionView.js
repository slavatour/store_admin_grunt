define(["marionette", "Store", "CurrencyModelView"], function (Marionette, Store, CurrencyModelView) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.CurrenciesCollectionView = Backbone.Marionette.CompositeView.extend({
            template: "#currenciesCollectionTemplate",
            childView: CurrencyModelView,
            childViewContainer: ".currencyModelsContainer",
            className: "panel panel-default subPanel"
        });
    });

    return Store.Currencies.Views.CurrenciesCollectionView;
});