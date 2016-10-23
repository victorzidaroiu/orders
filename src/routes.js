var express = require('express');
var router = express.Router();
var debug = require('debug')('API');
var controllers = require('./controllers/_index.js');

router.get('/', controllers.home);
router.get('/api/orders/list', controllers.orderList);
router.get('/api/orders/top', controllers.orderTop);
router.post('/api/orders/create', controllers.orderCreate);
router.get('/api/orders/details/:id', controllers.orderGet);
router.get('/api/orders/search/:name', controllers.orderSearch);
router.put('/api/orders/update/:id', controllers.orderUpdate);
router.delete('/api/orders/delete/:id', controllers.orderDelete);

module.exports = router;
