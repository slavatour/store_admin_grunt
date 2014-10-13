define(["marionette", "Store", "CurrencyModel"], function (Marionette, Store, CurrencyModel) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.ModalCurrenciesView = Backbone.Marionette.ItemView.extend({
            template: null,
            events: {
                "click .saveNewCurrency": "saveNewCurrency",
                "click .saveEditCurrency": "saveEditCurrency"
            },
            onShow: function() {
                $(".tooltipHas").tooltip();
            },
            saveNewCurrency: function(event) {
                event.preventDefault();
                var currencyModel = new CurrencyModel(),
                    that = this;
                currencyModel.set({
                    currency_country: $.trim($("#countryCurrency").val()),
                    currency_iso_code: $.trim($("#literalCodeCurrency").val()),
                    currency_iso_number_code: $.trim($("#literalCodeNumberCurrency").val()),
                    currency_numeric_code: $.trim($("#numericCodeCurrency").val()),
                    currency_value: $.trim($("#valueCurrency").val().replace(/[,]/, "."))
                },{validate: true});
                if (!currencyModel.validationError) {
                    currencyModel.save({}, {
                        wait: true,
                        success: function(data) {
                            Store.request("currencies:collection").fetch();
                            Store.request("currencies:collectionView").render();
                            $("#currencyModal").modal("hide");
                        },
                        error: function(model, xhr, options) {
                            require(["controllers/alertsController"], function(AlertsController) {
                                var msg = "Server could not save currency, contact with server administrator or try later.";
                                new AlertsController({
                                    type: "error",
                                    container: that.el,
                                    message: msg
                                });
                            });
                        }
                    });
                } else {
                    that.showInvalidInputs(currencyModel.validationError);
                }
            },
            saveEditCurrency: function(event) {
                event.preventDefault();
                var that = this;
                that.model.set({
                    currency_country: $.trim($("#countryCurrency").val()),
                    currency_iso_code: $.trim($("#literalCodeCurrency").val()),
                    currency_iso_number_code: $.trim($("#literalCodeNumberCurrency").val()),
                    currency_numeric_code: $.trim($("#numericCodeCurrency").val()),
                    currency_value: $.trim($("#valueCurrency").val().replace(/[,]/, ".")),
                    currency_last_update: new Date().toString()
                }, {validate: true});
                if (!that.model.validationError) {
                    that.model.save({}, {
                        wait: true,
                        success: function(model, response, options) {
                            console.log(response);
                            Store.request("currencies:collection").fetch();
                            Store.request("currencies:collectionView").render();
                            $("#currencyModal").modal("hide");
                        },
                        error: function(model, xhr, options) {
                            console.log(xhr);
                            require(["controllers/alertsController"], function(AlertsController) {
                                var msg = "Server could not save currency's changes, contact with server administrator or try later.";
                                new AlertsController({
                                    type: "error",
                                    container: that.el,
                                    message: msg
                                });
                            });
                        }
                    });
                } else {
                    that.showInvalidInputs(that.model.validationError);
                }
            },
            showInvalidInputs: function(array) {
                var that = this;
                that.$el.find('input').parents(".form-group").removeClass("has-error");
                _.each(array, function(name){
                    that.$el.find("[name='" + name + "']").parents(".form-group").addClass("has-error");
                });
            }
        });
    });

    return Store.Currencies.Views.ModalCurrenciesView;
});