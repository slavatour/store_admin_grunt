define(["marionette"], function (Marionette) {

    var AlertView = Backbone.Marionette.ItemView.extend({
        template: null,
        renderView: function() {
            var options = this.options;
        },
        render: function(container) {
            if(!$(container).find(".alertContainer").length) {
                $(container).prepend("<div class='alertContainer'></div>");
            }
                $(container).find(".alertContainer").html(this.template(this.model.toJSON()));
            return this;
        },
        setTemplate: function(keyWord) {
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
        }
    });

    return AlertView;
});