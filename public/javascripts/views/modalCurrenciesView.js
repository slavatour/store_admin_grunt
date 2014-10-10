define(["marionette", "Store", "CurrencyModel"], function (Marionette, Store, CurrencyModel) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.ModalCurrenciesView = Backbone.Marionette.ItemView.extend({
            template: null,
            events: {
                "click .saveNewCurrency": "saveNewCurrency"
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
                    console.log(currencyModel.validationError);
                    console.log($.trim($("#valueCurrency").val()));
                    that.showInvalidInputs(currencyModel.validationError);
                }
            },
            showInvalidInputs: function(array) {
                var that = this;
                that.$el.find('input').parent().removeClass("has-error");
                _.each(array, function(name){
                    that.$el.find("[name='" + name + "']").parent().addClass("has-error");
                });
            }
        });
    });

    return Store.Currencies.Views.ModalCurrenciesView;
});