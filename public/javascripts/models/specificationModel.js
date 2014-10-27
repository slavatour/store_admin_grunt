define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Specifications.Models", function (Models, Store, Backbone, Marionette, $, _) {
        Models.SpecificationModel = Backbone.Model.extend({
            defaults: {
                id: null,
                level: null,
                specification_id: null,
                specification_parent_id: null,
                specification_name: null,
                specification_description: null,
                specification_values: null,
                specification_group: null,
                specifications: null
            },
            initialize: function () {
                this.id = this.get('id');
            },
            urlRoot: "specification"
        });
    });
    return Store.Specifications.Models.SpecificationModel;
});