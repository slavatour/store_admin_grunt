define([
    "marionette",
    "Store",
    "PriceModelView",
    "views/spinnerView"
    ], function (
    Marionette,
    Store,
    PriceModelView,
    Spinner
    ) {

    Store.module("Prices.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.PricesCollectionlView = Backbone.Marionette.CompositeView.extend({
            template: "#pricesCollectionTemplate",
            childView: PriceModelView,
            childViewContainer: ".priceModelsContainer",
            className: "panel panel-default",
            events: {
                "click .addNewPrice": "openModalNewPrice"
            },
            openModalNewPrice: function(event) {
                require(["PriceModel", "ModalPricesView"], function(PriceModel, ModalPricesView){
                    var modalPricesView = new ModalPricesView({
                        template: "#pricesModalTemplate",
                        model: new PriceModel()
                    });
                    Store.modalRegionPrices.show(modalPricesView);
                });
            }
        });
    });

    return Store.Prices.Views.PricesCollectionlView;
});