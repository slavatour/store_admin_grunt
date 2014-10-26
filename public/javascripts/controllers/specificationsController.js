define([
    "marionette",
    "Store",
    "SpecificationModel",
    "SpecificationsCollection",
    "SpecificationModelView",
    "SpecificationCollectionView"
], function (
    Marionette,
    Store,
    SpecificationModel,
    SpecificationsCollection,
    SpecificationModelView,
    SpecificationCollectionView
    ) {

    Store.module("Specifications.Controllers", function(Controllers, Store, Backbone, Marionette, $, _){
        Controllers.SpecificationsController = Marionette.Controller.extend({
            initialize: function() {
                this.specificationModel = new SpecificationModel();
                this.specificationsCollection = new SpecificationsCollection({
                    model: this.specificationModel
                });
                this.specificationModelView = new SpecificationModelView({
                    model: this.specificationModel
                });
                this.specificationCollectionView = new SpecificationCollectionView({
                    collection: this.specificationsCollection
                });
            },
            renderView: function() {
                var that = this;
                that.specificationsCollection.fetch({
                    success: function() {
                        console.log('done');
                        Store.specificationsRegion.show(that.specificationCollectionView);
                    },
                    error: function(model, xhr) {
                        require(["AlertsController"], function(AlertsController){
                            var msg = "Server could not get specifications, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: ".specificationsTable",
                                message: msg
                            });
                        });
                    }
                });
            }
        });
    });

    return Store.Specifications.Controllers.SpecificationsController;
});