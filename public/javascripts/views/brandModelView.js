define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Brands.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.BrandModelView = Backbone.Marionette.ItemView.extend({
            template: "#brandtModelTemplate",
            tagName: "tr",
            events: {
                "click .editBrand": "openEditModal"
            },
            openEditModal: function(event) {
                var that = this;
                require(["ModalBrandsView"], function(ModalBrandsView){
                    var modalBrandsView = new ModalBrandsView({
                        template: "#modalEditBrand",
                        model: that.model
                    });
                    Store.modalRegionBrands.show(modalBrandsView);
                });
            }
        });
    });

    return Store.Brands.Views.BrandModelView;
});