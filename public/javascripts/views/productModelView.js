define(["Store", "marionette", "views/spinnerView"], function (Store, Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductModelView = Backbone.Marionette.ItemView.extend({
			template: "#productModelTemplate",
            tagName: "tr"
		});
	});
    return Store.Products.Views.ProductModelView;
});