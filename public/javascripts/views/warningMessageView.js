define(["marionette"], function (Marionette) {

    var WarningView = Backbone.Marionette.ItemView.extend({
        template: "#warningTemplate",
        templateHelpers: {
            appendMessage: function() {
                return this.options.message;
            }
        },
        initialize: function(options) {
            this.templateHelpers.options = options;
        },
        onRender: function () {
            $(".warningContainer").fadeIn(500);
        }
    });

    return WarningView;
});