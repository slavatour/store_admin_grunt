define(["marionette", "views/spinnerView"], function (Marionette, Spinner) {
	var StoreRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"" 						        : "index",
			"/" 			        		: "index",
			"categories" 			        : "showCategories",
			"products" 			        	: "showProducts",
			"new_product"			        : "showNewProduct",
			"edit_product/:id"              : "showEditProduct",
			"edit_product/:subTab/:id"  	: "showEditProductSubTab",
            "specifications"    	        : "showSpecification",
            "slider"			        	: "showSliderEdit",
			"brands"				        : "showBrands",
			"currencies"        			: "showCurrencies",
			"discounts"	    	        	: "showDiscounts",
			"prices"		            	: "showPrices",
			"examples"      				: "examples",
			"d3js"			            	: "d3js"

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
        showEditProduct: function(id) {
            this.routeView({
                toggleContainer: '.newProductsContainer',
                selectorTab: '#tabCategories',
                selectorBtn: "a[href='#products']"
            });
            require(["ProductsNewController"], function(ProductsNewController){
                var productNewController = new ProductsNewController();
                productNewController.productModelId = id;
                productNewController.renderEditView();
                Spinner.destroy();
                Store.reqres.setHandler("productEdit:controller", function(){
                    return this;
                }, productNewController);
            });
        },
        showEditProductSubTab: function(subTab, id) {
            $(".subTab").addClass("hide");
            $("." + subTab).removeClass("hide");
            $(".newProductNav").removeClass("active");
            $("a[data-target-container='" + subTab + "']").addClass("active");
            require(["ProductsNewController"], function(ProductsNewController){
                var productNewController = Store.request("productEdit:controller");
                productNewController.renderSubTabView(subTab);
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
            Spinner.destroy();
            $(".d3study").empty();

            drawPlots();
            drawBars();
            drawCharts();
            drawTree();
            drawMap();
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

function drawPlots() {
    var width = 600,
        height = 300,
        padding = 40,
        data = [
            ['name1', 10],
            ['name2', 21],
            ['name3', 65],
            ['name4', 96],
            ['name5', 124],
            ['name6', 32],
            ['name7', 114],
            ['name8', 49],
            ['name9', 81],
            ['name10', 18],
            ['name11', 218],
            ['name12', 125],
            ['name14', 58]
        ];

    var y = [];
    data.map(function(elem){
        y.push(elem[1]);
    });
    var yScale = d3.scale.linear()
        .domain([0, d3.max(y)])
        .range([padding, height - padding*2]);
    var xScale = d3.scale.linear()
        .domain([0, 50*data.length])
        .range([padding, width - padding*2]);

    d3.select(".d3study").append("div").attr("class", "newDiv");

    var canvas = d3.select(".newDiv").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("padding", padding)
        .attr("class", "plots col-lg-6");

    canvas.selectAll("circle")
        .data(data, function(d){return d[1]})
        .enter()
        .append("circle")
        .attr("cx", function(d, i){return xScale(i*50)})
        .attr("cy", function(d){return height - yScale(0)})
        .attr("r", 3)
        .attr("fill", "steelblue")
        .attr("transform", "translate(20, 0)")
        .attr("class", "points")
        .transition()
        .delay(1000)
        .duration(2000)
        .attr("cy", function(d){return height - yScale(d[1])});
    canvas.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d){return d[0]})
        .attr("transform", function(d, i){return "translate("+ (xScale(i*50) + 25) +","+ (height - yScale(0) + 3) +")"})
        .attr("font-size", "11px")
        .attr("fill", "rgba(0,0,0,.7)")
        .attr("opacity", "0")
        .attr("class", "labelPlots")
        .transition()
        .delay(1000)
        .duration(2000)
        .attr("transform", function(d, i){return "translate("+ (xScale(i*50) + 25) +","+ (height - yScale(d[1]) + 3) +")"})
        .attr("opacity", "1");

    var y = d3.scale.linear()
        .domain([0, d3.max(y)])
        .range([height - padding*2, padding]);
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(7);
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .style("fill", "rgba(0,0,0,.3)")
        .call(xAxis);

    canvas.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding+ ", " + padding + ")")
        .style("fill", "rgba(0,0,0,.3)")
        .call(yAxis);


    var line = d3.svg.line()
        .x(function(d,i){return xScale(i*50) +20})
        .y(function(d,i){return height - yScale(d[1])})
        .interpolate("monotone");
    var lineZero = d3.svg.line()
        .x(function(d,i){return xScale(i*50) +20})
        .y(function(d,i){return height - yScale(0)})
        .interpolate("monotone");
    canvas.append("path")
        .attr("d", lineZero(data))
        .attr("stroke", "rgba(0,0,0,.1)")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .transition()
        .delay(1000)
        .duration(2000)
        .attr("d", line(data));

    var area = d3.svg.area()
        .interpolate("monotone")
        .x(function(d,i){return xScale(i*50) +20})
        .y0(function(d,i){return (height - padding)})
        .y1(function(d,i){return height - yScale(d[1])});
    var areaZero = d3.svg.area()
        .interpolate("monotone")
        .x(function(d,i){return xScale(i*50) +20})
        .y0(function(d,i){return (height - padding)})
        .y1(function(d,i){return height - yScale(0)});
    canvas.append("path")
        .attr("d", areaZero(data))
        .attr("class", "area")
        .style("fill", "rgba(70, 130, 180,.1)")
        .transition()
        .delay(1000)
        .duration(2000)
        .attr("d", area(data));
};

function drawMap() {
    var coordinates = {"type":"FeatureCollection","features":[{"type":"Feature","id":"UKR","properties":{"name":"Ukraine"},"geometry":{"type":"Polygon","coordinates":[[[31.785998,52.101678],[32.159412,52.061267],[32.412058,52.288695],[32.715761,52.238465],[33.7527,52.335075],[34.391731,51.768882],[34.141978,51.566413],[34.224816,51.255993],[35.022183,51.207572],[35.377924,50.773955],[35.356116,50.577197],[36.626168,50.225591],[37.39346,50.383953],[38.010631,49.915662],[38.594988,49.926462],[40.069058,49.601055],[40.080789,49.30743],[39.674664,48.783818],[39.895632,48.232405],[39.738278,47.898937],[38.770585,47.825608],[38.255112,47.5464],[38.223538,47.10219],[37.425137,47.022221],[36.759855,46.6987],[35.823685,46.645964],[34.962342,46.273197],[35.020788,45.651219],[35.510009,45.409993],[36.529998,45.46999],[36.334713,45.113216],[35.239999,44.939996],[33.882511,44.361479],[33.326421,44.564877],[33.546924,45.034771],[32.454174,45.327466],[32.630804,45.519186],[33.588162,45.851569],[33.298567,46.080598],[31.74414,46.333348],[31.675307,46.706245],[30.748749,46.5831],[30.377609,46.03241],[29.603289,45.293308],[29.149725,45.464925],[28.679779,45.304031],[28.233554,45.488283],[28.485269,45.596907],[28.659987,45.939987],[28.933717,46.25883],[28.862972,46.437889],[29.072107,46.517678],[29.170654,46.379262],[29.759972,46.349988],[30.024659,46.423937],[29.83821,46.525326],[29.908852,46.674361],[29.559674,46.928583],[29.415135,47.346645],[29.050868,47.510227],[29.122698,47.849095],[28.670891,48.118149],[28.259547,48.155562],[27.522537,48.467119],[26.857824,48.368211],[26.619337,48.220726],[26.19745,48.220881],[25.945941,47.987149],[25.207743,47.891056],[24.866317,47.737526],[24.402056,47.981878],[23.760958,47.985598],[23.142236,48.096341],[22.710531,47.882194],[22.64082,48.15024],[22.085608,48.422264],[22.280842,48.825392],[22.558138,49.085738],[22.776419,49.027395],[22.51845,49.476774],[23.426508,50.308506],[23.922757,50.424881],[24.029986,50.705407],[23.527071,51.578454],[24.005078,51.617444],[24.553106,51.888461],[25.327788,51.910656],[26.337959,51.832289],[27.454066,51.592303],[28.241615,51.572227],[28.617613,51.427714],[28.992835,51.602044],[29.254938,51.368234],[30.157364,51.416138],[30.555117,51.319503],[30.619454,51.822806],[30.927549,52.042353],[31.785998,52.101678]]]}}]};
//            var coordinates = {"type":"FeatureCollection","features":[
//                {"type":"Feature","id":"USA","properties":{"name":"United States of America"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-155.54211,19.08348],[-155.68817,18.91619],[-155.93665,19.05939],[-155.90806,19.33888],[-156.07347,19.70294],[-156.02368,19.81422],[-155.85008,19.97729],[-155.91907,20.17395],[-155.86108,20.26721],[-155.78505,20.2487],[-155.40214,20.07975],[-155.22452,19.99302],[-155.06226,19.8591],[-154.80741,19.50871],[-154.83147,19.45328],[-155.22217,19.23972],[-155.54211,19.08348]]],[[[-156.07926,20.64397],[-156.41445,20.57241],[-156.58673,20.783],[-156.70167,20.8643],[-156.71055,20.92676],[-156.61258,21.01249],[-156.25711,20.91745],[-155.99566,20.76404],[-156.07926,20.64397]]],[[[-156.75824,21.17684],[-156.78933,21.06873],[-157.32521,21.09777],[-157.25027,21.21958],[-156.75824,21.17684]]],[[[-157.65283,21.32217],[-157.70703,21.26442],[-157.7786,21.27729],[-158.12667,21.31244],[-158.2538,21.53919],[-158.29265,21.57912],[-158.0252,21.71696],[-157.94161,21.65272],[-157.65283,21.32217]]],[[[-159.34512,21.982],[-159.46372,21.88299],[-159.80051,22.06533],[-159.74877,22.1382],[-159.5962,22.23618],[-159.36569,22.21494],[-159.34512,21.982]]],[[[-94.81758,49.38905],[-94.64,48.84],[-94.32914,48.67074],[-93.63087,48.60926],[-92.61,48.45],[-91.64,48.14],[-90.83,48.27],[-89.6,48.01],[-89.272917,48.019808],[-88.378114,48.302918],[-87.439793,47.94],[-86.461991,47.553338],[-85.652363,47.220219],[-84.87608,46.900083],[-84.779238,46.637102],[-84.543749,46.538684],[-84.6049,46.4396],[-84.3367,46.40877],[-84.14212,46.512226],[-84.091851,46.275419],[-83.890765,46.116927],[-83.616131,46.116927],[-83.469551,45.994686],[-83.592851,45.816894],[-82.550925,45.347517],[-82.337763,44.44],[-82.137642,43.571088],[-82.43,42.98],[-82.9,42.43],[-83.12,42.08],[-83.142,41.975681],[-83.02981,41.832796],[-82.690089,41.675105],[-82.439278,41.675105],[-81.277747,42.209026],[-80.247448,42.3662],[-78.939362,42.863611],[-78.92,42.965],[-79.01,43.27],[-79.171674,43.466339],[-78.72028,43.625089],[-77.737885,43.629056],[-76.820034,43.628784],[-76.5,44.018459],[-76.375,44.09631],[-75.31821,44.81645],[-74.867,45.00048],[-73.34783,45.00738],[-71.50506,45.0082],[-71.405,45.255],[-71.08482,45.30524],[-70.66,45.46],[-70.305,45.915],[-69.99997,46.69307],[-69.237216,47.447781],[-68.905,47.185],[-68.23444,47.35486],[-67.79046,47.06636],[-67.79134,45.70281],[-67.13741,45.13753],[-66.96466,44.8097],[-68.03252,44.3252],[-69.06,43.98],[-70.11617,43.68405],[-70.645476,43.090238],[-70.81489,42.8653],[-70.825,42.335],[-70.495,41.805],[-70.08,41.78],[-70.185,42.145],[-69.88497,41.92283],[-69.96503,41.63717],[-70.64,41.475],[-71.12039,41.49445],[-71.86,41.32],[-72.295,41.27],[-72.87643,41.22065],[-73.71,40.931102],[-72.24126,41.11948],[-71.945,40.93],[-73.345,40.63],[-73.982,40.628],[-73.952325,40.75075],[-74.25671,40.47351],[-73.96244,40.42763],[-74.17838,39.70926],[-74.90604,38.93954],[-74.98041,39.1964],[-75.20002,39.24845],[-75.52805,39.4985],[-75.32,38.96],[-75.071835,38.782032],[-75.05673,38.40412],[-75.37747,38.01551],[-75.94023,37.21689],[-76.03127,37.2566],[-75.72205,37.93705],[-76.23287,38.319215],[-76.35,39.15],[-76.542725,38.717615],[-76.32933,38.08326],[-76.989998,38.239992],[-76.30162,37.917945],[-76.25874,36.9664],[-75.9718,36.89726],[-75.86804,36.55125],[-75.72749,35.55074],[-76.36318,34.80854],[-77.397635,34.51201],[-78.05496,33.92547],[-78.55435,33.86133],[-79.06067,33.49395],[-79.20357,33.15839],[-80.301325,32.509355],[-80.86498,32.0333],[-81.33629,31.44049],[-81.49042,30.72999],[-81.31371,30.03552],[-80.98,29.18],[-80.535585,28.47213],[-80.53,28.04],[-80.056539,26.88],[-80.088015,26.205765],[-80.13156,25.816775],[-80.38103,25.20616],[-80.68,25.08],[-81.17213,25.20126],[-81.33,25.64],[-81.71,25.87],[-82.24,26.73],[-82.70515,27.49504],[-82.85526,27.88624],[-82.65,28.55],[-82.93,29.1],[-83.70959,29.93656],[-84.1,30.09],[-85.10882,29.63615],[-85.28784,29.68612],[-85.7731,30.15261],[-86.4,30.4],[-87.53036,30.27433],[-88.41782,30.3849],[-89.18049,30.31598],[-89.593831,30.159994],[-89.413735,29.89419],[-89.43,29.48864],[-89.21767,29.29108],[-89.40823,29.15961],[-89.77928,29.30714],[-90.15463,29.11743],[-90.880225,29.148535],[-91.626785,29.677],[-92.49906,29.5523],[-93.22637,29.78375],[-93.84842,29.71363],[-94.69,29.48],[-95.60026,28.73863],[-96.59404,28.30748],[-97.14,27.83],[-97.37,27.38],[-97.38,26.69],[-97.33,26.21],[-97.14,25.87],[-97.53,25.84],[-98.24,26.06],[-99.02,26.37],[-99.3,26.84],[-99.52,27.54],[-100.11,28.11],[-100.45584,28.69612],[-100.9576,29.38071],[-101.6624,29.7793],[-102.48,29.76],[-103.11,28.97],[-103.94,29.27],[-104.45697,29.57196],[-104.70575,30.12173],[-105.03737,30.64402],[-105.63159,31.08383],[-106.1429,31.39995],[-106.50759,31.75452],[-108.24,31.754854],[-108.24194,31.34222],[-109.035,31.34194],[-111.02361,31.33472],[-113.30498,32.03914],[-114.815,32.52528],[-114.72139,32.72083],[-115.99135,32.61239],[-117.12776,32.53534],[-117.295938,33.046225],[-117.944,33.621236],[-118.410602,33.740909],[-118.519895,34.027782],[-119.081,34.078],[-119.438841,34.348477],[-120.36778,34.44711],[-120.62286,34.60855],[-120.74433,35.15686],[-121.71457,36.16153],[-122.54747,37.55176],[-122.51201,37.78339],[-122.95319,38.11371],[-123.7272,38.95166],[-123.86517,39.76699],[-124.39807,40.3132],[-124.17886,41.14202],[-124.2137,41.99964],[-124.53284,42.76599],[-124.14214,43.70838],[-124.020535,44.615895],[-123.89893,45.52341],[-124.079635,46.86475],[-124.39567,47.72017],[-124.68721,48.184433],[-124.566101,48.379715],[-123.12,48.04],[-122.58736,47.096],[-122.34,47.36],[-122.5,48.18],[-122.84,49],[-120,49],[-117.03121,49],[-116.04818,49],[-113,49],[-110.05,49],[-107.05,49],[-104.04826,48.99986],[-100.65,49],[-97.22872,49.0007],[-95.15907,49],[-95.15609,49.38425],[-94.81758,49.38905]]],[[[-153.006314,57.115842],[-154.00509,56.734677],[-154.516403,56.992749],[-154.670993,57.461196],[-153.76278,57.816575],[-153.228729,57.968968],[-152.564791,57.901427],[-152.141147,57.591059],[-153.006314,57.115842]]],[[[-165.579164,59.909987],[-166.19277,59.754441],[-166.848337,59.941406],[-167.455277,60.213069],[-166.467792,60.38417],[-165.67443,60.293607],[-165.579164,59.909987]]],[[[-171.731657,63.782515],[-171.114434,63.592191],[-170.491112,63.694975],[-169.682505,63.431116],[-168.689439,63.297506],[-168.771941,63.188598],[-169.52944,62.976931],[-170.290556,63.194438],[-170.671386,63.375822],[-171.553063,63.317789],[-171.791111,63.405846],[-171.731657,63.782515]]],[[[-155.06779,71.147776],[-154.344165,70.696409],[-153.900006,70.889989],[-152.210006,70.829992],[-152.270002,70.600006],[-150.739992,70.430017],[-149.720003,70.53001],[-147.613362,70.214035],[-145.68999,70.12001],[-144.920011,69.989992],[-143.589446,70.152514],[-142.07251,69.851938],[-140.985988,69.711998],[-140.992499,66.000029],[-140.99777,60.306397],[-140.012998,60.276838],[-139.039,60.000007],[-138.34089,59.56211],[-137.4525,58.905],[-136.47972,59.46389],[-135.47583,59.78778],[-134.945,59.27056],[-134.27111,58.86111],[-133.355549,58.410285],[-132.73042,57.69289],[-131.70781,56.55212],[-130.00778,55.91583],[-129.979994,55.284998],[-130.53611,54.802753],[-131.085818,55.178906],[-131.967211,55.497776],[-132.250011,56.369996],[-133.539181,57.178887],[-134.078063,58.123068],[-135.038211,58.187715],[-136.628062,58.212209],[-137.800006,58.499995],[-139.867787,59.537762],[-140.825274,59.727517],[-142.574444,60.084447],[-143.958881,59.99918],[-145.925557,60.45861],[-147.114374,60.884656],[-148.224306,60.672989],[-148.018066,59.978329],[-148.570823,59.914173],[-149.727858,59.705658],[-150.608243,59.368211],[-151.716393,59.155821],[-151.859433,59.744984],[-151.409719,60.725803],[-150.346941,61.033588],[-150.621111,61.284425],[-151.895839,60.727198],[-152.57833,60.061657],[-154.019172,59.350279],[-153.287511,58.864728],[-154.232492,58.146374],[-155.307491,57.727795],[-156.308335,57.422774],[-156.556097,56.979985],[-158.117217,56.463608],[-158.433321,55.994154],[-159.603327,55.566686],[-160.28972,55.643581],[-161.223048,55.364735],[-162.237766,55.024187],[-163.069447,54.689737],[-164.785569,54.404173],[-164.942226,54.572225],[-163.84834,55.039431],[-162.870001,55.348043],[-161.804175,55.894986],[-160.563605,56.008055],[-160.07056,56.418055],[-158.684443,57.016675],[-158.461097,57.216921],[-157.72277,57.570001],[-157.550274,58.328326],[-157.041675,58.918885],[-158.194731,58.615802],[-158.517218,58.787781],[-159.058606,58.424186],[-159.711667,58.93139],[-159.981289,58.572549],[-160.355271,59.071123],[-161.355003,58.670838],[-161.968894,58.671665],[-162.054987,59.266925],[-161.874171,59.633621],[-162.518059,59.989724],[-163.818341,59.798056],[-164.662218,60.267484],[-165.346388,60.507496],[-165.350832,61.073895],[-166.121379,61.500019],[-165.734452,62.074997],[-164.919179,62.633076],[-164.562508,63.146378],[-163.753332,63.219449],[-163.067224,63.059459],[-162.260555,63.541936],[-161.53445,63.455817],[-160.772507,63.766108],[-160.958335,64.222799],[-161.518068,64.402788],[-160.777778,64.788604],[-161.391926,64.777235],[-162.45305,64.559445],[-162.757786,64.338605],[-163.546394,64.55916],[-164.96083,64.446945],[-166.425288,64.686672],[-166.845004,65.088896],[-168.11056,65.669997],[-166.705271,66.088318],[-164.47471,66.57666],[-163.652512,66.57666],[-163.788602,66.077207],[-161.677774,66.11612],[-162.489715,66.735565],[-163.719717,67.116395],[-164.430991,67.616338],[-165.390287,68.042772],[-166.764441,68.358877],[-166.204707,68.883031],[-164.430811,68.915535],[-163.168614,69.371115],[-162.930566,69.858062],[-161.908897,70.33333],[-160.934797,70.44769],[-159.039176,70.891642],[-158.119723,70.824721],[-156.580825,71.357764],[-155.06779,71.147776]]]]}}
//            ]};
    var canvas = d3.select(".d3study").append("svg")
        .attr("width", 760)
        .attr("height", 700)
        .attr("class", "col-lg-12");
    var group = canvas.selectAll("g")
        .data(coordinates.features)
        .enter()
        .append("g");

    var projection = d3.geo.mercator();
    var path = d3.geo.path().projection(projection);

    var areas = group.append("path")
        .attr("d", path)
        .attr("fill", "steelblue")
        .attr("class", "area");
}

function drawTree() {
    var dataTree = {
        name:"main",
        children: [
            {
                name : "one",
                children: [
                    {name: "oneOne"},
                    {name: "oneTwo"},
                    {name: "oneThree"}
                ]
            },
            {
                name : "two",
                children: [
                    {name: "twoOne"},
                    {name: "twoTwo"},
                    {name: "twoThree"}
                ]
            }
        ]

    };



    var canvas = d3.select(".d3study").append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("class", "col-lg-6")
        .append("g")
        .attr("transform", "translate(50, 50)");
    var tree = d3.layout.tree()
        .size([400,400]);
    var nodes = tree.nodes(dataTree);
    var links = tree.links(nodes);

    var node = canvas.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d){return "translate(" + d.y + ", " + d.x + ")";});

    node.append("circle")
        .attr("r", 5)
        .attr("fill", "steelblue");
    node.append("text")
        .text(function(d){return d.name})
        .attr("transform", "translate(5,5)");
    var diagonal = d3.svg.diagonal()
        .projection(function(d){return [d.y, d.x]});
    canvas.selectAll(".links")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "links")
        .attr("fill", "none")
        .attr("stroke", "rgba(0,0,0,.1)")
        .attr("d", diagonal);
}

function drawCharts() {
    var dataHA = [
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
            value: 30
        }

    ];
    var dataHU = [
        {
            name: "one",
            value: 12.02
        },
        {
            name: "two",
            value: 162.02
        },
        {
            name: "tree",
            value: 150.36
        },
        {
            name: "four",
            value: 59.15
        },
        {
            name: "five",
            value: 91.69
        },
        {
            name: "six",
            value: 130
        }

    ];


    d3.select(".d3study")
        .append("div")
        .attr("class", "chart")
        .attr("class", "col-lg-6")
        .selectAll("div.line")
        .data(dataHA)
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
        .style("background-color", function(d){
            return "steelblue";
        })
        .transition()
        .duration(2000)
        .style("width", function(d){return d.value+"px"})
        .text(function(d){return Math.round(d.value)});
}

function drawBars() {
    var dataset = [10,30,60];
    var r = 100;
    var color = d3.scale.ordinal()
        .range(["blue", "red", "green"]);

    var canvas = d3.select(".d3study").append("svg")
        .attr("width", 400)
        .attr("height", 400)
        .attr("class", "col-lg-3");

    var group = canvas.append("g")
        .attr("transform", "translate(100, 100)");

    var arc = d3.svg.arc()
        .innerRadius(r-50)
        .outerRadius(r);
    var arcZero = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(0);

    var pie = d3.layout.pie()
        .value(function(d){return d});

    var arcs = group.selectAll(".arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d){return color(d.data)})
        .attr("opacity", "0.5");

    arcs.append("text")
        .attr("transform", function(d){return "translate("+ arc.centroid(d)+")";})
        .text(function(d){return d.data});

}