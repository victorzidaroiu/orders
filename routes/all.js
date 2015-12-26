var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ordersModel = require('../models/orders.js');
var debug = require('debug')('API');

/* GET home page. */

router.get('/', function (req, res, next) {
	res.render('index', {title: 'Orders App'});
});


/* REST API */

router.get('/api/orders', function (req, res, next) {
	ordersModel.find({}, function (err, orders) {
		if (err)
			res.json(false);
		else
			res.json(orders);
	});
});

router.get('/api/top-orders', function (req, res, next) {
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
});

router.post('/api', function (req, res, next) {
	ordersModel.create(req.body, function (err, data) {
		if (err)
			res.json(false);
		else
			res.json(data);
	});
});

router.get('/api/:id', function (req, res, next) {
	ordersModel.findById(req.params.id, function (err, data) {
		if (err)
			res.json(false);
		else
			res.json(data);
	});
});

router.get('/api/search/:name', function (req, res, next) {
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
});

router.put('/api/:id', function (req, res, next) {
	ordersModel.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
		if (err)
			res.json(false);
		else
			res.json(data);
	});
});

router.delete('/api/:id', function (req, res, next) {
	ordersModel.findByIdAndRemove(req.params.id, req.body, function (err, data) {
		if (err)
			res.json(false);
		else
			res.json(data);
	});
});

module.exports = router;
