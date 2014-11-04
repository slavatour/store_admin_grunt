define(["marionette", "Store", "views/spinnerView"], function (Marionette, Store, Spinner) {

    Store.module("Specifications.Views", function(Views, Store, Backbone, Marionette, $, _){
        Views.ModalSpecificationsView = Backbone.Marionette.ItemView.extend({
            template: null,
            events: {
                "click .saveSpecificationGroup": "saveSpecificationGroup",
                "click .addNewSpecificationItem": "saveSpecificationGroup",
                "click .saveSpecification": "saveSpecification"
            },
            initialize: function() {

            },
            saveSpecificationGroup: function(event) {
                event.preventDefault();
                var that = this;
                this.model.save({
                    specification_name: $.trim($("#specificationName").val()),
                    specification_description: $.trim($("#specificationDescription").val())
                }, {
                    wait: true,
                    success: function(model) {
                        $("#specificationsModal").modal("hide");
                        Store.request("specifications:controller").rerenderView();
                    },
                    error: function(model, xhr) {
                        require(["AlertsController"], function(AlertsController){
                            var msg = "Server could not save new group, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: that.el,
                                message: msg,
                                temporary: true
                            });
                        });
                    }
                });
            },
            saveSpecification: function(event) {
                event.preventDefault();
                var that = this,
                    specificationsClass = that.model.toJSON(),
                    elemId = that.options.parent_id,
                    newValue = $.trim($("#specificationName").val());
                this.findModel({
                    id: elemId,
                    collection: specificationsClass,
                    success: function(data){
                        that.model.set(data);
                        var values = that.model.get("specification_values") || {value: []};
                        values.value.push(newValue);
                        that.model.set("specification_values", values);
                        that.model.save({}, {
                            wait: true,
                            success: function(model) {
                                $("#specificationsModal").modal("hide");
                                Store.request("specifications:controller").rerenderView();
                            },
                            error: function(model, xhr) {
                                require(["AlertsController"], function(AlertsController){
                                    var msg = "Server could not save new group, contact with server administrator or try later.";
                                    new AlertsController({
                                        type: "error",
                                        container: that.el,
                                        message: msg,
                                        temporary: true
                                    });
                                });
                            }
                        });
                    }
                });
            },
            findModel: function(options) {
                var that = this,
                    id = options.id,
                    collection = options.collection,
                    callbackFunction = options.success,
                    result = {};
                if (collection.specifications && collection.specifications.length) {
                    for(var i= 0, length = collection.specifications.length; i < length; i++) {
                        if (id == collection.specifications[i].specification_id) {
                            callbackFunction(collection.specifications[i]);
                        } else {
                            that.findModel({
                                id: id,
                                collection: collection.specifications[i],
                                success: callbackFunction
                            });
                        }
                    }
                }
            }
        });
    });

    return Store.Specifications.Views.ModalSpecificationsView;
});