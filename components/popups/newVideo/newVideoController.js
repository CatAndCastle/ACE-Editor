APP.controller('NewVideoController', ['$scope', '$location', '$window', 'dataManager', 'formFields', 'projectId', 'close', 
	function($scope, $location, $window, dataManager, formFields, projectId, close) {

 	var ctrl = this;
 	$scope.formFields = formFields;
 	$scope.projectId = projectId;
 	$scope.close = close;
 	

 	$scope.submit = function(){
 		var params = {};
 		for(var i=0; i<$scope.formFields.length; i++){
 			var key = $scope.formFields[i].name;
 			var val = $scope.formFields[i].value;
 			params[key] = val;
 		}
 		dataManager.newStory($scope.projectId, params);
 	}
 	
 	

}]);