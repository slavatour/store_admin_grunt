define(["marionette"], function (Marionette) {

    var AlertView = Backbone.Marionette.ItemView.extend({
        template: null,
        initialize: function() {

        },
        renderView: function() {
            var options = this.options;
        },
        render: function() {
            var container = this.options.container;
            if(!$(container).find(".alertContainer").length) {
                $(container).prepend("<div class='alertContainer'></div>");
            }
                $(container).find(".alertContainer").html(this.template(this.model.toJSON()));
            if(this.options.temporary) {
                this.temporaryView();
            }
            return this;
        },
        setTemplate: function() {
            var keyWord = this.options.type;
            var id;
            switch(keyWord) {
                case "error":
                    id = "#errorAlertsTemplate";
                    break;
                case "warning":
                    id = "#warningAlertsTemplate";
                    break;
                case "info":
                    id = "#infoAlertsTemplate";
                    break;
                case "success":
                    id = "#successAlertsTemplate";
                    break;
            }
            this.template = _.template($(id).html());
        },
        temporaryView: function() {
            var that = this,
                alert = $(this.options.container).find(".alertContainer");
            setTimeout(function(){
                alert.animate({
                    opacity: "0"
                }, 2000, function(){

                });
            }, 3000)
        }
    });

    return AlertView;
});