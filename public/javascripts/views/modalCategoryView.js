define(["marionette"], function (Marionette) {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: null,
            events: {
                "click .close": "closeModal",
                "click .deleteCategory": "deleteCategory",
                "click .saveCategory": "saveCategory",
                "click .saveSubcategory": "saveSubcategory"
            },
            closeModal: function(e) {
                $("#categoryModal").modal("hide");
            },
            deleteCategory: function() {

            },
            saveCategory: function() {
                var fd = new FormData();
                fd.append('category_name', this.$el.find('#nameInput').val());
                fd.append('category_description', this.$el.find('#descriptionInput').val());
                fd.append('file', this.$el.find('#categoryImgEdit')[0].files[0]);
                $.ajax({
                    type: "POST",
                    url: '/category',
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function() {
                        $("#categoryModal").modal("hide");
                    }
                });
            },
            saveSubcategory: function() {
                var fd = new FormData();
                fd.append('parent_id', this.options.parent_id);
                fd.append('subcategory_name', this.$el.find('#nameInput').val());
                fd.append('subcategory_description', this.$el.find('#descriptionInput').val());
                fd.append('file', this.$el.find('#categoryImgEdit')[0].files[0]);
                $.ajax({
                    type: "POST",
                    url: '/subcategory',
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function() {
                        $("#categoryModal").modal("hide");

                    }
                });
            }
		});
	});
	return Store.Common.Views.ModalView;
});