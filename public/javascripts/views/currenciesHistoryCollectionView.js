define(["marionette", "Store", "config", "CurrencyHistoryModelView", "moment"], function (Marionette, Store, Config, CurrencyHistoryModelView, moment) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.CurrenciesHistoryCollectionView = Backbone.Marionette.CompositeView.extend({
            template: "#currenciesHistoryCollectionTemplate",
            childView: CurrencyHistoryModelView,
            childViewContainer: ".currencyHistoryModelsContainer",
            className: "panel panel-default subPanel",
            onShow: function() {
                this.initializeDatepicker();
            },
            onRender: function() {
                this.initCharts();
            },
            initializeDatepicker: function () {
                require(["jqueryui/datepicker"], function(){
                    $(".hasDatePicker").datepicker({
                        dateFormat: "dd.mm.yy"
                    });
                });
            },
            initCharts: function() {
                require(["chartjs"], function(Chart){
                    var chartContainer = $("#currenciesHistoryChartsContainer"),
                        canvasHeight = chartContainer.height(),
                        canvasWidth = chartContainer.width(),
                        ctx = chartContainer.get(0).getContext("2d");
                    ctx.canvas.width = canvasWidth;
                    ctx.canvas.height = canvasHeight;
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
                        multiTooltipTemplate: "",
                        tooltipTemplate: "",
                        legendTemplate : ""
                    };
                    var myLineChart = new Chart(ctx).Line(data, options);

                });
            }
        });
    });

    return Store.Currencies.Views.CurrenciesHistoryCollectionView;
});