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
                var currencyModel = new CurrencyModel();
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
                        },
                        error: function(data) {
                            console.log(data);
                        }
                    });
                };
            }
        });
    });

    return Store.Currencies.Views.ModalCurrenciesView;
});