'use strict';

angular.module('myApp.search.search-directive', [])
	.directive('search', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'components/search/search-template.html'
		}
	});
