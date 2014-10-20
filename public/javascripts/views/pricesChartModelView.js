define([
    "marionette",
    "Store",
    "views/spinnerView",
    "chartjs"
], function (
    Marionette,
    Store,
    Spinner,
    Chart) {

    Store.module("Prices.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.PricesChartModelView = Backbone.Marionette.ItemView.extend({
            template: "#pricesChartTemplate",
            initialize: function() {

            },
            onShow: function() {
                var chartContainer = $("#pricesChartContainer"),
                    canvasHeight = chartContainer.height(),
                    canvasWidth = chartContainer.width(),
                    ctx = chartContainer.get(0).getContext("2d");
                ctx.canvas.width = canvasWidth;
                ctx.canvas.height = canvasHeight;
                var data = {
                    labels: this.model.get('labels'),
                    datasets: [
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(151,187,205,0.5)",
                            strokeColor: "rgba(151,187,205,0.8)",
                            highlightFill: "rgba(151,187,205,0.75)",
                            highlightStroke: "rgba(151,187,205,1)",
                            data: this.model.get('data')
                        }
                    ]
                };
                var options = {
                    animationSteps: 300,
                    scaleBeginAtZero : true,
                    scaleShowGridLines : true,
                    scaleGridLineColor : "rgba(0,0,0,.05)",
                    scaleGridLineWidth : 1,
                    barShowStroke : true,
                    barStrokeWidth : 1,
                    barValueSpacing : 5,
                    barDatasetSpacing : 1
                };
                var myBarChart = new Chart(ctx).Bar(data, options);
            }
        });
    });

    return Store.Prices.Views.PricesChartModelView;
});