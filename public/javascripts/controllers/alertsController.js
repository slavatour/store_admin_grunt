define([
    "marionette",
    "Store",
    "models/alertModel",
    "views/alertView"
], function (Marionette, Store, AlertModel, AlertView) {

    Store.module("Common.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
        Controllers.AlertsController = Marionette.Controller.extend({
            initialize: function (options) {
                $.extend(this.options, options);
                this.setContainer();
                this.alertModel = new AlertModel();
                this.alertView = new AlertView({
                    model: this.alertModel,
                    type: this.options.type
                });
                this.renderView();
            },
            renderView: function () {
                this.alertModel.set("message", this.options.message);
                this.alertView.setTemplate();
                Store.addRegions({
                    alertRegion: this.options.alertContainer
                });
                Store.alertRegion.show(this.alertView);
                if (this.options.temporary) {
                    this.temporaryView();
                }
            },
            temporaryView: function() {
                var that = this,
                    alertContainer = this.options.alertContainer;
                setTimeout(function(){
                    alertContainer.animate({
                        opacity: "0"
                    }, 2000, function() {
                        alertContainer.empty().css("opacity", "1");
                    });
                }, 4000);
            },
            setContainer: function() {
                var initContainer = this.options.container;
                if(!$(initContainer).find(".alertContainer").length) {
                    $(initContainer).prepend("<div class='alertContainer'></div>");
                }
                this.options.alertContainer = $(initContainer).find(".alertContainer");
            }
        });
    });

    return Store.Common.Controllers.AlertsController;
});