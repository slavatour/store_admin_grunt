define(["Store", "marionette", "ModalSliderView", "views/spinnerView"], function (Store, Marionette, ModalSliderView, Spinner) {
	
	Store.module("Slider.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SliderModelView = Backbone.Marionette.ItemView.extend({
			template: '#templateSliderItemView',
			tagName: 'tr',
            className: "ui-state-default",
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
                        Spinner.destroy({timeout: 700});
                    },
                    error: function(model, xhr) {
                        require(["views/warningMessageView"], function(WarningView){
                            Spinner.destroy({timeout: 700});
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
                e.preventDefault();
                Spinner.initialize(".sliderContainer");
                var that = this;
                if($(e.target).prop('checked')) {
                    this.model.save({slider_display: true}, {
                        wait: true,
                        success: function () {
                            Spinner.destroy({timeout: 700});
                            $(e.target).prop('checked', true);
                        },
                        error: function (xhr) {
                            require(["views/warningMessageView"], function(WarningView){
                                Spinner.destroy();
                                Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                            });
                        }
                    });
                } else {
                    this.model.save({slider_display: false}, {
                        success: function () {
                            Spinner.destroy({timeout: 700});
                            $(e.target).prop('checked', false);
                        },
                        error: function (xhr) {
                            require(["views/warningMessageView"], function(WarningView){
                                Spinner.destroy();
                                Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                            });
                        }
                    });
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
				var step = $(e.target).attr('data-step'),
                    collection = Store.request("slider:collection"),
                    collectionView = Store.request("slider:collectionView"),
                    currentNumber = this.model.getNumber(),
				    newNumber = (this.model.getNumber() - 1*step).toString(),
                    upperModelNumber = (1*this.model.getNumber() + 1).toString(),
                    newNumberOwner = collection.where({slider_position_in_list: newNumber}),
                    upperModel = collection.where({slider_position_in_list: upperModelNumber});
                if (newNumber > 0 && (upperModel.length !== 0 || step === "1")) {
                    Spinner.initialize(".sliderContainer");
                    this.model.setNumber(newNumber);
                    this.model.save({}, {
                        success: function(model) {
                            collection.sort();
                            collectionView.render();
                            Spinner.destroy({timeout: 700});
                        },
                        error: function(xhr) {
                            require(["views/warningMessageView"], function(WarningView){
                                Spinner.destroy({timeout: 700});
                                Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                            });
                        }
                    });
                    newNumberOwner[0].setNumber(currentNumber);
                    newNumberOwner[0].save({},{
                        success: function(model) {
                            collection.sort();
                            collectionView.render();
                            Spinner.destroy({timeout: 700});
                        },
                        error: function(xhr) {
                            require(["views/warningMessageView"], function(WarningView){
                                Spinner.destroy({timeout: 700});
                                Store.warningRegion.show(new WarningView({message: xhr.statusText}));
                            });
                        }
                    });

                }
            }
		});
	});
	return Store.Slider.Views.SliderModelView;
});