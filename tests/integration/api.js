/* global describe, it */

import 'babel-polyfill';
import restler from 'restler';
import dotenv from 'dotenv';
import _debug from 'debug';
import { expect } from 'chai';
/* eslint-disable */
import server from '../../src/server';
/* eslint-enable */
const debug = _debug('api');
dotenv.config({ silent: true });

const serverUrl = `http://localhost:${process.env.PORT}`;
let lastInsertedId = null;

debug(`Testing app on ${serverUrl}`);

describe('Orders API', () => {
  it('should get the list of orders', (done) => {
    restler.get(`${serverUrl}/api/orders/list`).on('success', (data) => {
      if (data instanceof Array) {
        done();
      }
    });
  });

  it('should get the list of top orders', (done) => {
    restler.get(`${serverUrl}/api/orders/top`).on('success', (data) => {
      if (data instanceof Array) {
        done();
      }
    });
  });

  it('should insert an order and return the id', (done) => {
    restler.post(`${serverUrl}/api/orders/create`, {
      data: {
        companyName: 'Company name',
        customerAddress: 'Customer address',
        orderedItem: 'Item name',
      },
    }).on('success', (data) => {
      /* eslint-disable */
      expect(typeof data._id).to.equal('string');
      lastInsertedId = data._id;
      done();
      /* eslint-enable */
    });
  });

  it('should find orders by item name', (done) => {
    const toSearch = 'Item name';
    restler.get(`${serverUrl}/api/orders/search/${toSearch}`).on('success', (data) => {
      expect(data instanceof Array).to.equal(true);
      expect(data[0].orderedItem).to.equal(toSearch);
      done();
    });
  });

  it('should find orders by company name', (done) => {
    const toSearch = 'Company name';
    restler.get(`${serverUrl}/api/orders/search/${toSearch}`).on('success', (data) => {
      expect(data instanceof Array).to.equal(true);
      expect(data[0] instanceof Object).to.equal(true);
      expect(data[0].companyName).to.equal(toSearch);
      done();
    });
  });

  it('should find orders by customer address', (done) => {
    const toSearch = 'Customer address';
    restler.get(`${serverUrl}/api/orders/search/${toSearch}`).on('success', (data) => {
      expect(data instanceof Array).to.equal(true);
      expect(data[0] instanceof Object).to.equal(true);
      expect(data[0].customerAddress).to.equal(toSearch);
      done();
    });
  });
});

describe('Orders API', () => {
  it('should delete previously inserted item', (done) => {
    expect(lastInsertedId).to.not.equal(null);

    restler.del(`${serverUrl}/api/orders/delete/${lastInsertedId}`).on('success', (data) => {
      /* eslint-disable */
      expect(typeof data._id).to.equal('string');
      /* eslint-enable */
      done();
    });
  });
});
