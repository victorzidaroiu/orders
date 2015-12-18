angular.module('productsApp',['ngRoute'])

	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
				when('/', {
					templateUrl: 'partials/product_list.html',
					controller: 'ProductListController'
				}).
				when('/products/:ProductID', {
					templateUrl: 'partials/product_page.html',
					controller: 'ProductPageController'
				}).
				otherwise({
					redirectTo: '/'
				});
		}])

	.controller('ProductListController', function($scope,$http) {
		var products = this;

		$http.get('http://zidaroiu.com:3000/api/products').success(function(data) {
			products.list=data.map(function(product){
				product.price=product.price.formatMoney(2, '.', ',');
				return product;
			})
		});

		products.list=[];

		products.delete = function(ProductID) {
			$http.delete('http://zidaroiu.com:3000/api/products/'+ProductID).success(function() {
				products.list=products.list.filter(function(product){
					if (product.ProductID==ProductID) return false;
					else return true;
				});
			});
		};

		products.add = function() {
			$http.put('http://zidaroiu.com:3000/api/products',{
				name:products.name,
				description:products.description,
				price:products.price
			}).success(function(data) {
				products.list.push({
					ProductID:data.ProductID,
					name:products.name,
					price:parseFloat(products.price).formatMoney(2, '.', ',')
				});
				products.name = '';
				products.price = '';
				products.description = '';
			});
		};
	})

	.controller('ProductPageController',['$scope', '$http', '$routeParams','$location', function($scope,$http,$routeParams,$location) {
		var comments = this;

		$http.get('http://zidaroiu.com:3000/api/comments?filter[where][ProductID]='+$routeParams.ProductID).success(function(data) {
			comments.list=data;
			$http.get('http://zidaroiu.com:3000/api/products/'+$routeParams.ProductID).success(function(data) {
				data.price=parseFloat(data.price).formatMoney(2, '.', ',')
				comments.product=data;
			});
		});

		comments.list=[];

		var history = [];
		$scope.$on('$routeChangeSuccess', function() {
			history.push($location.$$path);
		});

		comments.back = function () {
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
			$location.path(prevUrl);
		};

		comments.add = function() {
			$http.put('http://zidaroiu.com:3000/api/comments',{
				content:comments.content,
				ProductID:comments.product.ProductID
			}).success(function(data) {
				comments.list.push({
					content:comments.content
				});
				comments.content = '';
			});
		};

		comments.delete = function(CommentID) {
			$http.delete('http://zidaroiu.com:3000/api/comments/'+CommentID).success(function() {
				comments.list=comments.list.filter(function(comment){
					if (comment.CommentID==CommentID) return false;
					else return true;
				});
			});
		};
	}]);

Number.prototype.formatMoney = function(c, d, t){
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};