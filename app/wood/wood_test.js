'use strict';

describe('myApp.wood module', function() {

  beforeEach(module('myApp.wood'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var WoodCtrl = $controller('WoodCtrl');
      expect(WoodCtrl).toBeDefined();
    }));

  });
});