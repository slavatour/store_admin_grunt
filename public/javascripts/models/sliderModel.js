define(["marionette"], function (Marionette) {
	Store.module("Slider.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.SliderModel = Backbone.Model.extend({
			defaults: {
				slider_id: null,
				slider_position_in_list: null,
				slider_name: '',
				slider_description: '',
				slider_url: '',
				slider_image_name: '',
				slider_display: false
			},
            urlRoot: function(){
                return 'slider/';
            },
            initialize: function () {
				this.id = this.get('id');
			},
            setId: function (id) {
                this.set({slider_id: id});
            },
            setNumber: function (number) {
                this.set({slider_position_in_list: number});
            },
            setName: function (name) {
                this.set({slider_name: name});
            },
            setDescription: function (description) {
                this.set({slider_description: description});
            },
            setUrl: function (url) {
                this.set({slider_url: url});
            },
            setImgName: function (img_name) {
                this.set({slider_image_name: img_name});
            },
            setDisplay: function (display) {
                this.set({slider_display: display});
            },
            getId: function () {
                return this.get('slider_id');
            },
            getNumber: function () {
                return this.get('slider_position_in_list');
            },
            getName: function () {
                return this.get('slider_name');
            },
            getDescription: function () {
                return this.get('slider_description');
            },
            getUrl: function () {
                return this.get('slider_url');
            },
            getImgName: function () {
                return this.get('slider_image_name');
            },
            getDisplay: function () {
                return this.get('slider_display');
            }
		});
	});
	return Store.Slider.Models.SliderModel;
});