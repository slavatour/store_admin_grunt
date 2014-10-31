define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Products.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.ProductModel = Backbone.Model.extend({
			defaults: {
                id: null,
				product_id: null,

                product_parent_id: null,
                product_brand_id: null,

                product_full_name: null,
                product_short_name: null,
                product_short_description: null,
                product_full_description: null,
                product_specification: null, // характеристика
                product_barcode: null,
                product_start_date: null,
                product_end_date: null,

                product_pricesType: null, //тип цен (масив: тип цены: цена)
                product_price: null, //розница (основная цена)

                product_photosUrls: null, // масив список названий фото

                product_discounts: null, //тип скидки
                product_discountsValues: null, //размер скидки


                product_stock: null, //наличие на складе
                product_quantityStock: null, //количество на складе

                product_quantityOrders: null, //статистика количество заказов
                product_quantitySendItems: null, //статистика количество отправленых товаров
                product_quantityPaidItems: null, //статистика количество оплаченых
                product_rating: null // оценка товара посетителями

			},
            urlRoot: "product",
            validate: function(attr) {
                var invalid = [];

                if(attr.product_parent_id === null) {
                    invalid.push("product_parent_id");
                }
                if(attr.product_brand_id === null) {
                    invalid.push("product_brand_id");
                }
                if(!attr.product_full_name) {
                    invalid.push("product_full_name");
                }
                if(!attr.product_short_name) {
                    invalid.push("product_short_name");
                }
                if(!attr.product_short_description) {
                    invalid.push("product_short_description");
                }
                if(!attr.product_full_description) {
                    invalid.push("product_full_description");
                }
                if(attr.product_barcode_EAN13 && !/^[0-9]{13}$/.test(attr.product_barcode_EAN13)) {
                    invalid.push("product_barcode_EAN13");
                }
                if(attr.product_barcode_UPC && !/^[0-9]{12}$/.test(attr.product_barcode_UPC)) {
                    invalid.push("product_barcode_UPC");
                }
                if(!attr.product_start_date) {
                    invalid.push("product_start_date");
                }

                if(invalid.length) {
                    return invalid;
                }
            }
		});
	});
    return Store.Products.Models.ProductModel;
});
