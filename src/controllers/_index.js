var controllers = { };

controllers.home = require('./home.js');
controllers.orderList = require('./order-list');
controllers.orderCreate = require('./order-create');
controllers.orderDelete = require('./order-delete');
controllers.orderGet = require('./order-get');
controllers.orderSearch = require('./order-search');
controllers.orderUpdate = require('./order-update');
controllers.orderTop = require('./order-top');

module.exports = controllers;
