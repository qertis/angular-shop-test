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

	.controller('WoodCtrl', ['$scope', function ($scope) {
		$scope.materials =
			[
				{label: 'дуб', value: 1},
				{label: 'бук', value: 2},
				{label: 'ясень', value: 3}
			];
		$scope.colors = [
			{label: 'светло-коричневый', value: 1},
			{label: 'тёмно-коричневый', value: 2}
		]

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
				color: 3,
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