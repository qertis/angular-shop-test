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
		});
	}])

	.filter('materialValue', function(WoodMaterials) {
		var woodMaterials = WoodMaterials;

		return function (materialId) {
			if(!materialId) {
				throw 'Exception material'
			}

			return woodMaterials.filter(function(e) {
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
	.value('WoodMaterials', [{id:1, rusName: 'дуб'}, {id:2, rusName: 'бук'}, {id: 3, rusName: 'ясень'}])

	.controller('WoodCtrl', ['$scope', 'WoodColors', 'WoodMaterials', function ($scope, WoodColors, WoodMaterials) {
		var materials = $scope.materials = WoodMaterials.map(function(e) {
			return {label: e['rusName'], value: e.id}
		})

		var colors = $scope.colors = WoodColors.map(function (e) {
			return {label: e['rusName'], value: e.id}
		})

		$scope.goodsWoods = [
			{
				image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Fraxinus_excelsior_tree.jpg/398px-Fraxinus_excelsior_tree.jpg',
				material: 3,
				color: 1,
				price: 100
			},
			{
				image: 'http://www.soweren.ru/userfiles/posadka-duba.jpg',
				material: 1,
				color: 1,
				price: 80
			}, {
				image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/A_deciduous_beech_forest_in_Slovenia.jpg',
				material: 2,
				color: 2,
				price: 90
			}
		]

		$scope.materialSelected = $scope.materials[0]
		$scope.colorSelected = $scope.colors[0]
		$scope.fromPrice = 0;
		$scope.toPrice = 1000;

		$scope.changePrice = function changePrice() {
			if ($scope.fromPrice >= $scope.toPrice) {

				$scope.toPrice = $scope.fromPrice;
			}
		}


	}]);