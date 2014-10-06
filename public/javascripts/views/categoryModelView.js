define(["marionette",
    "Store",
    "views/modalCategoryView",
    "views/spinnerView"], function (Marionette, Store, ModalView, Spinner) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryModelView = Backbone.Marionette.ItemView.extend({
			template: '#categoriesModelTemplate',
			initialize: function () {

			},
			events: {
                "click .addNewSubcategory": "addNewSubcategoryModal",
                "click .editCategory": "editCategory",
                "click .deleteCategory": "deleteCategory",
                "click .collapseChildren": "collapseChildren"

            },
            templateHelpers: {
                renderCategoriesTre: function() {
                    return this.buildViewCategoriesTre(this);
                },
                buildViewCategoriesTre: function(category) {
                    var content = "";
                    if (category.subcategories.length) {
                        var subcategories = category.subcategories;
                        for(var i= 0; i < subcategories.length; i++) {
                            if(subcategories[i].subcategories && subcategories[i].subcategories.length) {
                                content += "<tr class='level level" + subcategories[i].level + "'>" +
                                    "<td class='categoryName'><a><i class='fa fa-plus-square-o'></i>" +
                                    subcategories[i].category_name+"</a></td>" +
                                    "<td class='col-md-2'></td></tr>" +
                                    this.buildViewCategoriesTre(subcategories[i]);
                            } else {
                                content += "<tr class='level level" + subcategories[i].level +
                                    "'><td class='categoryName'><a><i class='fa fa-square-o'></i>" +
                                    subcategories[i].category_name + "</a></td><td class='col-md-2'></td></tr>";
                            }
                        }
                        return content;
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
            },
            collapseChildren: function(event) {
                $(event.target).parents('table').find("tbody").toggle("display");
                $(event.target).find(".fa").toggleClass("fa-plus-square-o").toggleClass("fa-minus-square-o");
            }
		});
	});
	return Store.Categories.Views.CategoryModelView;
});