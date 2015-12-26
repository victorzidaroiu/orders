var rest = require('restler');
var debug = require('debug')('api-test')

var lastInsertedId = null;

describe('Orders API', function() {
	this.timeout(5000);
	it('should get the list of orders', function(done) {
		rest.get('http://advisorking.com:8081/api/orders').on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array)
				done();
		});
	});

	it('should get the list of top orders', function(done) {
		rest.get('http://advisorking.com:8081/api/top-orders').on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array)
				done();
		});
	});

	it('should insert an order and return the id', function(done) {
		rest.post('http://advisorking.com:8081/api',{
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

	it('should find the orders of a company', function(done) {
		rest.get('http://advisorking.com:8081/api/find-company/companyName').on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array)
				done();
		});
	});

	it('should find the orders of an address', function(done) {
		rest.get('http://advisorking.com:8081/api/find-address/test customerAddress').on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array)
				done();
		});
	});

	it('should delete an order', function(done) {
		if (!lastInsertedId)
			return;

		rest.del('http://advisorking.com:8081/api/' + lastInsertedId).on('success', function(data, response) {
			debug('Returned Data: ');
			debug(data);
			if (data && data._id)
				done();
		});
	});
});