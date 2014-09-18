define(["marionette", "ProductModel", "Store"], function (Marionette, ProductModel, Store) {

    Store.module("Products.Collections", function (Collections, Store, Marionette, $, _) {
		Collections.ProductsCollection = Backbone.Collection.extend({
            model: ProductModel,
            url: "/products",
            comparator: function (productA, productB) {
                //MYTODO - check validation
//                if(1*productA.getNumber() > 1*productB.getNumber()) {
//                    return 1;
//                } else {
//                    return -1;
//                }
            }
        });
	});
    return Store.Products.Collections.ProductsCollection;
});