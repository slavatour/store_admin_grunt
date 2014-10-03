define(["marionette", "Store", "CategoryModelView", "views/modalCategoryView"],
    function (Marionette, Store, CategoryModelView, ModalView) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryCollectionView = Marionette.CompositeView.extend({
			template: "#categoriesCollectionTemplate",
            childView: CategoryModelView,
            childViewContainer: ".categoriesContainerView",
			events: {
				"click .addNewSubcategory": "addNewSubcategory",
                "click .addNewCategory": "openModalAddNewCategory"
			},
			initialize: function () {

            },
            openModalAddNewCategory: function() {
                var modal = new ModalView({
                    template: "#modalCategoryView"
                });
                Store.modalRegionCategory.show(modal);
            }
		});
	});
	return Store.Categories.Views.CategoryCollectionView;
});