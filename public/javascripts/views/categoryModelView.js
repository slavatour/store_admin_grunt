define(["marionette", "Store", "SubcategoriesController", "views/modalCategoryView"], function (Marionette, Store, SubcategoriesController, ModalView) {

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
                var modal = new ModalView({
                    model: this.model,
                    template: "#modalCategoryEdit"
                });
                Store.modalRegionCategory.show(modal);
            },
            deleteCategory: function() {
                this.model.destroy();
            }
		});
	});
	return Store.Categories.Views.CategoryModelView;
});