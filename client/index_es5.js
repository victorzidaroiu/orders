'use strict';

angular.module('productsApp', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/product_list.html',
		controller: 'ProductListController'
	}).otherwise({
		redirectTo: '/'
	});
}]).controller('ProductListController', function ($scope, $http) {
	var orders = this;

	$http.get(':8081/api/').success(function (data) {});

	orders.list = [];

	orders.delete = function (orderId) {
		$http.delete(':8081/api/' + orderId).success(function () {
			orders.list = orders.list.filter(function (order) {
				if (order.orderId === orderId) return false;else return true;
			});
		});
	};

	orders.add = function () {
		$http.post(':8081/api/', {
			companyName: orders.name,
			customerAddress: orders.description,
			orderedItem: orders.price
		}).success(function (data) {
			orders.list.push({
				ProductID: data.ProductID,
				name: orders.name,
				price: parseFloat(orders.price).formatMoney(2, '.', ',')
			});
			orders.name = '';
			orders.price = '';
			orders.description = '';
		});
	};
});
