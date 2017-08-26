APP.controller('WriteController', function($scope, $window, $location, $timeout, dataManager){
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

	$scope.deleteLine = function(idx){
		dataManager.deleteAsset(idx);
	}

	$scope.addLine = function(idx){
		dataManager.addAsset();
	}

	$scope.didEdit = function(){
		dataManager.handleEdit();
	}

	var init = function () {
        $timeout(function(){
            $("textarea").each( function( index, element ){
                $(this).height(this.scrollHeight );
            });
        },0);
    }
    
    init();
	
});