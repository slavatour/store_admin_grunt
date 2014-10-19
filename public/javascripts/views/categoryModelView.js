define(["marionette",
    "Store",
    "views/modalCategoryView",
    "views/spinnerView",
    "CategoryModel"], function (Marionette, Store, ModalView, Spinner, CategoryModel) {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryModelView = Backbone.Marionette.ItemView.extend({
			template: '#categoriesModelTemplate',
            tagName: "ul",
			initialize: function () {

			},
			events: {
                "click .addNewSubcategory": "addNewSubcategoryModal",
                "click .editCategory": "editCategory",
                "click .deleteCategory": "deleteCategory",
                "click .categoryName": "collapseChildren",

            },
            templateHelpers: {
                renderCategoriesTre: function() {
                    return this.buildViewCategoriesTre(this);
                },
                buildViewCategoriesTre: function(category) {
                    var content = "<ul class='child'>",
                        serviceBtns = $("#categoriesServiceBtnsTemplate").html();
                    if (category.subcategories.length) {
                        var subcategories = category.subcategories;
                        for(var i= 0; i < subcategories.length; i++) {
                            if(subcategories[i].subcategories && subcategories[i].subcategories.length) {
                                content += "<li class='level level" + subcategories[i].level + "'>" +
                                    "<a class='categoryName'><i class='fa fa-caret-right'></i>" +
                                    subcategories[i].category_name+"</a>" +
                                    "<div class='btn-group pull-right serviceBtns' data-id='" + subcategories[i].category_id +
                                    "'>" + serviceBtns +  "</div>" +
                                    this.buildViewCategoriesTre(subcategories[i]);
                            } else {
                                content += "<li class='level level" + subcategories[i].level +
                                    "'><a class='categoryName'>" +
                                    subcategories[i].category_name + "</a>" +
                                    "<div class='btn-group pull-right serviceBtns' data-id='" + subcategories[i].category_id +
                                    "'>" + serviceBtns +  "</div>";
                            }
                        }
                        return content + "</ul>";
                    }
                }
            },
            addNewSubcategoryModal: function(event) {
                var modal = new ModalView({
                    template: "#modalCategoryView",
                    model: new CategoryModel(),
                    parent_id: $(event.target).parent().attr("data-id")
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
                $(event.target).parent("li").children("ul").toggle("display");
                $(event.target).find(".fa").toggleClass("fa-caret-right").toggleClass("fa-caret-down");
            }
		});
	});
	return Store.Categories.Views.CategoryModelView;
});