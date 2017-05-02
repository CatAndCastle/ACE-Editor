APP.controller('VideosController', function($scope, $window, $http, $location){
	var ctrl = this;
	$scope.videos = [
		{id: "", name:"29 Products That'll Stop You From Wanting To Kill Your Roommate", posterUrl:"img/placeholder.jpg"},
		{id: "", name:"Video Two", posterUrl:"img/placeholder.jpg"},
		{id: "", name:"Video Three", posterUrl:"img/placeholder.jpg"},
		{id: "", name:"Video Four", posterUrl:"img/placeholder.jpg"},
	];

	$scope.newVideo = function(){
		console.log("TODO: Add Project");
	}

	$scope.deleteVideo = function(){
		if ( window.confirm("delete video?") ) {
            console.log("TODO: delete asset");
            // recordChanges();
        }
	}

	$scope.goBack = function(){
		$location.path('user');
	}

	$scope.goTo = function(idx){
		$location.path('write');
	}

	function recordChanges(){
		$scope.$emit('updateVideos', $scope.videos);
	}

	//TODO: fetch videos for projectId
	function fetch(){
		$scope.videos = [];
	}
	
});