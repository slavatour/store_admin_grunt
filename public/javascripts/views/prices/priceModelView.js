define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Prices.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.PriceModelView = Backbone.Marionette.ItemView.extend({
            template: "#pricesModelTemplate",
            tagName: "tr",
            events: {
                "click .editModalPrice": "openModalEditPrice",
                "click .copyPrice": "copyPrice",
                "click .deletePrice": "deletePrice",
                "click .priceDefault": "saveNewPriceDefault",
                "click .includeTaxes": "saveIncludeTaxesStatus"
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
            saveNewPriceDefault: function(event) {
                event.preventDefault();
                Spinner.initialize(".pricesTable");
                var element = $(event.target),
                    attr = element.attr("name"),
                    value = element.prop("checked");
                this.model.save({
                    "price_default": value
                }, {
                    patch: true,
                    wait: true,
                    success: function(model) {
                        Store.request("prices:controller").rerenderView();
                        Spinner.destroy({timeout: 700});
                    },
                    error: function(model, xhr, options) {
                        require(["controllers/alertsController"], function(AlertsController){
                            var msg = "Server could not save changes, contact with server administrator or try later.",
                                type = "error";
                            if(xhr.status == 501) {
                                msg = xhr.responseText;
                                type = "warning";
                            }
                            new AlertsController({
                                type: type,
                                message: msg,
                                container: ".pricesTable",
                                temporary: true
                            });
                            Spinner.destroy({timeout: 700});
                        });
                    }
                });
            },
            saveIncludeTaxesStatus: function() {
                event.preventDefault();
                Spinner.initialize(".pricesTable");
                var element = $(event.target),
                    value = element.prop("checked");
                this.model.save({
                    "price_include_tax": value
                }, {
                    patch: true,
                    wait: true,
                    success: function(model) {
                        element.prop("checked", value);
                        Spinner.destroy({timeout: 700});
                    },
                    error: function(model, xhr, options) {
                        require(["controllers/alertsController"], function(AlertsController){
                            var msg = "Server could not save changes, contact with server administrator or try later.",
                                type = "error";
                            new AlertsController({
                                type: type,
                                message: msg,
                                container: ".pricesTable",
                                temporary: true
                            });
                            Spinner.destroy({timeout: 700});
                        });
                    }
                });
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