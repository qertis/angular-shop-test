angular.module('myApp.wood')

	.filter('searchGoodsWoods', function (WoodService) {
		return function (searchGoodsWoods) {
			return WoodService.all.filter(function (e) {
				return (
				e.material === searchGoodsWoods.materialSelected.value &&
				e.color === searchGoodsWoods.colorSelected.value &&
				e.price >= searchGoodsWoods.fromPrice && e.price <= searchGoodsWoods.toPrice
				);
			});
		}
	})

	.filter('materialValue', function (WoodService) {
		return function (materialId) {
			if (!materialId) {
				throw 'Exception material'
			}

			return WoodService.materials.filter(function (e) {
				return e.id === materialId
			})[0]['rusName']
		}
	})

	.filter('colorValue', function (WoodService) {
		return function (colorId) {
			if (!colorId) {
				throw 'Exception color'
			}

			return WoodService.colors.filter(function (e) {
				return e.id === colorId
			})[0]['rusName']
		};
	})
;