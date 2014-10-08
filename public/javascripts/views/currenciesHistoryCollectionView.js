define(["marionette", "Store", "config", "CurrencyHistoryModelView", "moment"], function (Marionette, Store, Config, CurrencyHistoryModelView, moment) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.CurrenciesHistoryCollectionView = Backbone.Marionette.CompositeView.extend({
            template: "#currenciesHistoryCollectionTemplate",
            childView: CurrencyHistoryModelView,
            childViewContainer: ".currencyHistoryModelsContainer",
            className: "panel panel-default subPanel",
            onShow: function() {
                this.initializeDatepicker();
            },
            initializeDatepicker: function () {
                require(["jqueryui/datepicker"], function(){
                    $(".hasDatePicker").datepicker({
                        dateFormat: "dd.mm.yy"
                    });
                });
            }
        });
    });

    return Store.Currencies.Views.CurrenciesHistoryCollectionView;
});