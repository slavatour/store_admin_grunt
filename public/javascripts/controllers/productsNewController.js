define([
    "Store",
    "marionette",
    "ProductNewModel",
    "ProductNewModelView",
    "ProductModel"
    ], function (Store, Marionette, ProductNewModel, ProductNewModelView, ProductModel) {

    Store.module("Products.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.ProductsNewController = Marionette.Controller.extend({
			initialize: function () {
                this.productNewModel = new ProductNewModel();
                this.productNewModelView = new ProductNewModelView({
                    model: this.productNewModel
                });
                this.productModel =  new ProductModel();
			},
			renderView: function () {
                var that = this;
                this.productNewModel.fetch({
                    success: function (data) {
                        Store.productsNewRegion.show(that.productNewModelView);
                    }
                });
			},
            renderEditView: function() {
                var that = this;
                this.productModel.url = this.productModel.urlRoot+ "/" + this.productModelId;
                this.productModel.fetch({
                    success: function(model, json) {
                        that.productNewModel.fetch({
                            success: function (data) {
                                that.productNewModel.set("editableModel", model.toJSON());
                                Store.productsNewRegion.show(that.productNewModelView);
                            },
                            error: function(model, xhr) {
                                var msg = "Server could not find this product, contact with server administrator or try later.";
                                that.showAlert(msg);
                            }
                        });
                    },
                    error: function(data, xhr) {
                        var msg = "Server could not find this product, contact with server administrator or try later.";
                        that.showAlert(msg);
                    }
                });
            },
            showAlert: function(msg) {
                require(["controllers/AlertsController"], function(AlertsController){
                    new AlertsController ({
                        type: "error",
                        container: ".productForm",
                        message: msg
                    });
                });
            }
		});
	});
    return Store.Products.Controllers.ProductsNewController;
});