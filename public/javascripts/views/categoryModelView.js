define(["marionette",
    "Store",
    "SubcategoriesController",
    "views/modalCategoryView",
    "views/spinnerView"], function (Marionette, Store, SubcategoriesController, ModalView, Spinner) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryModelView = Backbone.Marionette.ItemView.extend({
			template: '#categoriesModelTemplate',
			initialize: function () {

			},
			events: {
                "click .addNewSubcategory": "addNewSubcategoryModal",
                "click .editCategory": "editCategory",
                "click .deleteCategory": "deleteCategory"

            },
            addNewSubcategoryModal: function(e) {
                var modal = new ModalView({
                    template: "#modalSubcategoryView",
                    parent_id: $(e.target).attr("data-category-id")
                });
                Store.modalRegionCategory.show(modal);
            },
            editCategory: function() {
                console.log(this.model);
                var modal = new ModalView({
                    model: this.model,
                    template: "#modalCategoryEdit"
                });
                Store.modalRegionCategory.show(modal);
            },
            deleteCategory: function() {
                Spinner.initialize("#categoriesContainer");
                this.model.destroy({
                    wait: true,
                    success: function() {
                        Spinner.destroy({timeout: 700});
                    },
                    error: function(xhr) {
                        require(["views/warningMessageView"], function(WarningView){
                            Spinner.destroy();
                            Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                        });
                    }
                });
            }
		});
	});
	return Store.Categories.Views.CategoryModelView;
});