define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.CurrencyModelView = Backbone.Marionette.ItemView.extend({
            template: "#currencyModelTemplate",
            tagName: "tr",
            events: {
                "click .deleteCurrency": "deleteCurrency",
                "dblclick .editable": "editParameter",
                "click .editModalCurrency": "openModalEditCurrency"
            },
            deleteCurrency: function() {
                if(!confirm("You want delete currency with history. Are you sure?")) {
                    return;
                }
                var that = this;
                this.model.destroy({
                    wait: true,
                    success: function() {
                        Store.request("categoryHistory:collection").fetch();
//                        Store.request("currenciesHistory:collectionView").render();
                    },
                    error: function(model, xhr, options) {
                        require(["AlertsController"], function(AlertsController){
                            var msg = "Could't delete currency, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: ".currenciesContainer",
                                message: msg
                            });
                        });

                    }
                });
            },
            openModalEditCurrency: function() {
                var that = this;
                require(["ModalCurrencyView"], function(ModalCurrencyView) {
                    var modalCurrencyView = new ModalCurrencyView({
                        template: "#modalEditCurrency",
                        model: that.model
                    });
                    Store.modalRegionCurrency.show(modalCurrencyView);
                });
            }
        });
    });

    return Store.Currencies.Views.CurrencyModelView;
});