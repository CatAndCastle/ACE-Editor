APP.controller('PlayController', function($scope, $window, $location, $timeout, dataManager){
	var ctrl = this;
	$scope.data = null;
	$scope.project = null;
	$scope.audio = null;
	$scope.videoUrl = null;//'https://s3.amazonaws.com/ace.video.com/4hz9DMpyBawUFLF7EDX8/Awesome_T-Shirts_That_Scream_GirlPower.mp4';//null;
	$scope.buttonText = "Make Mp4";
	
	$scope.rendering = false;
	$scope.shouldToggleViews = false;
	$scope.showMp4 = true;

	fetchStory();

	$scope.showVideo = function(){
		return $scope.videoUrl != null && $scope.showMp4;
	}

	$scope.$watch('data', function() {
		if($scope.data){
	        dataManager.fetchProject($scope.data.projectId)
				.then(function (data){
					$scope.project = data;
					$scope.audio = data.audio;
					$scope.selectedTrack = $scope.project.audio[0].name;

					checkRenderStatus();
				});
		}
    });
	
	function fetchStory(){
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

	$scope.renderMP4 = function (){
		if($scope.shouldToggleViews){
			toggle();
		}
		else{
			if(!$scope.rendering){
				$scope.rendering = true;
				dataManager.renderMP4()
					.then(function(res){
						checkRenderStatus();
					});
				
			}
		}
		
	}

	function toggle(){
		$scope.showMp4 = !$scope.showMp4;
		if($scope.showMp4){
			$scope.buttonText = "See Canvas";
		}else{
			$scope.buttonText = "See Mp4";
		}
	}

	function checkRenderStatus(){
		dataManager.checkRenderStatus()
			.then(function (data){
				if(data.status == 1){
					$scope.buttonText = Math.round(data.progress * 100) + "%";
					$timeout(checkRenderStatus, 30000);
				}
				else if(data.status == 2){
					$scope.rendering = false;
					$scope.shouldToggleViews = true;
					$scope.buttonText = "See Canvas";
					$scope.videoUrl = data.videoUrl;
				}
			});
	}

	$scope.selectMusic = function(t) {
		console.log('track:');
		console.log(t);
	   // $scope.item.size.code = $scope.selectedItem.code
	   // use $scope.selectedItem.code and $scope.selectedItem.name here
	   // for other stuff ...
	}
	
});