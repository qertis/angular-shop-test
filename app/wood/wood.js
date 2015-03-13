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
				{ label: 'дуб', value: 1 },
				{ label: 'бук', value: 2 },
				{ label: 'ясень', value: 3 }
			];
		$scope.colors = [
			{ label: 'orange', value: 1 },
			{ label: 'purple', value: 2 },
			{ label: 'yellow', value: 3 }
		]

		$scope.materialSelected = $scope.materials[0]
		$scope.colorSelected = $scope.colors[0]
		$scope.price = 0;
		
	}]);