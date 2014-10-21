define(["marionette", "Store", "CurrencyHistoryModelView", "moment", "jqueryui/datepicker"], function (Marionette, Store, CurrencyHistoryModelView, moment) {

    Store.module("Currencies.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.CurrenciesHistoryCollectionView = Backbone.Marionette.CompositeView.extend({
            template: "#currenciesHistoryCollectionTemplate",
            childView: CurrencyHistoryModelView,
            childViewContainer: ".currencyHistoryModelsContainer",
            className: "panel panel-default subPanel",
            events: {
                "click .refreshHistoryTable" : "refreshHistoryTable",
                "change .hasDatePicker" : "changeDatepickerDate",
                "click .historyView.closed" : "toggleHistoryView"
            },
            onShow: function() {
                this.initializeDatepicker();
                this.setCurrenciesSelect();
                this.initCharts();
            },
            onRender: function() {
                this.initializeDatepicker();
                this.setCurrenciesSelect();
                this.initCharts();
            },
            initializeDatepicker: function () {
                var that = this,
                    from = moment.unix(that.collection.defaults.startDate),
                    to = moment.unix(that.collection.defaults.endDate);
                $("#andDate").datepicker({
                    dateFormat: "dd.mm.yy",
                    minDate: from.format("DD.MM.YYYY")
                });
                $("#startDate").datepicker({
                    dateFormat: "dd.mm.yy",
                    maxDate: to.format("DD.MM.YYYY")
                });
                $("#andDate").attr( "value", to.format("DD.MM.YYYY") );
                $("#startDate").attr( "value", from.format("DD.MM.YYYY") );
            },
            refreshHistoryTable: function() {
                var that = this,
                    currency = that.$el.find(".currenciesSelect option:selected").val(),
                    startDate = moment(that.$el.find("#startDate").datepicker( "getDate" )).startOf('day').format("X"),
                    endDate = moment(that.$el.find("#andDate").datepicker( "getDate" )).endOf('day').format("X");
                that.collection.defaults.startDate = startDate;
                that.collection.defaults.endDate = endDate;
                that.collection.defaults.currency_id = currency;
                that.collection.setUrl().fetch();
            },
            changeDatepickerDate: function(event) {
                var id = $(event.target).attr('id'),
                    value = $(event.target).val();
                if(id === "andDate") {
                    $("#startDate").datepicker("option", "maxDate", value);
                } else {
                    $("#andDate").datepicker("option", "minDate", value);
                }
            },
            setCurrenciesSelect: function() {
                var collection = this.collection.toJSON(),
                    iso = _.uniq(_.pluck(collection, "currency_iso_code")),
                    content = "<option>All</option>";
                _.each(iso, function(item){
                     content += "<option>" + item + "</option>"
                });
                this.$el.find(".currenciesSelect").html(content);
                this.collection.defaults.uniq_iso = iso;
            },
            toggleHistoryView: function(event) {
                var toggleContainer = $(event.target).attr("data-toggle-target");
                $(".historyView").toggleClass("active").toggleClass("closed");
                $(".toggleContainer").hide(400);
                $(toggleContainer).show(700);
            },
            initCharts: function() {
                var collection = this.collection.toJSON(),
                    iso = this.collection.defaults.uniq_iso,
                    labels = _.uniq(_.pluck(collection, "currency_history_date_update")),
                    datasets = [];
                _.each(iso, function(item) {
                    var data = _.pluck(_.where(collection, {"currency_iso_code": item}), "currency_history_value");
                    var elem = {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data
                    }
                    datasets.push(elem);
                });
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