define(["marionette", "Store"], function (Marionette, Store) {

	Store.module("Categories.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.SubcategoryModel = Backbone.Model.extend({
			defaults: {
				id: null,
				name: "noname",
				serial_number: null,
				parent_id: null,
				products: null
			},
			initialize: function () {
				this.id = this.get('id');
			},
			urlRoot: "subcategory"
		});
	});
	return Store.Categories.Models.SubcategoryModel;
});