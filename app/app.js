'use strict';

angular.module('myApp',
	[
		'ui.router',
		'myApp.wood'
	])

	.config(function ($urlRouterProvider) {

		$urlRouterProvider.otherwise('/wood');

	})
;