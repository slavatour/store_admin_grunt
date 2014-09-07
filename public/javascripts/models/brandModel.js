define(function () {
    
    Store.module("Brands.Models", function (Brands, Store, Backbone, Marionette, $, _) {
        Models.BrandModel = Backbone.Model.extend({
            defaults: {
                brand_id: null,
                brand_image_url: null,
                brand_description: null,
                brand_full_name: null,
                brand_short_name: null
            }
        });
    });
    
    return Store.Brands.Models.BrandModel;
});