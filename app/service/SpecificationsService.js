var SpecificationsRepository = require('../repositories/SpecificationsRepository');

exports.SpecificationsService = function (conString) {
    var self = {};

    self.fetchSpecifications = function(callbackFunction) {
        var specificationsRepository = new SpecificationsRepository.SpecificationsRepository(conString);
        specificationsRepository.fetchSpecifications(function(options){
            if(options.error) {
                callbackFunction({result: options.error, status: 500});
            } else {
                var specifications = [],
                    subSpecifications = [];
                for (var i= 0, length = options.result.length; i < length; i++) {
                    options.result[i]["specification_parent_id"] == null ? specifications.push(options.result[i]) : subSpecifications.push(options.result[i]);
                }
                var subSpecificationsTree = [];
                for (var i= 0, length = subSpecifications.length; i < length; i++) {
                    var subSpecification =_buildCategoriesTree(subSpecifications[i], subSpecifications);
                    subSpecifications[i].specifications = subSpecification;
                    subSpecificationsTree.push(subSpecifications[i]);
                }
                for (var i= 0, length = specifications.length; i < length; i++) {
                    var subSpecification =_buildCategoriesTree(specifications[i], subSpecificationsTree);
                    specifications[i].specifications = subSpecification;
                }
                callbackFunction({result: specifications, status: 200});
            }
        });
    };
    return self;
};

function _buildCategoriesTree (specifications, subSpecifications) {
    specifications.specifications = specifications.specifications || [];
    for (var i= 0, length = subSpecifications.length; i < length; i++) {
        if(specifications.specification_id == subSpecifications[i].specification_parent_id) {
            specifications.specifications.push(subSpecifications[i]);
        }
    }
    return specifications.specifications;
}
