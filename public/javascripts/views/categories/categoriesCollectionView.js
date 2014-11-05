define(["marionette", "Store", "CategoryModel", "CategoryModelView", "ModalCategoryView", "views/spinnerView"],
    function (Marionette, Store, CategoryModel, CategoryModelView, ModalView, Spinner) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryCollectionView = Marionette.CompositeView.extend({
			template: "#categoriesCollectionTemplate",
            childView: CategoryModelView,
            childViewContainer: ".categoriesContainerView",
			events: {
                "click .addNewCategory": "openModalAddNewCategory"
			},
            onShow: function() {

            },
            openModalAddNewCategory: function() {
                var modal = new ModalView({
                    template: "#modalCategoryView",
                    model: new CategoryModel()
                });
                Store.modalRegionCategory.show(modal);
            }
		});
	});
	return Store.Categories.Views.CategoryCollectionView;
});