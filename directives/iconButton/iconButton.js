APP.directive('iconButton', function(){
	var controller = ['$scope', function ($scope) {
		$scope.onMouseDown = function(){
			$($scope.thisEl).addClass('active');
		}
		$scope.onMouseUp = function(){
			$($scope.thisEl).removeClass('active');
		}
	}];

	template = "<img style='width:100%;height:100%;object-fit:contain;' class='clickable zoom-hover' ng-src='{{src}}' src='{{src}}'>";

	return {
		restrict: "E",
		scope:{
			src: '@'
		},
		transclude: true,
		template: template,
		controller: controller,
		link: function(scope, element){
			scope.thisEl = element;
		}
	}
});