var SlidersRepository = require('../repositories/SlidersRepository');


exports.SliderController = function (conString) {
	var slidersRepository = SlidersRepository.SlidersRepository(conString);
	return slidersRepository;
};