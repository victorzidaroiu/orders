/* global describe, it */


import restler from 'restler';
import dotenv from 'dotenv';
import _debug from 'debug';
const debug = _debug('api-test');
dotenv.config({ silent: true })

const serverUrl = `http://localhost:${process.env.PORT}`;

var lastInsertedId = null;
describe('Orders API', function() {
	this.timeout(5000);
	it('should get the list of orders', () => {
		restler.get(`${serverUrl}/api/orders`).on('success', (data, response) => {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array) {
				done();
      }
		});
	});

	it('should get the list of top orders', () => {
		restler.get(server + '/api/top-orders').on('success', (data, response) => {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array)
				done();
		});
	});

	it('should insert an order and return the id', () => {
		restler.post(server + '/api',{
			data: {
				companyName: 'companyName',
				customerAddress: 'test customerAddress',
				orderedItem: 'test orderedItem'
			}
		}).on('success', (data, response) => {
			debug('Returned Data: ');
			debug(data);
			if (data && data._id) {
				lastInsertedId = data._id;
				done();
			}
		});
	});

	it('should find orders', () => {
		restler.get(server + '/api/search/search-term').on('success', (data, response) => {
			debug('Returned Data: ');
			debug(data);
			if (data instanceof Array) {
        done();
      }
		});
	});

	it('should delete an order', () => {
		if (!lastInsertedId) {
      return;
    }

		restler.del(`${server}/api/lastInsertedId`).on('success', (data, response) => {
			debug('Returned Data: ');
			debug(data);
			if (data && data._id) {
        done();
      }
		});
	});
});
