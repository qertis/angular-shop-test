angular.module('myApp.wood')

	.controller('WoodSelectedCtrl', ['$scope', 'WoodService', '$stateParams', '$location',
		function ($scope, WoodService, $stateParams, $location) {
			if (!WoodService.completed || ($stateParams.id | 0) !== WoodService.current.id) {
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

					$scope.wood.loaded = true;

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

		}])
;