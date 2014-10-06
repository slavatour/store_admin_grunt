define(["marionette", "Store"], function (Marionette, Store) {
    
    Store.module("Brands.Models", function (Models, Store, Backbone, Marionette, $, _) {
        Models.BrandModel = Backbone.Model.extend({
            defaults: {
                brand_id: null,
                brand_url: null,
                brand_description: null,
                brand_name: null,
                brand_photo: null
            }
        });
    });
    
    return Store.Brands.Models.BrandModel;
});