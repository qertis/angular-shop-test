angular.module('myApp.wood')

	.service('WoodService', function ($firebaseObject, FIREBASE_LINK) {

		var self = this;
		self.colors = self.materials = self.all = [];

		var ref = new Firebase(FIREBASE_LINK);
		var sync = $firebaseObject(ref);

		sync.$loaded(
			function (data) {
				var shopTest = null,
					wood = null;

				if (shopTest = data['shop-test']) {
					if (wood = shopTest.wood) {
						self.colors = wood.colors;
						self.materials = wood.materials;
						self.all = wood.all;
						self.completed = 1;
					}
				}
			}
		);

	})
