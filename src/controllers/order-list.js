var mongoose = require('mongoose');
var ordersModel = require('../models/orders.js');

module.exports = function (req, res, next) {
	ordersModel.find({}, function (err, orders) {
		if (err)
			res.json(false);
		else
			res.json(orders);
	});
}
