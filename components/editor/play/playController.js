APP.controller('PlayController', function($scope, $window, $location, $timeout, dataManager){
	var ctrl = this;
	$scope.data = null;
	fetch();
	
	function fetch(){
		dataManager.setStoryId($location.search().id);
		dataManager.getData()
			.then(function (data) {
				$scope.data = data;
			}, function (data) {
			});
	}

	// $scope.dataLoaded = function(){
	// 	// return true;
	// 	return $scope.data!=null;
	// }
	
});