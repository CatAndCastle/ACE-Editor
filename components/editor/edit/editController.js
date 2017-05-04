APP.controller('EditController', function($scope, $window, $location, $timeout, dataManager, $routeParams, ModalService){
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

	$scope.dataLoaded = function(){
		return $scope.data!=null;
	}

	$scope.deleteAsset = function(idx){
		dataManager.deleteAsset(idx);
	}

	$scope.addAsset = function(idx){
		dataManager.addAsset();
	}
	
	$scope.edit = function(idx){
		ModalService.showModal({
			templateUrl: 'components/editor/mediaSelect/mediaSelect.html',
			controller: 'MediaSelectController',
			resolve: {
		      items: function () {
		        return $scope.selectionIdx;
		      }
		    },
			inputs: {
				items: $scope.data.body,
				selectionIdx: idx
			}
	    }).then(function(modal) {
	      modal.close.then(function(result) {
			console.log(result);
			// update data
			$scope.data.body[result.itemIdx].media[0].url = result.mediaUrl;
	      });
	    });
	}
});