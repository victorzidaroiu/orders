var mongoose = require('mongoose');
var ordersModel = require('../models/orders.js');

module.exports = function (req, res, next) {
	ordersModel.findById(req.params.id, function (err, data) {
		if (err)
			res.json(false);
		else
			res.json(data);
	});
};
