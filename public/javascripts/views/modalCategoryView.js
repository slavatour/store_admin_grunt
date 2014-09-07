define(["marionette"], function (Marionette) {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: "#modalView",
			events: {
				'click .deleteSubcategory': 'deleteSubcategory'
			},
			deleteSubcategory: function () {
				var subId = this.model.get('id');
				this.model.url = 'subcategories/'+subId;
				this.model.destroy({
					success: function (model, responce) {
						console.log("success", model);
					},
					error: function (data) {
						console.log("error", data);
					},
					wait: true
				});
			}
		});
	});
	return Store.Common.Views.ModalView;
});