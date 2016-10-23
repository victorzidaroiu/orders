var rest = require('restler');
var debug = require('debug')('api-test');
require('dotenv').config({ silent: true })

var server = 'http://localhost:' + process.env.PORT;

var lastInsertedId = null;
describe('Orders API', function() {
	this.timeout(5000);
	it('should get the list of orders', function(done) {
		rest.get(server + '/api/orders').on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array)
				done();
		});
	});

	it('should get the list of top orders', function(done) {
		rest.get(server + '/api/top-orders').on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array)
				done();
		});
	});

	it('should insert an order and return the id', function(done) {
		rest.post(server + '/api',{
			data: {
				companyName: 'companyName',
				customerAddress: 'test customerAddress',
				orderedItem: 'test orderedItem'
			}
		}).on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data && data._id) {
				lastInsertedId = data._id;
				done();
			}
		});
	});

	it('should find orders', function(done) {
		rest.get(server + '/api/search/search-term').on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array)
				done();
		});
	});

	it('should delete an order', function(done) {
		if (!lastInsertedId)
			return;

		rest.del(server + '/api/' + lastInsertedId).on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data && data._id)
				done();
		});
	});
});
