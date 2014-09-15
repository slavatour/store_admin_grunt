define(["marionette", "views/spinnerView"], function (Marionette, Spinner) {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: null,
            events: {
                "click .close": "closeModal",
                "click .deleteCategory": "deleteCategory",
                "click .saveCategory": "saveCategory",
                "click .saveEditCategory": "editCategory",
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
                if (this.$el.find('#categoryImgEdit')[0].files[0]) {
                    fd.append('file', this.$el.find('#categoryImgEdit')[0].files[0]);
                }
                Spinner.initialize("#categoriesContainer");
                $.ajax({
                    type: "POST",
                    url: '/category',
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function() {
                        Spinner.destroy({timeout: 700});
                        $("#categoryModal").modal("hide");
                        Store.request("category:collection").fetch();
                    },
                    error: function(xhr) {
                        Spinner.destroy({timeout: 700});
                        require(["views/warningMessageView"], function(WarningView){
                            Spinner.destroy();
                            Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                        });
                    }
                });
            },
            editCategory: function() {
                var fd = new FormData();
                fd.append('category_name', this.$el.find('#nameInput').val());
                fd.append('category_description', this.$el.find('#descriptionInput').val());
                if (this.$el.find('#categoryImgEdit')[0].files[0]) {
                    fd.append('file', this.$el.find('#categoryImgEdit')[0].files[0]);
                }
                Spinner.initialize("#categoriesContainer");
                $.ajax({
                    type: "PUT",
                    url: '/category/'+this.model.getCategoryId(),
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function() {
                        Spinner.destroy({timeout: 700});
                        Store.request("category:collection").fetch();
                        Store.request("category:collectionView").render();
                        $("#categoryModal").modal("hide");
                    },
                    error: function(xhr) {
                        Spinner.destroy({timeout: 700});
                        require(["views/warningMessageView"], function(WarningView){
                            Spinner.destroy();
                            $("#categoryModal").modal("hide");
                            Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                        });
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