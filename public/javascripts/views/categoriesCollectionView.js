define(["marionette", "Store", "CategoryModelView", "views/modalCategoryView"],
    function (Marionette, Store, CategoryModelView, ModalView) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryCollectionView = Marionette.CompositeView.extend({
			template: "#categoriesCollectionTemplate",
            childView: CategoryModelView,
            childViewContainer: ".categoriesContainerView",
			events: {
				"click .addNewSubcategory": "addNewSubcategory",
                "click .addNewCategory": "addNewCategory"
			},
			initialize: function () {

            },
            addNewCategory: function() {
                var modal = new ModalView();
                Store.modalRegionCategory.show(modal);
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