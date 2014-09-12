define(["marionette", "views/spinnerView"], function (Marionette, Spinner) {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: null,
			events: {
				'click .saveSliderChangesBtn'     	: 	'saveSliderChanges',
				'click .saveNewSliderBtn'			: 	'saveNewSlider'
			},
			initialize: function () {

			},
			saveSliderChanges: function (e) {
				e.preventDefault();
				var collectionSliders = Store.request('slider:collection');
				var collectionSlidersView = Store.request('slider:collectionView');
				var fd = new FormData();
				var file = this.$el.find('#sliderImgEdit')[0].files[0];
				fd.append('slider_id', this.model.getId());
				fd.append('slider_name', this.$el.find('#sliderNameEdit').val());
				fd.append('slider_description', this.$el.find('#sliderDescEdit').val());
				fd.append('slider_url', this.$el.find('#sliderURLEdit').val());
				if(file != undefined) {
					fd.append('file', file);
				}
                Spinner.initialize(".sliderContainer");
				$.ajax({
					type: "PUT",
					url: '/slider/'+this.model.getId(),
					data: fd,
					processData: false,
					contentType: false,
                    success: function(model, status) {
                        collectionSliders.fetch({
                            success: function(data) {
                                collectionSlidersView.render();
                            }
                        });
                        Spinner.destroy({timeout: 700});
                    },
                    error: function(xhr) {
                        require(["views/warningMessageView"], function(WarningView){
                            Spinner.destroy({timeout: 700});
                            Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                        });
                    }
				});
				$('#editModal').modal('hide');
			},
			saveNewSlider: function (e) {
				e.preventDefault();
				var collectionSliders = Store.request('slider:collection');
				var collectionSlidersView = Store.request('slider:collectionView');
				var fd = new FormData();
				fd.append('slider_name', this.$el.find('#sliderName').val());
				fd.append('slider_description', this.$el.find('#sliderDesc').val());
				fd.append('slider_url', this.$el.find('#sliderURL').val());
				fd.append('file', this.$el.find('#sliderImg')[0].files[0]);
                Spinner.initialize(".sliderContainer");
                $.ajax({
					type: "POST",
					url: '/slider',
					data: fd,
					processData: false,
					contentType: false,
                    success: function(model, status) {
                        Spinner.destroy({timeout: 700});
                        collectionSliders.fetch();
                    },
                    error: function(xhr) {
                        require(["views/warningMessageView"], function(WarningView){
                            Spinner.destroy({timeout: 700});
                            Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                        });
                    }
				});
				$('#editModal').modal('hide');
			}

		});
	});
	return Store.Common.Views.ModalView;
});