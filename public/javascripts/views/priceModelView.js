define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Prices.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.PriceModelView = Backbone.Marionette.ItemView.extend({
            template: "#pricesModelTemplate",
            tagName: "tr",
            events: {
                "click .editModalPrice": "openModalEditPrice"
            },
            openModalEditPrice: function(event) {
                var that = this;
                require(["PriceModel", "ModalPricesView"], function(PriceModel, ModalPricesView){
                    var modalPricesView = new ModalPricesView({
                        template: "#pricesEditModalTemplate",
                        model: that.model
                    });
                    Store.modalRegionPrices.show(modalPricesView);
                });
            }
        });
    });

    return Store.Prices.Views.PriceModelView;
});