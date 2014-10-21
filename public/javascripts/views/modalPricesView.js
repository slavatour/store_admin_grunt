define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Products.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.ModalProductsView = Backbone.Marionette.ItemView.extend({
            template: null,
            events: {
                "change #calculationMethod": "changeCalculationMethods",
                "click .saveNewPrice": "saveNewPrice",
                "click .saveEditPrice": "saveEditPrice"
            },
            changeCalculationMethods: function(event) {
                var select = $(event.target).find("option:selected"),
                    input = $("#percentPrice");
                if(select.hasClass("manually")) {
                    input.prop("disabled", true);
                } else {
                    input.prop("disabled", false);
                }
            },
            saveNewPrice: function(event) {
                event.preventDefault();
                this.saveModel();
            },
            saveEditPrice: function(event) {
                event.preventDefault();
                this.saveModel();
            },
            saveModel: function() {
                var that = this;
                this.model.set({
                    price_name: $.trim($("#priceName").val()),
                    price_description: $.trim($("#priceDescription").val()),
                    price_calculation_method: $.trim($("#calculationMethod").find("option:selected").val()),
                    price_calculation_percent: $.trim($("#percentPrice").val()),
                    price_include_tax: $.trim($("#taxes").is(":checked")),
                    price_country: $.trim($("#countriesPrice").find("option:selected").val())
                }, {validate: true});
                if (!this.model.validationError) {
                    this.model.save({},{
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
                                    container: that.$el.find(".modal-body"),
                                    message: msg
                                });
                            });
                        }
                    });
                } else {
                    that.showInvalidInputs(that.model.validationError);
                }
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