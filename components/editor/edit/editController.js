APP.controller('EditController', function($scope, $window, $http, $rootScope, $timeout, dataManager){
	var ctrl = this;
	$scope.data = dataManager.getData();

	$scope.deleteAsset = function(idx){
		dataManager.deleteAsset(idx);
	}

	$scope.addAsset = function(idx){
		dataManager.addAsset();
	}
	
});