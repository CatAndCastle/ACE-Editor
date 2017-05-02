APP.controller('EditorController', function($scope, $window, $http, $rootScope, dataManager){
	var ctrl = this;
	$scope.data = dataManager.getData();
	
});