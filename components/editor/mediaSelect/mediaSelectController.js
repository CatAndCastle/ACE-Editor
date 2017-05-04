APP.controller('MediaSelectController', ['$scope', '$timeout', '$window', 'items', 'selectionIdx', 'close', 
	function($scope, $timeout, $window, items, selectionIdx, close) {

 	var ctrl = this;
 	$scope.items = items;
 	$scope.newUrl = null;
 	$scope.itemIndex = selectionIdx;
 	$scope.selectionIdx = selectionIdx;
 	// $scope.close = close;.
 	
 	function getSelection(){
 		return $scope.items[$scope.selectionIdx].media[0].url;
 	}

 	$scope.select = function(idx){
		$scope.selectionIdx = idx;
 	}

 	$scope.isSelected = function(idx){
 		return $scope.selectionIdx == idx;
 	}

 	$scope.closePopup = function(){
 		close({'itemIdx':$scope.itemIndex, 'mediaUrl':getSelection() });
 	}

 	$scope.submitUrl = function(){
 		close({'itemIdx':$scope.itemIndex, 'mediaUrl': $scope.newUrl });
 	}
 	
 	

}]);