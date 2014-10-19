define(["marionette"], function (Marionette) {

    var AlertView = Backbone.Marionette.ItemView.extend({
        template: null,
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
            this.template = id;
        }
    });

    return AlertView;
});