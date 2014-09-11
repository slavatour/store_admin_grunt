define(["Store", "marionette", "ModalSliderView", "views/spinnerView"], function (Store, Marionette, ModalSliderView, Spinner) {
	
	Store.module("Slider.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SliderModelView = Backbone.Marionette.ItemView.extend({
			template: '#templateSliderItemView',
			tagName: 'tr',
			events: {
				'click .editSliderBtn'				: 	'editSlider', 
				'click .deleteSliderBtn'			: 	'deleteSlider',
				'click .btn-toggle'					: 	'toggleDisplayStatus',
				"click .sliderPhoto"				: 	"showSliderPhoto",
				'click .numberEdit'					: 	'changeNumber'
			},
			deleteSlider: function () {
                Spinner.initialize(".sliderContainer");
				this.model.destroy({
                    wait: true,
                    success: function() {
                        Spinner.destroy();
                    },
                    error: function(model, xhr) {
                        require(["views/warningMessageView"], function(WarningView){
                            Spinner.destroy();
                            Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                        });
                    }
                });
			},
			editSlider: function () {
				var modal = new ModalSliderView({
					template: '#modalEditSlider',
					model: this.model
				});
				Store.modalRegion.show(modal);	
			},
			toggleDisplayStatus: function (e) {
                var that = this;
				if(!$(e.target).hasClass('active')) {
					if($(e.target).text() == 'off') {
						$(e.currentTarget.lastChild).removeClass('btn-default').addClass('active btn-danger');
						$(e.currentTarget.firstChild).removeClass('active btn-primary').addClass('btn-default');
                        this.model.save({slider_display: false},{wait:true});
					} else {
						$(e.currentTarget.lastChild).removeClass('active btn-danger').addClass('btn-default');
						$(e.currentTarget.firstChild).removeClass('btn-default').addClass('active btn-primary');
                        this.model.save({slider_display: true}, {wait:true});
					}
				}
			},
			showSliderPhoto: function () {
				var modal = new ModalSliderView({
					template: '#modalPhoto',
					model: this.model
				});
				Store.modalRegion.show(modal);				
			},
			changeNumber: function (e) {
				var collectionSliders = Store.request('slider:collection');
				var collectionSlidersView = Store.request('slider:collectionView');
				var step = $(e.target).attr('data-step');
				var number = this.model.getNumber() - 1*step;
				if( number > 0 ) {
					this.model.setNumber(number);
				}
			}
		});
	});
	return Store.Slider.Views.SliderModelView;
});