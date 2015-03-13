'use strict';

angular.module('myApp.wood',
	[
		'ngRoute',
		'myApp.goods',
		'myApp.search'
	])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/wood', {
			templateUrl: 'wood/wood.html',
			controller: 'WoodCtrl'
		})
			.when('/wood/:id', {
				templateUrl: 'wood_selected.html',
				controller: 'WoodSelectedCtrl'
			})
	}])

	.filter('searchGoodsWoods', function (AllWoods) {
		var allWoods = AllWoods;

		return function (searchGoodsWoods) {
			return allWoods.filter(function (e) {
				return (
				e.material === searchGoodsWoods.materialSelected.value &&
				e.color === searchGoodsWoods.colorSelected.value &&
				e.price >= searchGoodsWoods.fromPrice && e.price <= searchGoodsWoods.toPrice
				);
			});
		}
	})

	.filter('materialValue', function (WoodMaterials) {
		var woodMaterials = WoodMaterials;

		return function (materialId) {
			if (!materialId) {
				throw 'Exception material'
			}

			return woodMaterials.filter(function (e) {
				return e.id === materialId
			})[0]['rusName']
		}
	})

	.filter('colorValue', function (WoodColors) {
		var woodColors = WoodColors;

		return function (colorId) {
			if (!colorId) {
				throw 'Exception color'
			}

			return woodColors.filter(function (e) {
				return e.id === colorId
			})[0]['rusName']
		};
	})

	.value('WoodColors', [{id: 1, rusName: 'светло-коричневый'}, {id: 2, rusName: 'тёмно-коричневый'}])
	.value('WoodMaterials', [{id: 1, rusName: 'дуб'}, {id: 2, rusName: 'бук'}, {id: 3, rusName: 'ясень'}])
	.value('AllWoods', [{
		id: 1,
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Fraxinus_excelsior_tree.jpg/398px-Fraxinus_excelsior_tree.jpg',
		material: 3,
		color: 1,
		price: 100
	},
		{
			id: 2,
			image: 'http://www.soweren.ru/userfiles/posadka-duba.jpg',
			material: 1,
			color: 1,
			price: 80
		}, {
			id: 3,
			image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/A_deciduous_beech_forest_in_Slovenia.jpg',
			material: 2,
			color: 2,
			price: 90
		}])


	.controller('WoodSelectedCtrl', ['$scope', function ($scope) {

	}])

	.controller('WoodCtrl', ['$scope', 'WoodColors', 'WoodMaterials', 'AllWoods', '$filter', '$location',
		function ($scope, WoodColors, WoodMaterials, AllWoods, $filter, $location) {

			$scope.wood = {}

			var materials = $scope.materials = WoodMaterials.map(function (e) {
				return {label: e['rusName'], value: e.id}
			})

			var colors = $scope.colors = WoodColors.map(function (e) {
				return {label: e['rusName'], value: e.id}
			})

			var goodsWoods = $scope.goodsWoods = AllWoods;

			$scope.wood.materialSelected = $scope.materials[0]
			$scope.wood.colorSelected = $scope.colors[0]
			$scope.wood.fromPrice = 0;
			$scope.wood.toPrice = 1000;

			$scope.onSearch = function onSearch(wood) {
				$scope.goodsWoods = $filter('searchGoodsWoods')(wood);
			}

			$scope.changePrice = function changePrice() {
				if ($scope.wood.fromPrice >= $scope.wood.toPrice && $scope.wood.fromPrice > 1) {
					$scope.wood.fromPrice = $scope.wood.fromPrice - 1;
					$scope.wood.toPrice = $scope.wood.fromPrice;
				}
			}

			$scope.showWood = function showWood(id) {
				$location.path('/wood/' + id);
			}

		}]);