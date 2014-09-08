define(["marionette", "Store", "CategoryModelView"], function (Marionette, Store, CategoryModelView) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryCollectionView = Marionette.CompositeView.extend({
			template: "#categoriesCollectionTemplate",
            childView: CategoryModelView,
            childViewContainer: ".categoriesContainerView",
			events: {
				'click .addNewSubategory': 'addNewSubcategory'
			},
			initialize: function () {

            },
			addNewSubcategory: function (e) {
				// var model = new Store.Categories.Models.SubcategoryModel();
				// var modalView = new Store.Common.Views.ModalView({
				// 	model: model
				// });
				// Store.modalRegion.show(modalView);
			}
		});
	});
	return Store.Categories.Views.CategoryCollectionView;
});