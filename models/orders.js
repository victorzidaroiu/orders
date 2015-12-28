var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	companyName: String,
	customerAddress: String,
	orderedItem: String
});

module.exports = mongoose.model('Orders', schema);