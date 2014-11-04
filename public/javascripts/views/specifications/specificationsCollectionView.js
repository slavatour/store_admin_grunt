define(["Store", "marionette", "SpecificationModelView", "views/spinnerView"], function (Store, Marionette, SpecificationModelView, Spinner) {

    Store.module("Specifications.Views", function (Views, Store, Backbone, Marionette, $, _) {
        Views.SpecificationCollectionView = Backbone.Marionette.CompositeView.extend({
            template: "#specificationsCollectionView",
            childView: SpecificationModelView,
            childViewContainer: ".specificationsItemsContainer",
            className: "panel panel-default subPanel",
            events: {
                "click .addNewSpecificationClass": "addNewSpecificationClass"
            },
            onShow: function() {
                this.$el.find(".tooltipHas").tooltip();
            },
            addNewSpecificationClass: function(event) {
                require(["SpecificationModel", "ModalSpecificationsView"], function(SpecificationModel, ModalSpecificationsView){
                    var modalSpecificationsView = new ModalSpecificationsView({
                        template: "#specificationsModalTemplate",
                        model: new SpecificationModel
                    });
                    Store.modalSpecificationPrices.show(modalSpecificationsView);
                });
            }
        });
    });
    return Store.Specifications.Views.SpecificationCollectionView;
});