define(["Store", "marionette", "views/spinnerView", "SpecificationModel"], function (Store, Marionette, Spinner, SpecificationModel) {

    Store.module("Specifications.Views", function (Views, Store, Backbone, Marionette, $, _) {
        Views.SpecificationModelView = Backbone.Marionette.ItemView.extend({
            template: "#specificationsModelView",
            tagName: "li",
            className: "level level0",
            events: {
                "click .specificationName": "collapseChildren",
                "click .addNewSpecificationGroup": "addNewSpecificationGroup",
                "click .addNewSpecificationItem": "addNewSpecificationGroup",
                "click .addNewSpecification": "addNewSpecification",
                "click .deleteSpecification": "deleteSpecification",
                "click .deleteSpecificationValue": "deleteSpecificationValue"
            },
            initialize: function() {

            },
            templateHelpers: {
                renderSpecificationsTre: function() {
                    return this.buildViewSpecificationsTree(this);
                },
                buildViewSpecificationsTree: function(specification) {
                    var content = "<ul class='child'>",
                        serviceBtnsGroup = $("#specificationsGroupServiceBtnsTemplate").html(),
                        serviceBtnsSpecifications = $("#specificationsServiceBtnsTemplate").html(),
                        serviceBtnsSpecification = $("#specificationServiceBtnsTemplate").html();
                    if (specification.specifications.length) {
                        var specifications = specification.specifications;
                        for(var i= 0; i < specifications.length; i++) {
                            if(specifications[i].specifications && specifications[i].specifications.length) {
                                content += "<li class='level level" + specifications[i].level + "'>" +
                                    "<a class='specificationName'><i class='fa fa-caret-right'></i>" +
                                    specifications[i].specification_name+"</a>" +
                                    "<div class='btn-group pull-right serviceBtns' data-id='" + specifications[i].specification_id +
                                    "'>" + serviceBtnsGroup +  "</div>" +
                                    this.buildViewSpecificationsTree(specifications[i]);
                            } else {
                                content += "<li class='level level" + specifications[i].level +
                                    "'><a class='specificationName'><i class='fa fa-caret-right'></i>" +
                                    specifications[i].specification_name + "</a>" +
                                    "<div class='btn-group pull-right serviceBtns' data-id='" + specifications[i].specification_id +"'>";
                                if(specifications[i].specification_values && specifications[i].specification_values.value) {
                                    content += serviceBtnsSpecifications + "</div>";
                                    var values = specifications[i].specification_values.value;
                                    content += "<ul class='child'>";
                                    _.each(values, function (key, value) {
                                        content += "<li class='level level" + (specifications[i].level + 1) + "' data-index='" + value + "'><a class='specificationName'>" + key + "</a>" +
                                            "<div class='btn-group pull-right serviceBtns' data-id='" + specifications[i].specification_id +
                                            "'>" + serviceBtnsSpecification + "</div>";
                                    });
                                    content += "</ul>";
                                }else if(specifications[i].level > 2) {
                                    content += serviceBtnsSpecifications + "</div>";
                                } else {
                                    content += serviceBtnsGroup +  "</div>";
                                }
                            }
                        }
                        return content + "</ul>";
                    }
                }
            },
            addNewSpecificationGroup: function(events) {
                events.preventDefault();
                var parent_id = $(events.target).parent().attr("data-id");
                require(["SpecificationModel", "ModalSpecificationsView"], function(SpecificationModel, ModalSpecificationsView){
                    var specificationModel = new SpecificationModel({
                        specification_parent_id: parent_id
                    });
                    var modalSpecificationsView = new ModalSpecificationsView({
                        template: "#specificationsModalTemplate",
                        model: specificationModel
                    });
                    Store.modalSpecificationPrices.show(modalSpecificationsView);
                });
            },
            addNewSpecification: function(event) {
                event.preventDefault();
                var parent_id = $(event.target).parent().attr("data-id"),
                    that = this;
                require(["SpecificationModel", "ModalSpecificationsView"], function(SpecificationModel, ModalSpecificationsView){
                    var modalSpecificationsView = new ModalSpecificationsView({
                        template: "#specificationModalTemplate",
                        model: that.model,
                        parent_id: parent_id
                    });
                    Store.modalSpecificationPrices.show(modalSpecificationsView);
                });
            },
            deleteSpecification: function(event) {
                event.stopPropagation();
                if (!confirm("Do you really want delete this specification?")) {
                    return;
                }
                var that = this;
                var id = $(event.target).parents(".serviceBtns").attr("data-id");
                var specificationModel = new SpecificationModel({
                    id: id
                });
                specificationModel.destroy({
                    wait: true,
                    success: function() {
                        Store.request("specifications:controller").rerenderView();
                    },
                    error: function() {
                        require(["AlertsController"], function(AlertsController){
                            var msg = "Server could not delete specifications, contact with server administrator or try later.";
                            new AlertsController({
                                type: "error",
                                container: ".specificationsTable",
                                message: msg,
                                temporary: true
                            });
                        });
                    }
                });
            },
            deleteSpecificationValue: function(event) {
                event.preventDefault();
                if(!confirm("Do you really want delete this specification?")) {
                    return;
                }
                var that = this,
                    specificationsClass = that.model.toJSON(),
                    elemId = $(event.target).parents(".serviceBtns").attr("data-id"),
                    valueIndex = $(event.target).parents("li.level").attr("data-index");
                this.findModel({
                    id: elemId,
                    collection: specificationsClass,
                    success: function(data){
                        that.model.set(data);
                        var values = that.model.get("specification_values");
                        values.value.splice(valueIndex, 1);
                        that.model.set("specification_values", values);
                        console.log(that.model);
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
            },
            collapseChildren: function(event) {
                $(event.target).parent("li").children("ul").toggle("display");
                $(event.target).find(".fa").toggleClass("fa-caret-right").toggleClass("fa-caret-down");
            }
        });
    });
    return Store.Specifications.Views.SpecificationModelView;
});