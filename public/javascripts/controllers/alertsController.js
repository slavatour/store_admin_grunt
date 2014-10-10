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
                this.alertModel = new AlertModel();
                this.alertView = new AlertView({
                    model: this.alertModel
                });
                this.renderView();
            },
            renderView: function () {
                this.alertModel.set("message", this.options.message);
                this.alertView.setTemplate(this.options.type);
                this.alertView.render(this.options.container);
            }
        });
    });

    return Store.Common.Controllers.AlertsController;
});