define(["marionette", "Store", "BrandModel", "moment"], function (Marionette, Store, BrandModel, moment) {

    Store.module("Brands.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.ModalBrandsView = Backbone.Marionette.ItemView.extend({
            template: null,
            events: {
                "click .saveNewBrand": "saveNewBrand",
                "change #newBrandPhoto": "uploadPhoto"
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

                } else {
                    that.showInvalidInputs(that.model.validationError);
                }
                console.log(that.model);
                console.log(that.model.validationError);

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
                    elem.parents("").addClass("has-error");
                    elem.parent().find(".progress-bar").toggleClass("progress-bar-success").toggleClass("progress-bar-danger");
                });
            }
        });
    });

    return Store.Brands.Views.ModalBrandsView;
});