define(["marionette"], function (Marionette) {
	var StoreRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"" 						: "index",
			"/" 					: "index",
			"categories" 			: "showCategories",
			"products" 				: "showProducts",
			"slider"				: "showSliderEdit",
			"examples"				: "examples"

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
            });
		},
		showSliderEdit: function () {
            this.routeView({
                toggleContainer: '.sliderContainer',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#slider']"
            });
			require(["SliderController"], function (SliderController) {
				new SliderController().renderView();
			});
		},
        examples: function () {
            this.routeView({
                toggleContainer: '.exampleWidgets',
                selectorTab: '#tabOther',
                selectorBtn: "a[href='#examples']"
            });
            require(["chartjs"], function(Chart){
                var ctx = $("#chart_div").get(0).getContext("2d");
                var data = {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [
                        {
                            label: "My First dataset",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [65, 59, 80, 81, 56, 55, 40]
                        },
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(38,202,40,0.2)",
                            strokeColor: "rgba(38,202,40,1)",
                            pointColor: "rgba(38,202,40,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [28, 48, 40, 19, 86, 27, 90]
                        }
                    ]
                };
                var options = {
                    scaleShowGridLines : true,
                    scaleGridLineColor : "rgba(0,0,0,.05)",
                    scaleGridLineWidth : 1,
                    bezierCurve : true,
                    bezierCurveTension : 0.4,
                    pointDot : true,
                    pointDotRadius : 4,
                    pointDotStrokeWidth : 1,
                    pointHitDetectionRadius : 20,
                    datasetStroke : true,
                    datasetStrokeWidth : 2,
                    datasetFill : true,
                    showTooltips: true,
                    tooltipEvents: ["mousemove", "touchstart", "touchmove"],
                    tooltipFillColor: "rgba(0,0,0,0.8)",
                    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    tooltipFontSize: 14,
                    tooltipFontStyle: "normal",
                    tooltipFontColor: "#fff",
                    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    tooltipTitleFontSize: 14,
                    tooltipTitleFontStyle: "bold",
                    tooltipTitleFontColor: "#fff",
                    tooltipYPadding: 6,
                    tooltipXPadding: 6,
                    tooltipCaretSize: 8,
                    tooltipCornerRadius: 6,
                    tooltipXOffset: 10,
                    multiTooltipTemplate: "<%= value %>",
                    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
                    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
                };
                var myLineChart = new Chart(ctx).Line(data, options);

            });
        },
        routeView: function(options) {
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
