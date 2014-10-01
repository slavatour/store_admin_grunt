define(["marionette",
    "Store",
    "SubcategoriesController",
    "views/modalCategoryView",
    "views/spinnerView"], function (Marionette, Store, SubcategoriesController, ModalView, Spinner) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryModelView = Backbone.Marionette.ItemView.extend({
			template: '#categoriesModelTemplate',
            tagName: "ul",
			initialize: function () {

			},
			events: {
                "click .addNewSubcategory": "addNewSubcategoryModal",
                "click .editCategory": "editCategory",
                "click .deleteCategory": "deleteCategory"

            },
            templateHelpers: {
                renderCategoriesTre: function() {
                    return this.buildViewCategoriesTre(this.subcategories);
                },
                buildViewCategoriesTre: function(subcategories) {
                    console.log(subcategories);
                    var content = "<ul>";
                    for(var i= 0, length = subcategories.length; i < length; i++) {
                        if(subcategories[i].subcategories && subcategories[i].subcategories.length) {
                            content += subcategories[i].category_name+"<li>" + this.buildViewCategoriesTre(subcategories[i].subcategories) + "</li>";
                        } else {
                            content += "<li>" + subcategories[i].category_name + "</li>";
                        }
                        return content += "</ul>";
                    }
                }
            },
            addNewSubcategoryModal: function(e) {
                var modal = new ModalView({
                    template: "#modalSubcategoryView",
                    parent_id: $(e.target).attr("data-category-id")
                });
                Store.modalRegionCategory.show(modal);
            },
            editCategory: function() {
                var modal = new ModalView({
                    model: this.model,
                    template: "#modalCategoryEdit"
                });
                Store.modalRegionCategory.show(modal);
            },
            deleteCategory: function() {
                Spinner.initialize("#categoriesContainer");
                this.model.destroy({
                    wait: true,
                    success: function() {
                        Spinner.destroy({timeout: 700});
                    },
                    error: function(xhr) {
                        require(["views/warningMessageView"], function(WarningView){
                            Spinner.destroy();
                            Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                        });
                    }
                });
            }
		});
	});
	return Store.Categories.Views.CategoryModelView;
});