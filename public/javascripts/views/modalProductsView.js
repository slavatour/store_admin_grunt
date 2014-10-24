define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Products.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.ModalProductsView = Backbone.Marionette.ItemView.extend({
            template: null,
            events: {

            },
            showInvalidInputs: function(inputs) {
                this.$el.find(".controls").removeClass("has-error");
                _.each(inputs, function(input){
                    var elem = $("[name='" + input + "'");
                    elem.parents(".controls").addClass("has-error");
                    elem.parent().find(".progress-bar").toggleClass("progress-bar-success").toggleClass("progress-bar-danger");
                });
            }
        });
    });

    return Store.Products.Views.ModalProductsView;
});