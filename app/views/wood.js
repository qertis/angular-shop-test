'use strict';

angular.module('myApp.wood',
	[
		'ui.router',
		'firebase',
		'myApp.goods',
		'myApp.search'
	])

	.constant('FIREBASE_LINK', 'https://supertests.firebaseio.com/')

	.config(function ($stateProvider) {

		$stateProvider
			.state('wood', {
				url: "/wood",
				templateUrl: 'views/wood.html',
				controller: 'WoodCtrl'
			})
			.state('/wood/:id', {
				url: "/wood/:id",
				templateUrl: 'views/wood_selected.html',
				controller: 'WoodSelectedCtrl'
			})

	})
;