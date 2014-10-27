var SpecificationsRepository = require('../repositories/SpecificationsRepository');
var SpecificationsService = require('../service/SpecificationsService');


exports.SpecificationsController = function (conString) {
    var specificationsRepository = SpecificationsRepository.SpecificationsRepository(conString),
        specificationsService = SpecificationsService.SpecificationsService(conString);
    return {
        saveSpecification: specificationsRepository.saveSpecification,
        putSpecification: specificationsRepository.putSpecification,
        deleteSpecification: specificationsRepository.deleteSpecification,
        fetchSpecifications: specificationsService.fetchSpecifications
    };
};