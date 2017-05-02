APP.controller('LoginController', function($scope, $window, $http, $location, dataManager){
	var ctrl = this;
	$scope.formdata = {};
	// $rootScope.loggedin = true;

	$scope.signIn = function(){
		dataManager.login();
		// $rootScope.$apply()
		console.log("TODO: Signin " + $scope.formdata.email + ", " + $scope.formdata.password);
		$location.path('user');
	}
});