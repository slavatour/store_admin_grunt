$(document).ready(function () {

	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.Loading = Marionette.ItemView.extend({
			template: "#loadingView",
			onShow: function () {
				var options = {
					lines: 20,
					length: 20,
					width: 2,
					radius: 30,
					corners: 1,
					rotate: 0,
					direction: 1,
					color: '#000',
					speed: 1,
					trail: 60,
					shadow: false,
					hwaccel: false,
					className: 'spiner',
					zIndex: 2e9,
					top: '50px',
					left: '100px'
				};
				$('#spinner').spin(options);
			}
		});
	});

});
