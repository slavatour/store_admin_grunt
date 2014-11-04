define(["Store",
    "marionette",
    "views/spinnerView",
    "moment",
    "ckeditor",
    "controllers/alertsController",
    "jqueryui/datepicker",
], function (
    Store,
    Marionette,
    Spinner,
    moment,
    CKEDITOR,
    AlertController) {

    Store.module("Products.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ProductNewModelView = Backbone.Marionette.ItemView.extend({
			template: "#productNewModelTemplate",
            events: {
                "click .newProductNav": "toggleNewProductTab",
                "click .saveNewProductInfo": "saveProductInfo",
                "click .saveProductInfo": "saveProductInfo",
                "click .specificationSubTab": "specificationSubTab",
                "click .saveSpecifications": "saveSpecificationClass"
            },
            templateHelpers: {
                renderSpecificationsView: function() {
                    if(this.editableModel.product_specification_class_id){

                    }
                }
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
                });
                if(!this.model.get("editableModel")) {
                    $("#startDateProduct").attr( "value", moment().format("DD.MM.YYYY") );
                }
                if(this.model.get("editableModel")) {
                    //switch new product tabs
                    $(".savingAlert").addClass("subTab").removeClass("savingAlert");
                }
            },
            toggleNewProductTab: function(event) {
//                var target = $(event.target),
//                    subTabClass = target.attr("data-target-container"),
//                    subTab = $("." + subTabClass);
//                if(subTab.hasClass("subTab")) {
//                    $(".subTab").addClass("hide");
//                    subTab.removeClass("hide");
//                    $(".newProductNav").removeClass("active");
//                    target.addClass("active");
//                }
//                if(subTab.hasClass("savingAlert")) {
//                    require(["AlertsController"], function(AlertsController){
//                        var msg = "Save this page before switch another tab!";
//                        new AlertsController({
//                            type: "warning",
//                            message: msg,
//                            container: ".infoSubTab",
//                            temporary: true
//                        });
//                    });
//                }
            },
            saveProductInfo: function(event) {
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
                        product_barcode_ean13: $.trim($("#europeBarcodeProduct").val()),
                        product_barcode_upc: $.trim($("#usaBarcodeProduct").val()),
                        product_start_date: moment($("#startDateProduct").datepicker("getDate")).format("X"),
                        product_end_date: $("#endDateProduct").datepicker("getDate") ? moment($("#endDateProduct").datepicker("getDate")).format("X") : null
                    }, {validate: true});
                    if($(event.target).attr("data-id")) {
                        productModel.set("id", parseInt($(event.target).attr("data-id")));
                    }
                    if(!productModel.validationError) {
                        productModel.save({}, {
                            wait: true,
                            success: function(model, res) {
                                var msg = "Product save successfully";
                                new AlertController ({
                                    type: "success",
                                    container: ".infoSubTab",
                                    message: msg,
                                    temporary: true
                                });
                            },
                            error: function(model, xhr) {
                                var msg = "Server could not save this product, contact with server administrator or try later.";
                                new AlertController ({
                                    type: "error",
                                    container: ".infoSubTab",
                                    message: msg
                                });
                            }
                        });
                    } else {
                        that.showInvalidInputs(productModel.validationError);
                    }
                });
            },
            specificationSubTab: function(event) {

            },
            saveSpecificationClass: function(event) {
                var that = this;
                require(["ProductModel"], function(ProductModel) {
                    var specificationsClassId = $("#specificationSelect").find("option:selected").attr("data-id"),
                        modelId = $(event.target).attr("data-id");
                    var productModel = new ProductModel();
                    productModel.urlRoot = "product_specification";
                    productModel.set({
                        id: modelId
                    }, {validate: false});
                    productModel.save({
                        specification_class_id: specificationsClassId
                    },{
                        validate: false,
                        wait: true,
                        patch: true,
                        success: function (model, json) {
                            var editableModel = that.model.toJSON().editableModel;
                            editableModel.product_specification_value = json.product_specification_value;
                            editableModel.product_specification_class_id = json.product_specification_class_id;
                            that.model.set({
                                editableModel: editableModel
                            });

                        },
                        error: function () {
                            var msg = "Server could not save specifications, contact with server administrator or try later.";
                            new AlertController ({
                                type: "error",
                                container: ".specificationsSubTab",
                                message: msg
                            });
                        }
                    });
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