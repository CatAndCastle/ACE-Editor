APP.controller('PlayController', function($scope, $window, $location, $timeout, dataManager){
	var ctrl = this;
	$scope.data = null;
	$scope.project = null;
	$scope.audio = null;
	$scope.videoUrl = null;//'https://s3.amazonaws.com/ace.video.com/4hz9DMpyBawUFLF7EDX8/Awesome_T-Shirts_That_Scream_GirlPower.mp4';//null;
	$scope.buttonText = "Make Mp4";
	
	$scope.rendering = true;
	$scope.shouldToggleViews = false;
	$scope.showMp4 = true;

	fetchStory();

	$scope.showVideo = function(){
		return $scope.videoUrl != null && $scope.showMp4;
	}

	$scope.download = function(){
		$scope.videoUrl && downloadURI($scope.videoUrl);
	}

	$scope.$watch('data', function() {
		if($scope.data){
	        dataManager.fetchProject($scope.data.projectId)
				.then(function (data){
					$scope.project = data;
					$scope.audio = data.audio;
					$scope.selectedTrack = $scope.project.audio[0];

					checkRenderStatus();
				});
		}
    });

    function downloadURI(uri) {
	  var link = document.createElement("a");
	  // link.download = name;
	  link.href = uri;
	  link.download = $scope.data.name;
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
	  delete link;
	}
	
	function fetchStory(){
		dataManager.setStoryId($location.search().id);
		dataManager.getData()
			.then(function (data) {
				$scope.data = data;
			}, function (data) {
			});


		
	}

	$scope.renderMP4 = function (){
		// console.log($scope.selectedTrack);

		if($scope.shouldToggleViews){
			toggle();
		}
		else{

			if(!$scope.rendering){
				$scope.rendering = true;
				dataManager.renderMP4({'audioId':$scope.selectedTrack.id})
					.then(function(res){
						$scope.buttonText = "0%";
						checkRenderStatus();
					});
				
			}
		}
		
	}

	function toggle(){
		$scope.showMp4 = !$scope.showMp4;
		if($scope.showMp4){
			$scope.buttonText = "See Preview";
		}else{
			$scope.buttonText = "See Mp4";
		}
	}

	function checkRenderStatus(){
		dataManager.checkRenderStatus()
			.then(function (data){
				if(data.status == 1){
					$scope.rendering = true;
					$scope.buttonText = Math.round(data.progress * 100) + "%";
					$timeout(checkRenderStatus, 15000);
				}
				else if(data.status == 2){
					$scope.rendering = false;
					$scope.shouldToggleViews = true;
					$scope.buttonText = "See Preview";
					$scope.videoUrl = data.videoUrl;
				}else{
					$scope.rendering = false;
				}
			});
	}

	$scope.selectMusic = function(t) {
		// console.log('track:');
		// console.log(t);
	   // $scope.item.size.code = $scope.selectedItem.code
	   // use $scope.selectedItem.code and $scope.selectedItem.name here
	   // for other stuff ...
	}
	
});