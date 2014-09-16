define(["marionette", "Store"], function (Marionette, Store) {

    Store.module("Products.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.ProductModel = Backbone.Model.extend({
			defaults: {
                id: null,
				product_id: null,
                product_parent_id: null,
                product_fullname: "",
                product_shortname: "",
                product_description: "",
                product_specification: null, // характеристика
                product_pricesType: "", //тип цен (масив: тип цены: цена)
                product_price: null, //розница (основная цена)
                product_photosUrls: null, // масив список названий фото
                product_discounts: "", //тип скидки
                product_discountsValues: null, //размер скидки
                product_brand_id: null,
                product_stock: false, //наличие на складе
                product_quantityStock: null, //количество на складе
                product_quantityOrders: null, //статистика количество заказов
                product_quantitySendItems: null, //статистика количество отправленых товаров
                product_quantityPaidItems: null, //статистика количество оплаченых
                product_raiting: null, // оценка товара посетителями
                product_barcode: null,
                product_start_date: null,
                product_end_date: null
			}
		});
	});
    return Store.Products.Models.ProductModel;
});
