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


                product_stock: false, //наличие на складе
                product_quantityStock: null, //количество на складе

                product_quantityOrders: null, //статистика количество заказов
                product_quantitySendItems: null, //статистика количество отправленых товаров
                product_quantityPaidItems: null, //статистика количество оплаченых
                product_rating: null // оценка товара посетителями

			}
		});
	});
    return Store.Products.Models.ProductModel;
});
