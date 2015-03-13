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
			controller: 'View1Ctrl'
		});
	}])

	.controller('View1Ctrl', [function () {

	}]);