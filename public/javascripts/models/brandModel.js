define(["marionette", "Store"], function (Marionette, Store) {
    
    Store.module("Brands.Models", function (Models, Store, Backbone, Marionette, $, _) {
        Models.BrandModel = Backbone.Model.extend({
            defaults: {
                brand_id: null,
                brand_url: null,
                brand_description: null,
                brand_name: null,
                brand_photo: null
            },
            url: "/brand",
            validate: function(attr) {
                var invalid = [];
                if(!attr.brand_url) {
                    invalid.push("brand_url");
                }
                if(!attr.brand_description) {
                    invalid.push("brand_description");
                }
                if(!attr.brand_name) {
                    invalid.push("brand_name");
                }
                if(!attr.brand_photo) {
                    invalid.push("brand_photo");
                }

                if(invalid.length) {
                    return invalid;
                }
            }
        });
    });
    
    return Store.Brands.Models.BrandModel;
});