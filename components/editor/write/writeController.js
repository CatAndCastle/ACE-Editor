APP.controller('WriteController', function($scope, $window, $http, $rootScope, $timeout, dataManager){
	var ctrl = this;
	$scope.data = dataManager.getData();

	$scope.deleteLine = function(idx){
		dataManager.deleteAsset(idx);
	}

	$scope.addLine = function(idx){
		dataManager.assAsset();
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