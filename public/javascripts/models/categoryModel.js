define(["marionette", "Store"], function (Marionette, Store) {

	Store.module("Categories.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.CategoryModel = Backbone.Model.extend({
			urlRoot: "category",
			defaults: {
				id: null,
                category_id: null,
				category_name: null,
				category_position_in_list: null,
                category_description: null,
                category_image_name: null,
                category_parent_id: null,
                level: null,
				subcategories: []
			},
            urlRoot: "/category",
			initialize: function () {
				this.id = this.get('id');
			},
            validate: function (attr) {
                var invalid = [];
                if(!attr.category_name) {
                    invalid.push("category_name");
                }
                if(!attr.category_description) {
                    invalid.push("category_description");
                }
                if(!attr.category_image_name) {
                    invalid.push("category_image_name");
                }

                if(invalid.length) {
                    return invalid;
                }
            },
            setCategoryId: function(new_id) {
                this.set({"category_id": new_id});
            },
            setCategoryName: function(new_name) {
                this.set({"category_name": new_name});
            },
            setCategoryPositionInList: function (new_position) {
                this.set({"category_position_in_list": new_position});
            },
            setCategoryDescription: function (new_description) {
                this.set({"category_description": new_description});
            },
            getCategoryId: function() {
                return this.get("category_id");
            },
            getCategoryName: function() {
                return this.get("category_name");
            },
            getCategoryPositionInList: function () {
                return this.get("category_position_in_list");
            },
            getCategoryDescription: function () {
                return this.get("category_description");
            }
		});
	});
	return Store.Categories.Models.CategoryModel;
});