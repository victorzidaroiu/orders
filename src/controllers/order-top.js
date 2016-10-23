var mongoose = require('mongoose');
var ordersModel = require('../models/orders.js');

module.exports = function (req, res, next) {
	var agg = [
		{$group: {
			_id: "$orderedItem",
			timesOrdered: {$sum: 1}
		}},
		{$sort:{
			timesOrdered: -1
		}}
	];

	ordersModel.aggregate(agg, function(err, orders){
		if (err)
			throw err;
		else {
			orders.map(function(order){
				order.orderedItem = order._id;
				delete order._id;

				return order;
			});
			res.json(orders);
		}
	});
}
