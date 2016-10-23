var mongoose = require('mongoose');
var ordersModel = require('../models/orders.js');

module.exports = function (req, res, next) {
	ordersModel.find({
		$or: [
			{companyName: req.params.name},
			{customerAddress: req.params.name},
			{orderedItem: req.params.name}]
	}, function (err, data) {
		if (err)
			res.json(false);
		else
			res.json(data);
	});
};
