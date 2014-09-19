define(["Store", "marionette", "views/spinnerView"], function (Store, Marionette, Spinner) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductModelView = Backbone.Marionette.ItemView.extend({
			template: "#productModelTemplate",
            tagName: "tr",
            events: {
                "click .toggleTable": "toggleTable",
                "click .toggleTbody": "toggleTbody"
            },
            toggleTable: function(event) {
                $target = $(event.target);
                if($target.parent().next(".tables").hasClass("hide")) {
                    $target.parent().next(".tables").removeClass("hide");
                    $target.find("i.fa").removeClass("fa-caret-right").addClass("fa-caret-down");
                } else {
                    $target.parent().next(".tables").addClass("hide");
                    $target.find("i.fa").removeClass("fa-caret-down").addClass("fa-caret-right");
                }
            },
            toggleTbody: function(event) {
                $target = $(event.target);
                if($target.parent('table').find(".toggeled").hasClass("hide")) {
                    $target.parent('table').find(".toggeled").removeClass("hide");
                    $target.find("i.fa").removeClass("fa-caret-right").addClass("fa-caret-down");
                } else {
                    $target.parent('table').find(".toggeled").addClass("hide");
                    $target.find("i.fa").removeClass("fa-caret-down").addClass("fa-caret-right");
                }
            }
		});
	});
    return Store.Products.Views.ProductModelView;
});