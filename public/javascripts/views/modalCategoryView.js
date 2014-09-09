define(["marionette"], function (Marionette) {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: "#modalCategoryView",
            events: {
                "click .close": "closeModal",
                "click .deleteCategory": "deleteCategory",
                "click .saveCategory": "saveCategory"

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
                    url: '/categories',
                    data: fd,
                    processData: false,
                    contentType: false
                });
            }
		});
	});
	return Store.Common.Views.ModalView;
});