APP.directive('player', function(){
	var controller = ['$scope', function ($scope) {
		$scope.playing = false;
		$scope.bodymovin = null;
		// $scope.data = {};

		function play(){
	    	if(!$scope.bodymovin){
	    		CONFIG = {
	    			'api_url' : API_BASE,
	    			'storyData': clone($scope.data),
	    			'platform': 'browser',
	    			'renderer': 'svg',
	    			'language':'en'
	    		}
	    		$scope.bodymovin = new VideoConstructor(CONFIG);
	    		advance($scope.bodymovin);
	    	}else{
	    		advance($scope.bodymovin);
	    	}

	    }

	    function goTo(frame){
	    	if(!$scope.bodymovin){
	    		CONFIG = {
	    			'api_url' : API_BASE,
	    			'assetData': clone($scope.data),
	    			'platform': 'browser',
	    			'renderer': 'svg',
	    			'language':'en'
	    		}
	    		$scope.bodymovin = new VideoConstructor(CONFIG);
	    	}

	    	$scope.bodymovin.goToFrame(30);
	    }

	    function advance(constructor){
	    	if(!$scope.playing){
	    		return;
	    	}
	        var keepgoing = constructor.goToNextFrame();
	        if(keepgoing){
	            setTimeout(function(){
	                advance(constructor);
	            },50);
	        }else{
	        	// reset player
	        	$scope.$broadcast('didEnd', true);
				$scope.bodymovin.setData(clone($scope.story));
				$scope.bodymovin.reset();
	        }
	    }

	    function clone(obj){
	    	return JSON.parse(JSON.stringify(obj));
	    }

	    goTo(0);
	}],

	// template = '<div class="vid-container">'+
	template =	'<div class="resizer"></div>'+
				    '<div class="player-container">'+
				        '<div id="bodymovin"></div>'+
				        // '<player-controls class="el" ng-show="controls"></player-controls>'+
				    '</div>';
				// '</div>';

	return {
		restrict: "E",
		scope: {
			data: '='
		},
		template: template,
		controller: controller,
		link: function(scope, element){
			scope.thisEl = element;
		}
	}
});