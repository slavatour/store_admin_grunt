define(["marionette", "Store", "SubcategoriesController"], function (Marionette, Store, SubcategoriesController) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryModelView = Backbone.Marionette.ItemView.extend({
			template: '#categoriesModelTemplate',
			initialize: function () {

			},
			events: {
				'click .subcategoriesLink': 'openModal'
			},
			templateHelpers: {
				viewSubcategories: function () {
					var subcategoriesCollection = Store.request("subcategory:collection");
					return "<h1>Ho</h1>";
				}
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
				
			}
		});
	});
	return Store.Categories.Views.CategoryModelView;
});