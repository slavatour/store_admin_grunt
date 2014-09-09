define(["marionette"], function (Marionette) {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: "#modalCategoryView",
            events: {
                "click .close": "closeModal"
            },
            closeModal: function(e) {
                $("#categoryModal").modal("hide");
            }
		});
	});
	return Store.Common.Views.ModalView;
});