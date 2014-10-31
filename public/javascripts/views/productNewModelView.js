define(["Store",
    "marionette",
    "views/spinnerView",
    "moment",
    "ckeditor",
    "jqueryui/datepicker",
], function (
    Store,
    Marionette,
    Spinner,
    moment,
    CKEDITOR) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductNewModelView = Backbone.Marionette.ItemView.extend({
			template: "#productNewModelTemplate",
            events: {
                "click .newProductNav": "toggleNewProductTab",
                "click .saveNewProductInfo": "saveNewProductInfo"
            },
            onShow: function() {
                //init CKE editor
                CKEDITOR.replace( 'shortSprsificationProduct' );
                CKEDITOR.replace( 'fullSprsificationProduct' );

                //init date pickers
                $("#endDateProduct").datepicker({
                    dateFormat: "dd.mm.yy"
                });
                $("#startDateProduct").datepicker({
                    dateFormat: "dd.mm.yy"
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
                var that = this;
                //switch new product tabs
                $(".savingAlert").addClass("subTab").removeClass("savingAlert");
                require(["ProductModel"], function(ProductModel){
                    var productModel = new ProductModel();
                    productModel.set({
                        product_parent_id: $("#categoryProduct").find("option:selected").attr("data-id"),
                        product_brand_id: $("#brandProduct").find("option:selected").attr("data-id"),

                        product_full_name: $.trim($("#fullNameProduct").val()),
                        product_short_name: $.trim($("#shortNameProduct").val()),
                        product_short_description: CKEDITOR.instances.shortSprsificationProduct.getData(),
                        product_full_description: CKEDITOR.instances.fullSprsificationProduct.getData(),
                        product_barcode_EAN13: $.trim($("#europeBarcodeProduct").val()),
                        product_barcode_UPC: $.trim($("#usaBarcodeProduct").val()),
                        product_start_date: moment($("#startDateProduct").datepicker("getDate")).format("X"),
                        product_end_date: $("#endDateProduct").datepicker("getDate") ? moment($("#endDateProduct").datepicker("getDate")).format("X") : null
                    }, {validate: true});
                    if(!productModel.validationError) {
                        productModel.save({}, {
                            wait: true,
                            success: function(model) {

                            },
                            error: function(model, xhr) {
                                require(["controllers/alertsController"], function(AlertController){
                                    var msg = "Server could not save new product, contact with server administrator or try later.";
                                    new AlertController ({
                                        type: "error",
                                        container: ".infoSubTab",
                                        message: msg
                                    });
                                });
                            }
                        });
                    } else {
                        that.showInvalidInputs(productModel.validationError);
                    }
                });
            },
            showInvalidInputs: function(array) {
                var that = this;
                that.$el.find('input').parents(".form-group").removeClass("has-error");
                that.$el.find('textarea').parents(".form-group").removeClass("has-error");
                _.each(array, function(name){
                    that.$el.find("[name='" + name + "']").parents(".form-group").addClass("has-error");
                });
            }
		});
	});
    return Store.Products.Views.ProductNewModelView;
});