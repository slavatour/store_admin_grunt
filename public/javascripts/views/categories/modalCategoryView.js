define(["marionette", "views/spinnerView"], function (Marionette, Spinner) {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: null,
            events: {
                "change #categoryImgEdit": "uploadPhoto",
                "click .saveCategory": "saveCategory",
                "click .saveSubcategory": "saveCategory"
            },
            saveCategory: function(event) {
                event.preventDefault();
                var that = this;
                that.model.set({
                    category_name: $.trim($("#nameInput").val()),
                    category_position_in_list: $.trim($("#").val()),
                    category_description: $.trim($("#descriptionInput").val())
                }, {validate: true});
                if(that.options.parent_id) {
                    that.model.set({
                        category_parent_id: that.options.parent_id
                    });
                }
                if (!that.model.validationError) {
                    that.model.save({}, {
                        wait: true,
                        success: function () {
                            $("#categoryModal").modal("hide");
                            Spinner.initialize("#categoriesContainer");
                            Store.request("category:collection").fetch({
                                success: function(){
                                    Store.request("category:collectionView").render();
                                    Spinner.destroy();
                                }
                            });
                        },
                        error: function () {
                            require(["controllers/alertsController"], function (AlertsController) {
                                var msg = "Server could not save new category, contact with server administrator or try later.";
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
                    file = this.$el.find('#categoryImgEdit')[0].files[0];
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
                        that.model.set({category_image_name: JSON.parse(data).path});
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
	return Store.Common.Views.ModalView;
});