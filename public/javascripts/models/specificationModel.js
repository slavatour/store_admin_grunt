define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Specifications.Models", function (Models, Store, Backbone, Marionette, $, _) {
        Models.SpecificationModel = Backbone.Model.extend({
            defaults: {

            },
            initialize: function () {
                this.id = this.get('id');
            },
            urlRoot: "specification"
        });
    });
    return Store.Specifications.Models.SpecificationModel;
});