angular.module('ordersApp', ['ngRoute'])
	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'partials/list.html',
					controller: 'OrdersListController',
					title: 'Orders List'
				})
				.when('/top-orders', {
					templateUrl: 'partials/top.html',
					controller: 'topOrdersController',
					title: 'Top Ordered Items'
				}).
				otherwise({
					redirectTo: '/'
				});
		}])
	.controller('topOrdersController', ["$scope", "$http", function ($scope, $http) {
		let _this = this;
		_this.list = [];

		$scope.orders = _this;

		_this.get = function() {
			$http.get('/api/top-orders').success(function (data) {
				_this.list = data.map(function (order) {
					order.orderId = order._id;
					delete order._id;
					return order;
				});
			});
		};

		_this.get();
	}])
	.controller('OrdersListController', ["$scope", "$http", function ($scope, $http) {
		let _this = this;
		_this.list = [];
		_this.orderToAdd = {};
		_this.searchInput = '';
		$scope.orders = _this;

		_this.get = function() {
			$http.get('/api/orders').success(function (data) {
				_this.list = data.map(function (order) {
					order.orderId = order._id;
					delete order._id;
					return order;
				});
			});
		};

		_this.get();

		_this.delete = function (orderId) {
			$http.delete('/api/' + orderId).success(function() {
				_this.list = _this.list.filter(function (order) {
					if (order.orderId === orderId)
						return false;
					else
						return true;
				});
			});
		};

		_this.search = function() {
			_this.searchInput = _this.searchInput.trim();
			if (_this.searchInput.length > 0)
				$http.get('/api/search/' + _this.searchInput).success(function (data) {
					_this.list = data.map(function (order) {
						order.orderId = order._id;
						delete order._id;
						return order;
					});
				});
			else
				_this.get();
		};

		_this.openAddModal = function() {
			$('#addOrderModal').modal('show');
		};

		_this.add = function() {
			let data = _this.orderToAdd;
			if (data.companyName && data.customerAddress && data.orderedItem &&
				data.companyName.length > 0 && data.customerAddress.length > 0 && data.orderedItem.length > 0) {
				$http.post('/api/', _this.orderToAdd).success(function (data) {
					_this.list.push({
						orderId: data._id,
						companyName: data.companyName,
						customerAddress: data.customerAddress,
						orderedItem: data.orderedItem
					});
					_this.orderToAdd = {};
					$('#addOrderModal').modal('hide');
				});
			}
			else
				$('#addOrderAlert').modal('show');
		};
	}])
	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			if (current.$$route)
				$rootScope.title = current.$$route.title;
		});
	}]);

if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}