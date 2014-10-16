define([
    "marionette",
    "Store",
    "BrandModel",
    "moment",
    "views/spinnerView"
    ], function (Marionette, Store, BrandModel, moment, Spinner) {

    Store.module("Brands.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.ModalBrandsView = Backbone.Marionette.ItemView.extend({
            template: null,
            events: {
                "click .saveNewBrand": "saveNewBrand",
                "change #newBrandPhoto": "uploadPhoto",
                "click  .saveEditBrand": "editBrand"
            },
            saveNewBrand: function(event) {
                event.preventDefault();
                var that = this;
                that.model.set({
                    brand_description: $.trim($("#newBrandDescription").val()),
                    brand_name: $.trim($("#newBrandName").val()),
                    brand_url: $.trim($("#newBrandUrl").val())
                },{validate: true});
                if (!that.model.validationError) {
                    that.model.save({}, {
                        wait: true,
                        success: function(model, response) {
                            Store.request("brands:collection").fetch();
                            $("#brandsModal").modal("hide");
                        },
                        error: function(model, xhr, options) {
                            require(["controllers/alertsController"], function(AlertsController) {
                                var msg = "Server could not save new brand, contact with server administrator or try later.";
                                new AlertsController({
                                    type: "error",
                                    container: that.el,
                                    message: msg
                                });
                            });
                        }
                    });
                } else {
                    that.showInvalidInputs(that.model.validationError);
                }
            },
            editBrand: function(event) {
                event.preventDefault();
                var that = this;
                that.model.set({
                    brand_description: $.trim($("#newBrandDescription").val()),
                    brand_name: $.trim($("#newBrandName").val()),
                    brand_url: $.trim($("#newBrandUrl").val())
                },{validate: true});
                if (!that.model.validationError) {
                    that.model.save({}, {
                        wait: true,
                        success: function(model, response) {
                            Spinner.initialize(".brandsTableContainer");
                            Store.request("brands:collection").fetch({
                                success: function() {
                                    Store.request("brands:collectionView").render();
                                    Spinner.destroy({timeout: 200});
                                }
                            });
                            $("#brandsModal").modal("hide");
                        },
                        error: function(model, xhr, options) {
                            require(["controllers/alertsController"], function(AlertsController) {
                                var msg = "Server could not save new brand, contact with server administrator or try later.";
                                new AlertsController({
                                    type: "error",
                                    container: that.el,
                                    message: msg
                                });
                            });
                        }
                    });
                } else {
                    that.showInvalidInputs(that.model.validationError);
                }
            },
            uploadPhoto: function(event) {
                var that = this,
                    progressBar = $(that.$el).find(".progressBrandUploadPhoto .progress-bar"),
                    fd = new FormData(),
                    file = this.$el.find('#newBrandPhoto')[0].files[0];

                if(!this.photoValidation(file)) {
                    return;
                }
                fd.append('file', file);
                $.ajax({
                    type: "POST",
                    url: "/upload",
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        $(event.target).parent().removeClass("has-error");
                        progressBar.css("width", "100%").addClass("progress-bar-success").removeClass("progress-bar-danger");
                        that.model.set({brand_photo: JSON.parse(data).path});
                    },
                    error: function() {
                        that.showInvalidInputs([$(event.target).attr("name")]);
                    }
                });
            },
            photoValidation: function(file) {
                var acceptableTypes = ["image/png", "image/jpeg"],
                    result = false;
                _.each(acceptableTypes, function(type){
                    if(file.type === type) {
                        result = true;
                    }
                });
                return result;
            },
            showInvalidInputs: function(inputs) {
                this.$el.find(".controls").removeClass("has-error");
                _.each(inputs, function(input){
                    var elem = $("[name='" + input + "'");
                    elem.parents(".controls").addClass("has-error");
                    elem.parent().find(".progress-bar").toggleClass("progress-bar-success").toggleClass("progress-bar-danger");
                });
            }
        });
    });

    return Store.Brands.Views.ModalBrandsView;
});