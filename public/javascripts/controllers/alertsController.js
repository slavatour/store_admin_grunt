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
                    model: this.alertModel,
                    temporary: this.options.temporary,
                    type: this.options.type,
                    container: this.options.container
                });
                this.renderView();
            },
            renderView: function () {
                this.alertModel.set("message", this.options.message);
                this.alertView.setTemplate();
//                this.alertView.render();
                console.log(this.options.container);
                Store.addRegions({
                    alertRegion: ".alertContainer"
                });
                Store.alertRegion.show(this.alertView);
                this.foo();
            },
            foo: function() {
                console.log(this);
            }
        });
    });

    return Store.Common.Controllers.AlertsController;
});