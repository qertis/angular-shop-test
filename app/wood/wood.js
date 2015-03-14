'use strict';

angular.module('myApp.wood',
	[
		'ui.router',
		'myApp.goods',
		'myApp.search',
		'firebase'
	])
	.config(function($stateProvider){
		$stateProvider
			.state('wood', {
				url: "/wood",
				templateUrl: 'wood/wood.html',
				controller: 'WoodCtrl'
			})
			.state('/wood/:id', {
				url: "/wood/:id",
				templateUrl: 'wood_selected.html',
				controller: 'WoodSelectedCtrl'
			})

	})

	.filter('searchGoodsWoods', function (WoodService) {
		return function (searchGoodsWoods) {
			return WoodService.all.filter(function (e) {
				return (
				e.material === searchGoodsWoods.materialSelected.value &&
				e.color === searchGoodsWoods.colorSelected.value &&
				e.price >= searchGoodsWoods.fromPrice && e.price <= searchGoodsWoods.toPrice
				);
			});
		}
	})

	.filter('materialValue', function (WoodService) {
		return function (materialId) {
			if (!materialId) {
				throw 'Exception material'
			}

			return WoodService.materials.filter(function (e) {
				return e.id === materialId
			})[0]['rusName']
		}
	})

	.filter('colorValue', function (WoodService) {
		return function (colorId) {
			if (!colorId) {
				throw 'Exception color'
			}

			return WoodService.colors.filter(function (e) {
				return e.id === colorId
			})[0]['rusName']
		};
	})

	.service('WoodService', function ($firebaseObject) {
		var self = this;
		self.colors = self.materials = self.all = [];

		var ref = new Firebase("https://supertests.firebaseio.com/");
		var sync = $firebaseObject(ref);

		sync.$loaded(
			function (data) {
				var shopTest = null,
					wood = null;

				if (shopTest = data['shop-test']) {
					if (wood = shopTest.wood) {
						self.colors = wood.colors;
						self.materials = wood.materials;
						self.all = wood.all;
						self.completed = 1;
					}
				}
			}
		);
	})

	.controller('WoodSelectedCtrl', ['$scope', 'WoodService', '$stateParams', '$location',
		function ($scope, WoodService, $stateParams, $location) {
			if (!WoodService.completed) {
				alert("Getting data error");

				return $location.path('/wood');
			}

			$scope.gw = WoodService.current;
		}])

	.controller('WoodCtrl', ['$scope', '$filter', '$location', '$interval', 'WoodService',
		function ($scope, $filter, $location, $interval, WoodService) {

			$scope.wood = {};

			var getWoodsIntv = $interval(function () {
				if (WoodService.completed) {
					$scope.materials = WoodService.materials.map(function (e) {
						return {label: e['rusName'], value: e.id}
					})

					$scope.colors = WoodService.colors.map(function (e) {
						return {label: e['rusName'], value: e.id}
					})

					$scope.goodsWoods = WoodService.all;

					$scope.wood.materialSelected = $scope.materials[0]
					$scope.wood.colorSelected = $scope.colors[0]
					$scope.wood.fromPrice = 0;
					$scope.wood.toPrice = 1000;

					$interval.cancel(getWoodsIntv);
				}

			}, 150)

			$scope.onSearch = function onSearch(wood) {
				$scope.goodsWoods = $filter('searchGoodsWoods')(wood);
			}

			$scope.changePrice = function changePrice() {
				if ($scope.wood.fromPrice >= $scope.wood.toPrice && $scope.wood.fromPrice > 1) {
					$scope.wood.fromPrice = $scope.wood.fromPrice - 1;
					$scope.wood.toPrice = $scope.wood.fromPrice;
				}
			}

			$scope.showWood = function showWood(gw) {
				WoodService.current = gw;

				$location.path('/wood/' + gw.id);

			}

			$scope.reset = function reset() {
				$scope.goodsWoods = WoodService.all
			}

		}]);