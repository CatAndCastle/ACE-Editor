APP.controller('VideosController', function($scope, $window, $http, $location, dataManager, ModalService){
	var ctrl = this;
	// var projectId = $scope.query = ;
	$scope.stories = [];
	fetch();

	$scope.newVideo = function(){
		
		ModalService.showModal({
			templateUrl: 'components/popups/newVideo/newVideo.html',
			controller: 'NewVideoController',
			inputs: {
				formFields: [{'type':'text', 'placeholder':'Paste link', 'value':'', 'name':'url'}],
				projectId: $location.search().id
			}
	    }).then(function(modal) {
			modal.close.then(function(result) {
				console.log("closed new video form");
				// console.log(result);
			});
	    });
	}

	$scope.deleteVideo = function(){
		if ( window.confirm("delete video?") ) {
            console.log("TODO: delete asset");
            // recordChanges();
        }
	}

	$scope.goBack = function(){
		$window.history.back();
	}

	$scope.goTo = function(idx){
		$location.path('write').search('id', $scope.stories[idx].id);
	}

	function recordChanges(){
		$scope.$emit('updateVideos', $scope.videos);
	}

	//TODO: fetch videos for projectId
	function fetch(){
		dataManager.fetchProject($location.search().id)
		.then(function (data) {
			$scope.stories = data.stories;
		}, function (data) {
		});
		
	}

	function deleteStory(idx){
		var id = $scope.stories[idx].id;
		$scope.stories.splice(idx,1);

		dataManager.deleteStory(id)
		.then(function () {
		}, function (data) {
		});
	}
	
});