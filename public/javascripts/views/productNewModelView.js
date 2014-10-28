define(["Store",
    "marionette",
    "views/spinnerView",
    "moment",
    "jqueryui/datepicker"
], function (
    Store,
    Marionette,
    Spinner,
    moment) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductNewModelView = Backbone.Marionette.ItemView.extend({
			template: "#productNewModelTemplate",
            events: {
                "click .newProductNav": "toggleNewProductTab",
                "click .saveNewProductInfo": "saveNewProductInfo"
            },
            onShow: function() {
                //init CKE editor
                require(["ckeditor"], function(CKEDITOR){
                    CKEDITOR.replace( 'shortSprsificationProduct' );
                    CKEDITOR.replace( 'fullSprsificationProduct' );
                });
                //init date pickers
                $("#endDateProduct").datepicker({
                    dateFormat: "dd.mm.yy"
                });
                $("#startDateProduct").datepicker({
                    dateFormat: "dd.mm.yy",
                }).attr( "value", moment().format("DD.MM.YYYY") );
            },
            toggleNewProductTab: function(event) {
                var target = $(event.target),
                    subTabClass = target.attr("data-target-container"),
                    subTab = $("." + subTabClass);
                if(subTab.hasClass("subTab")) {
                    $(".subTab").addClass("hide");
                    subTab.removeClass("hide");
                    $(".newProductNav").removeClass("active");
                    target.addClass("active");
                }
                if(subTab.hasClass("savingAlert")) {
                    require(["AlertsController"], function(AlertsController){
                        var msg = "Save this page before switch another tab!";
                        new AlertsController({
                            type: "warning",
                            message: msg,
                            container: ".infoSubTab",
                            temporary: true
                        });
                    });
                }
            },
            saveNewProductInfo: function(event) {
                event.preventDefault();
                //switch new product tabs
                $(".savingAlert").addClass("subTab").removeClass("savingAlert");
            }
		});
	});
    return Store.Products.Views.ProductNewModelView;
});