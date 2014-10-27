define(["Store", "marionette", "views/spinnerView"], function (Store, Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductModelView = Backbone.Marionette.ItemView.extend({
			template: "#productModelTemplate",
            tagName: "tr",
            className: "ui-state-default",
            events: {

            }
		});
	});
    return Store.Products.Views.ProductModelView;
});