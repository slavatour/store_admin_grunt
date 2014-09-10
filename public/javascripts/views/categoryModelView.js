define(["marionette", "Store", "SubcategoriesController", "views/modalCategoryView"], function (Marionette, Store, SubcategoriesController, ModalView) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryModelView = Backbone.Marionette.ItemView.extend({
			template: '#categoriesModelTemplate',
			initialize: function () {

			},
			events: {
				'click .subcategoriesLink': 'openModal',
                "click .addNewSubcategory": "addNewSubcategoryModal"

            },
			openModal: function (e) {
				var modelId = 1*($(e.target).attr('data-submodel-id'));
				var subcategories = this.model.get('subcategories');
				var openedModel = _.where(subcategories, {id: modelId});
				var submodel = new Store.Categories.Models.SubcategoryModel();
				submodel.set(openedModel[0]);
				require(["ModalCategoryView"], function (ModalCategoryView) {
					var modalView = new ModalCategoryView({
						model: submodel
					});
					Store.modalRegion.show(modalView);
				});
				
			},
            addNewSubcategoryModal: function(e) {
                var modal = new ModalView({
                    template: "#modalSubcategoryView",
                    parent_id: $(e.target).attr("data-category-id")
                });
                Store.modalRegionCategory.show(modal);
            }
		});
	});
	return Store.Categories.Views.CategoryModelView;
});