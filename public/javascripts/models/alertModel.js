define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Common.Models", function(Models, Store, Backbone, Marionette, $, _){
        Models.AlertModel = Backbone.Model.extend({
            defaults: {
                message: null
            }
        });
    });

    return Store.Common.Models.AlertModel;
});