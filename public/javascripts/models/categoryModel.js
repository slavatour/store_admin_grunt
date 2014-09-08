define(["marionette", "Store", "SubcategoriesController"], function (Marionette, Store, SubcategoriesController) {

	Store.module("Categories.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.CategoryModel = Backbone.Model.extend({
			urlRoot: "category",
			defaults: {
				id: null,
                category_id: null,
				category_name: "noname",
				category_position_in_list: null,
                category_description: null,
                category_image_name: null,
				subcategories: null
			},
			initialize: function () {
				this.id = this.get('id');
			}
		});
	});
	return Store.Categories.Models.CategoryModel;
});