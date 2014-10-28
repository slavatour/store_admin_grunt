define([
    "Store",
    "marionette",
    "ProductNewModel",
    "ProductNewModelView"
    ], function (Store, Marionette, ProductNewModel, ProductNewModelView) {

    Store.module("Products.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.ProductsNewController = Marionette.Controller.extend({
			initialize: function () {
                this.productNewModel = new ProductNewModel();
                this.productNewModelView = new ProductNewModelView({
                    model: this.productNewModel
                });
			},
			renderView: function () {
                var that = this;
                this.productNewModel.fetch({
                    success: function (data) {
                        Store.productsNewRegion.show(that.productNewModelView);
                    }
                });
			}
		});
	});
    return Store.Products.Controllers.ProductsNewController;
});