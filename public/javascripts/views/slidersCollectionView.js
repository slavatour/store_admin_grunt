define(["marionette", "SliderModelView", "views/spinnerView", "jqueryui/sortable"], function (Marionette, SliderModelView, Spinner) {
	
	Store.module("Slider.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SlidersCollectionView = Backbone.Marionette.CompositeView.extend({
			template: '#templateSliderCompositeView',
            childView: Views.SliderModelView,
            childViewContainer: "tbody",
			events: {
				"click .addSliderBtn": "addNewSlider",
                "sortstop #sortableSlider" : "changeNumber"
			},
			collectionEvents: {
                "change": "changeCollection"
			},
            //MYTODO make in photoshop dotted area for
            onShow: function(){
                //initialize jquery UI sortable for slider table
                this.initSortableCells();
                $(".tooltipHas").tooltip();
            },
            initialize: function () {
                Spinner.initialize(".sliderTable");
            },
            changeCollection: function () {

            },
			addNewSlider: function (e) {
				var modal = new Store.Common.Views.ModalView({
					template: '#modalNewSlider'
				});
				Store.modalRegion.show(modal);
			},
            changeNumber: function(event, ui) {
                //MYTODO finish func for change positions in list parameter
                console.log(ui.item[0]);
                console.log($(ui.item[0]).next());
                console.log($(ui.item[0]).before());
            },
            //MYTODO make sortable independent module
            initSortableCells: function() {
                $("#sortableSlider").sortable({
                    placeholder: "ui-state-highlight",
                    axis: "y",
                    revert: true,
                    opacity: 0.7,
                    cursor: "move",
                    handle: ".numberEdit"
                });
                $("#sortableSlider").disableSelection();
            }
		});
	});
	return Store.Slider.Views.SlidersCollectionView;
});