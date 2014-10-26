define(["marionette", "Store", "SpecificationModel"], function (Marionette, Store, SpecificationModel) {

    Store.module("Specifications.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
        Collections.SpecificationsCollection = Backbone.Collection.extend({
            model: SpecificationModel,
            url: "specifications",
            initialize: function () {
                // console.log("cat", this);
            }
        });
    });
    return Store.Specifications.Collections.SpecificationsCollection;
});