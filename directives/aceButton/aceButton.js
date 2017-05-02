APP.directive('aceButton', function(){
	var controller = ['$scope', function ($scope) {
		$scope.onMouseDown = function(){
			$($scope.thisEl).addClass('active');
		}
		$scope.onMouseUp = function(){
			$($scope.thisEl).removeClass('active');
		}
	}];

	return {
		restrict: "E",
		transclude: true,
		template: "<span ng-mousedown='onMouseDown()' ng-mouseup='onMouseUp()'><ng-transclude></ng-transclude></span>",
		controller: controller,
		link: function(scope, element){
			scope.thisEl = element;
		}
	}
});