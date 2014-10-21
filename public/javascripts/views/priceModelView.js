define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Prices.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.PriceModelView = Backbone.Marionette.ItemView.extend({
            template: "#pricesModelTemplate",
            tagName: "tr",
            events: {
                "click .editModalPrice": "openModalEditPrice",
                "click .copyPrice": "copyPrice",
                "click .deletePrice": "deletePrice",
                "change .priceDefault": "saveChanges",
                "click .includeTaxes": "saveChanges"
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
            },
            copyPrice: function() {
                var newModel = this.model.clone();
                newModel.set("id", null);
                newModel.set("parent_id", null);
                newModel.id = null;
                this.saveModel(newModel);
            },
            saveChanges: function(event) {
                event.preventDefault();
                var element = $(event.target),
                    attr = element.attr("name"),
                    value = element.prop("checked");
                console.log(attr, value);
                element.prop("checked", true);
            },
            deletePrice: function() {
                if(!confirm("You want delete price. Are you sure?")) {
                    return;
                }
                var that = this;
                this.model.destroy({
                    wait: true,
                    success: function() {
                        Spinner.initialize(".pricesContainer");
                        Store.request("prices:collection").fetch({
                            success: function() {
                                Store.request("prices:controller").rerenderView();
                                $("#pricesModal").modal("hide");
                                Spinner.destroy({timeout: 700});
                            }
                        });
                    },
                    error: function(model, xhr, options) {
                        require(["controllers/alertsController"], function (AlertsController) {
                            var msg = "Server could not delete price, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: ".pricesTable",
                                message: msg,
                                temporary: true
                            });
                        });
                    }
                });
            },
            saveModel: function(model) {
                model.save({},{
                    wait: true,
                    success: function(model) {
                        Spinner.initialize(".pricesContainer");
                        Store.request("prices:collection").fetch({
                            success: function() {
                                Store.request("prices:controller").rerenderView();
                                $("#pricesModal").modal("hide");
                                Spinner.destroy({timeout: 700});
                            }
                        });
                    },
                    error: function(model, xhr, options) {
                        require(["controllers/alertsController"], function (AlertsController) {
                            var msg = "Server could not save price, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: ".pricesTable",
                                message: msg
                            });
                        });
                    }
                });
            }
        });
    });

    return Store.Prices.Views.PriceModelView;
});