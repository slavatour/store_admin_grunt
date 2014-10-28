define(["marionette", "views/spinnerView"], function (Marionette, Spinner) {
	var StoreRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"" 						: "index",
			"/" 					: "index",
			"categories" 			: "showCategories",
			"products" 				: "showProducts",
			"new_product"			: "showNewProduct",
            "specifications"    	: "showSpecification",
            "slider"				: "showSliderEdit",
			"brands"				: "showBrands",
			"currencies"			: "showCurrencies",
			"discounts"	    		: "showDiscounts",
			"prices"		    	: "showPrices",
			"examples"				: "examples",
			"d3js"			    	: "d3js"

		},
		index: function () {
            $('.contentContainer > div').css('display', 'none');
			$('.indexContainer').css('display', 'block');
		},
		showCategories: function () {
            this.routeView({
                toggleContainer: '#categoriesContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#categories']"
            });
            require(["CategoriesController"], function (CategoriesController) {
				var categoriesController = new CategoriesController();
				categoriesController.renderView();
                Spinner.destroy({timeout: 700});
            });
		},
		showProducts: function () {
            this.routeView({
                toggleContainer: '.productsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#products']"
            });
            require(["ProductsController"], function(ProductsController){
                var productsController = new ProductsController();
                productsController.renderView();
                Spinner.destroy({timeout: 700});
            });
		},
        showNewProduct: function() {
            this.routeView({
                toggleContainer: '.newProductsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#products']"
            });
            require(["ProductsNewController"], function(ProductsNewController){
                var productNewController = new ProductsNewController();
                productNewController.renderView();
                Spinner.destroy();
                Store.reqres.setHandler("productsNew:controller", function(){
                    return this;
                }, productNewController);
            });
        },
        showSpecification: function() {
            this.routeView({
                toggleContainer: '.specificationsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#products']"
            });
            require(["SpecificationsController"], function(SpecificationsController){
                var specificationController = new SpecificationsController();
                specificationController.renderView();
                Store.reqres.setHandler("specifications:controller", function(){
                    return this;
                }, specificationController);
            });
            Spinner.destroy({timeout: 700});
        },
		showSliderEdit: function () {
            this.routeView({
                toggleContainer: '.sliderContainer',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#slider']"
            });
			require(["SliderController"], function (SliderController) {
				new SliderController().renderView();
                Spinner.destroy({timeout: 700});
			});
		},
        showBrands: function() {
            this.routeView({
                toggleContainer: '.brandsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#brands']"
            });
            require(["BrandsController"], function (BrandsController) {
                new BrandsController().renderView();
                Spinner.destroy({timeout: 700});
            });
        },
        showCurrencies: function() {
            this.routeView({
                toggleContainer: '.currenciesContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#currencies']"
            });
            require(["CurrenciesController"], function (CurrenciesController) {
                new CurrenciesController().renderView();
                Spinner.destroy({timeout: 700});
            });
        },
        showDiscounts: function() {
            this.routeView({
                toggleContainer: '.discountsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#discounts']"
            });
            Spinner.destroy({timeout: 700});
        },
        showPrices: function() {
            this.routeView({
                toggleContainer: '.pricesContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#prices']"
            });
            require(["PricesController"], function (PricesController) {
                var pricesController =  new PricesController();
                pricesController.renderView();
                Spinner.destroy({timeout: 700});
                Store.reqres.setHandler("prices:controller", function(){
                    return this;
                }, pricesController);
            });
        },
        examples: function () {
            this.routeView({
                toggleContainer: '.exampleWidgets',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#examples']"
            });
            Spinner.destroy({timeout: 700});
        },
        d3js: function() {
            this.routeView({
                toggleContainer: '.d3container',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#examples']"
            });
            Spinner.destroy({timeout: 700});

            var data = [
                {
                    name: "one",
                    value: 123.02
                },
                {
                    name: "two",
                    value: 62.02
                },
                {
                    name: "tree",
                    value: 50.36
                },
                {
                    name: "four",
                    value: 89.15
                },
                {
                    name: "five",
                    value: 213.69
                },
                {
                    name: "six",
                    value: 12.6
                }

            ];

            d3.select(".d3study")
            .append("div")
                .attr("class", "chart")
            .selectAll("div.line")
                .data(data)
                .enter()
                .append("div")
                .attr("class", "line");

            d3.selectAll("div.line")
                .append('div')
                .attr("class", "lab")
                .text(function(d){return d.name});
            d3.selectAll("div.line")
                .append("div")
                .attr("class", "bar")
                .style("width", function(d){return d.value+"px"})
                .style("background-color", function(d){
                    if(d.value < 51) {
                        return "green";
                    } else {
                        return "DarkRed";
                    }
                })
                .text(function(d){return Math.round(d.value)});





            var margin = 50,
                width = 700,
                height = 300;
            var data1 = [
                {
                    "collision_with_injury": 3.2,
                    "dist_between_fail": 3924.0,
                    "customer_accident_rate": 2.12
                },
                {
                    "collision_with_injury": 1.2,
                    "dist_between_fail": 2356.0,
                    "customer_accident_rate": 1.12
                },
                {
                    "collision_with_injury": 2.5,
                    "dist_between_fail": 5236.0,
                    "customer_accident_rate": 0.23
                },
                {
                    "collision_with_injury": 4.1,
                    "dist_between_fail": 1236.0,
                    "customer_accident_rate": 2.56
                }
            ];

            d3.json("give_me_json_please.html", function(error, data){console.log(error)});

            d3.select(".d3study")
                .append("svg")
                .style("width", width)
                .style("height", height)
                .selectAll("circle")
                .data(data1)
                .enter()
                .append("circle");
            var x_extent = d3.extent(data1, function(d){return d.collision_with_injury});
            var y_extent = d3.extent(data1, function(d){return d.dist_between_fail});
            var x_scale = d3.scale.linear()
                .range(margin, width - margin)
                .domain(x_extent);
            var y_scale = d3.scale.linear()
                .range(height - margin, margin)
                .domain(y_extent);
            d3.selectAll("circle")
                .attr("cx", function(d){return x_scale(d.collision_with_injury)})
                .attr("cy", function(d){return y_scale(d.dist_between_fail)});


            d3.selectAll("circle")
                .attr("r", 5);



        },
        routeView: function(options) {
            Spinner.initialize(options.toggleContainer);
            $('.contentContainer > div').css('display', 'none');
            $(options.toggleContainer).css('display', 'block');
            var idCollapse = $(options.selectorTab).attr("href");
            if(!$(idCollapse).hasClass('in')) {
                $(".leftNav").removeClass('active');
                $(options.selectorTab).trigger('click');
                $(options.selectorBtn).addClass('active');
            }
        }
	});
	return StoreRouter;
});
