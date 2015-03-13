'use strict';

angular.module('myApp.goods.goods-directive', [])

	.directive('goods', function() {

		return {
			restrict: 'E',
			replace: true,
			//controller: function ($scope, $element) {
			//	debugger;
			//},
			templateUrl: 'components/goods/goods-template.html'
		}
	});
