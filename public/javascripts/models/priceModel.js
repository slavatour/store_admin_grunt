define(["marionette", "Store", "backbone-computedfields"], function (Marionette, Store, Computedfields) {

    Store.module("Prices.Models", function (Models, Store, Backbone, Marionette, $, _) {
        Models.PriceModel = Backbone.Model.extend({
            defaults: {
                price_name: null,
                price_description: null,
                //MYTODO in init ask customer insert base brice(has to be equal to 1)
                price_base: null, //bool value only base price = true
                price_calculation_method: null, //due to base price(%) or manually
                price_calculation_percent: null,
                price_default: null, //default price for front end site and unauthorised customers(bool, only one true)
                price_include_tax: null,
                price_country: null
            },
            urlRoot: "/price",
            validate: function(attr) {
                var invalid = [];
                if(!attr.price_name) {
                    invalid.push("price_name");
                }
                if(!attr.price_description) {
                    invalid.push("price_description");
                }
                if(attr.price_calculation_method == "automatically" && attr.price_calculation_percent == "") {
                    invalid.push("price_calculation_percent");
                    invalid.push("price_calculation_method");
                }

                if(invalid.length) {
                    return invalid;
                }
            },
            initialize: function() {
                this.computedFields = new Backbone.ComputedFields(this);
                this.id = this.get('id');
            },
            computed: {
                price_value: {
                    depends: ["price_calculation_method", "price_calculation_percent"],
                    toJSON: true,
                    get: function(fields) {
                        var value = null;
                        if(fields.price_calculation_method == "automatically") {
                            value = 1 + (1 * fields.price_calculation_percent)/100;
                        }
                        return value;
                    }
                }
            }

        });
    });

    return Store.Prices.Models.PriceModel;
});