define(["Store", "marionette", "views/spinnerView"], function (Store, Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductModelView = Backbone.Marionette.ItemView.extend({
			template: "#productModelTemplate",
            tagName: "tr",
            events: {
                "click .toggleTable": "toggleTable"
            },
            toggleTable: function(event) {
                $target = $(event.target);
                console.log($target.find("table"));
                $target.parent().next("table").hasClass("hide") ? $target.parent().next("table").removeClass("hide") : $target.parent().next("table").addClass("hide");
            }
		});
	});
    return Store.Products.Views.ProductModelView;
});