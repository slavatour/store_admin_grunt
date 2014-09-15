define(["marionette", "ProductModel"], function (Marionette, ProductModel) {

    Store.module("Products.Collections", function (Collections, Store, Marionette, $, _) {
		Collections.ProductsCollection = Backbone.Collection.extend({
            model: ProductModel,
            url: "/products",
            comparator: function () {
                //MYTODO add validation
            }
        });
	});
    return Store.Products.Collections.ProductsCollection;
});