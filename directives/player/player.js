APP.directive('player', function(){
	var controller = ['$scope', function ($scope, dataManager) {
		$scope.playing = false;
		$scope.bodymovin = null;
		$scope.config = {
	    			'api_url' : API_BASE,
	    			'platform': 'browser',
	    			'renderer': 'svg',
	    			'language':'en'
	    		};
	   	// console.log($el);
	   	// function oninit(){

	   	// }

	   	$scope.getId = function(){
	   		if($scope.asset){
	   			return $scope.asset.shotId;
	   		}
	   		else if($scope.story){
	   			return $scope.story.id;
	   		}
	    	
	    	return makeid(5);
	    }

	    function makeid(len)
		{
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		    for( var i=0; i < len; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}

		function config(){
			$scope.config.selector = $scope.getId();

	    	if($scope.asset!=null){
	    		$scope.config.assetData = clone($scope.asset);
	    		$scope.config.projectId = $scope.projectid;
	    	}
	    	else if($scope.story!=null){
	    		
	    		$scope.config.storyData = clone($scope.story);

	    		$scope.config.projectId = $scope.story.projectId;
	    	}
		}

		// function configStoryData(){
		// 	var storyData = clone($scope.story);
		// 	for(var i=0;i<storyData.body.size;i++){
		// 		dataManager.getBlock(storyData.body[i].blockId)
		// 			.then(function(data){
		// 				storyData.body[i].animationData = data;
		// 			});
		// 	}
		// 	return storyData;
		// }
		$scope.play = function(val){
			$scope.playing = val;
			
			if($scope.playing){
		    	if(!$scope.bodymovin){
					config();
		    		$scope.bodymovin = new VideoConstructor($scope.config);
		    		advance($scope.bodymovin);
		    	}else{
		    		advance($scope.bodymovin);
		    	}
		    }
	    }

	    $scope.showThumbnail = function(){
	    	goTo(30);
	    }

	    function goTo(frame){
	    	if(!$scope.bodymovin){
	    		config();
	    		$scope.bodymovin = new VideoConstructor($scope.config);
	    	}

	    	$scope.bodymovin.goToFrame(frame);
	    }

	    function advance(constructor){
	    	if(!$scope.playing){
	    		return;
	    	}

	    	
	        var keepgoing = $scope.bodymovin.goToNextFrame();
			if(keepgoing){
	            window.requestAnimationFrame(advance);
	        } else{



	        // var keepgoing = constructor.goToNextFrame();
	        // if(keepgoing){
	        //     setTimeout(function(){
	        //         advance(constructor);
	        //     },50);
	        // }else{

	        	// reset player
	        	$scope.$broadcast('didEnd', true);
	        	if($scope.story!=null){
					$scope.bodymovin.setData(clone($scope.story));
				}else if($scope.asset!=null){
					$scope.bodymovin.setData(clone($scope.asset));
				}
				$scope.bodymovin.reset();
	        }
	    }

	    function clone(obj){
	    	return JSON.parse(JSON.stringify(obj));
	    }

	    // play();
	    // goTo(30);

	}],

	controlsHTML = '<player-controls ng-show="controls" class="el">' +
						'<img src="img/player/BlackGradient.png" class="gradient"/>'+
						'<div class="play-pause zoom-hover">'+
						    '<img src="img/player/playButton.png" ng-hide="playing" ng-click="play(true)" class="clickable"/>'+
						    '<img src="img/player/pauseButton.png" ng-show="playing" ng-click="play(false)" class="clickable"/>'+
						'</div>' + 
					'</player-controls>';

	audioHTML = '<audio>' + 
				'<source src="horse.mp3" type="audio/mpeg" ng-src="{{audioUrl | trustUrl}}">' +
			'</audio>';
	
	template =	'<div class="resizer"></div>'+
			    '<div class="player-container">'+
			        '<div id="{{getId()}}" class="bodymovin" ng-click="play()"></div>'+
			        controlsHTML +
			        audioHTML +
			    '</div>';

	return {
		restrict: "E",
		scope: {
			asset: '=',
			story: '=',
			projectid: '@',
			audioUrl: '@',
			controls: '@'
		},
		template: template,
		controller: controller,
		link: function(scope, element, attrs){
			scope.controls = 'status' in attrs;
			scope.thisEl = element;

			// var watch = scope.$watch(function() {
   //              return element.children().length;
   //          }, function() {
   //              // Wait for templates to render
   //              scope.$evalAsync(function() {
   //                  // Finally, directives are evaluated
   //                  // and templates are renderer here
   //                  var children = element.children();
   //                  console.log(children);
   //                  setTimeout(function(){
   //                 		scope.showThumbnail();
   //                 	},10);
   //              });
   //          });
		}
	}
});