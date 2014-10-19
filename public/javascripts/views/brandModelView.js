define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Brands.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.BrandModelView = Backbone.Marionette.ItemView.extend({
            template: "#brandtModelTemplate",
            tagName: "tr",
            events: {
                "click .editBrand": "openEditModal",
                "click .deleteBrand": "deleteBrand",
                "click .brandLogo": "openPhotoModal"
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
            },
            deleteBrand: function(event) {
                if(!confirm("Do you want delete brand?")) {
                    return;
                }
                var that = this;
                that.model.destroy({
                    wait: true,
                    success: function() {

                    },
                    error: function() {
                        require(["controllers/alertsController"], function(AlertsController) {
                            var msg = "Server could not delete brand, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: ".brandsTableContainer",
                                message: msg,
                                temporary: true
                            });
                        });
                    }
                });
            },
            openPhotoModal: function(event) {
                var that = this;
                require(["ModalBrandsView"], function(ModalBrandsView){
                    var modalBrandsView = new ModalBrandsView({
                        template: "#modalPhotoView",
                        model: that.model
                    });
                    Store.modalRegionBrands.show(modalBrandsView);
                });
            }
        });
    });

    return Store.Brands.Views.BrandModelView;
});