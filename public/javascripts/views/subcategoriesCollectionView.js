define(["marionette", "Store"], function (Marionette, Store) {
	
	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SubcategoriesCollectionView = Backbone.Marionette.CompositeView.extend({
			template: "#subcategoriesCollectionTemplate",
			itemView: Store.Categories.Views.SubcategoryModelView,
			itemViewContainer: ".categoriesContainerView", 
		});
	});
	return Store.Categories.Views.SubcategoriesCollectionView;
});