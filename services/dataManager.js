APP.service('dataManager', function ($http, $q, $location, $timeout){
	
	var _token = null;
	var _data = null;
	var _blocks = [];
	var _isEdited = false;
	// var _sampleData = {"storyId":"0000001","name":"27 Ways To Decorate Your Home Like A Grown-Ass Adult","body":[{"block":"Block_Title","text":"27 Ways To Decorate Your Home Like A Grown-Ass Adult","type":"title"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/28/16/asset/buzzfeed-prod-fastlane-01/sub-buzz-22031-1490732769-1.jpg","block":"Block_7","text":"It may seem obvious, but make sure you have clean sheets and pillows.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/16/asset/buzzfeed-prod-fastlane-01/sub-buzz-21560-1490646227-5.jpg","block":"Block_6","text":"Bring fresh flowers into a room to add a pop of color and show the world you're together enough to own a vase.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/10/asset/buzzfeed-prod-fastlane-02/sub-buzz-23523-1490625261-1.jpg?crop=900:1109;0,185","block":"Block_5","text":"Make sure your bathroom has hand towels, hand soap, a bath mat, place to store toilet paper (that isn't the floor), and that it's always clean.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/13/asset/buzzfeed-prod-fastlane-03/sub-buzz-429-1490634414-2.jpg","block":"Block_3","text":"While you're keeping your bathroom nice and tidy, make sure the rest of your house stays clean and organized...all the time.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/15/asset/buzzfeed-prod-fastlane-03/sub-buzz-5889-1490643645-5.jpg","block":"Block_2","text":"Don't push it, not even real good, use actual salt and pepper shakers because you're a f#*&ing adult.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/13/asset/buzzfeed-prod-fastlane-02/sub-buzz-4222-1490635403-1.jpg","block":"Block_3","text":"Take a note from Oprah, and make sure your home \"stands up and greets you\" when you walk in by having a well-curated entryway.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/17/asset/buzzfeed-prod-fastlane-01/sub-buzz-23955-1490650366-5.jpg","block":"Block_3","text":"Use frames for all your posters, prints, photos, and art work to give them a more polished look.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/15/asset/buzzfeed-prod-fastlane-02/sub-buzz-7771-1490641965-2.jpg","block":"Block_7","text":"Decorate with neutrals and add pops of color with smaller pieces of decor.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/16/asset/buzzfeed-prod-fastlane-03/sub-buzz-7201-1490645412-1.jpg","block":"Block_2","text":"Get an actual sofa, not a futon, to complete your living room.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/12/asset/buzzfeed-prod-fastlane-02/sub-buzz-2805-1490633442-1.jpg?crop=1500:1287;0,101","block":"Block_8","text":"Get your bed off the floor and invest in a headboard and side tables.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/16/asset/buzzfeed-prod-fastlane-03/sub-buzz-7207-1490645818-6.jpg","block":"Block_7","text":"Maintain a well-stocked bar cart for when those unexpected visitors decide to pop in.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/14/asset/buzzfeed-prod-fastlane-01/sub-buzz-17653-1490640161-9.jpg","block":"Block_7","text":"Customize the pieces you buy at Ikea with unique finishes.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/17/asset/buzzfeed-prod-fastlane-03/sub-buzz-10968-1490651876-1.png","block":"Block_3","text":"Nothing says, \"I'm an adult\" more than keeping a house plant alive.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/18/asset/buzzfeed-prod-fastlane-01/sub-buzz-25501-1490652871-2.jpg","block":"Block_5","text":"Bring in a good mix of texture with throw blankets, pillows, and unique home decor items.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/15/asset/buzzfeed-prod-fastlane-03/sub-buzz-5466-1490642489-1.jpg","block":"Block_6","text":"Keep your bookshelves and coffee tables well organized and perfectly curated.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/13/asset/buzzfeed-prod-fastlane-02/sub-buzz-5387-1490637485-2.jpg","block":"Block_5","text":"On that note learn how to layer all your accessories to construct a visually perfect shelf, coffee table, or sofa.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/14/asset/buzzfeed-prod-fastlane-03/sub-buzz-2971-1490638553-3.png","block":"Block_7","text":"Use your reading material to decorate your space by using your book collection as decor.","type":"text,media"},{"block":"Block_End","type":"end"}]};
	_title = "";
	var _storyId = "";
	var _clientHome = "";

	this.loggedin = true;
	this.project = null;
	
	this.login = function(){
		this.loggedin = true;
	}

	this.logout = function(){

	}

	this.setStoryId = function(id){
		if(_storyId != id){
			_data = null;
		}
		_storyId = id;
	}

	this.storyId = function(){return _storyId;}

	this.title = function(){return _title;}

	this.getData = function(){
		_title = "";

		var deferred = $q.defer();
		var self = this;
		if(!_data){
			console.log('fetching data for ' + _storyId);
			

			$http.get(API_BASE+"story?id="+_storyId)
	        .then(function(response){ 
	        	_data = response.data;
	        	
	        	deferred.resolve(response.data);

	        	// self.preloadBlocks();

	        })
	        .catch(function(e){
	        	console.log("error fetching " + _storyId);
			});

			
		}else{	
			deferred.resolve(_data);
		}

		return deferred.promise;
		
		
	}

	this.preloadBlocks = function (){
		var self = this;
		// preload story blocks
		for(var i=0; i<_data.body; i++){
			console.log(_data.body[i].blockId);
    		// this.loadAnimationData(_data.body[i]);
    	}
		// preload all blocks
		// $http.get(API_BASE+"project/blocks?id="+_data.projectId)
  //       .then(function(response){ 
  //       	_blocks = response.data.blocks;
  //       	for(var i=0; i<_blocks.length; i++){
  //       		self.getBlock(_blocks[i]['id']);
  //       	}
  //       	console.log(response);
  //       });
	}

	this.getBlock = function (blockId){
		var b,
			deferred = $q.defer();

		for(var i=0; i<_blocks.length; i++){
			b = _blocks[i];
			if(b.id == blockId && 'animationData' in b){
				// return b.animationData;
				deferred.resolve(b.animationData);
				return deferred.promise;
				// $scope.$apply();
			}
		}

		$http.get(API_BASE+"block?id="+blockId)
        .then(function(response){
        	console.log(response.data);
        	
        	deferred.resolve(response.data);

        	$timeout(function() {
	            b.animationData = response.data;
	        });

        	return deferred.promise;
			// $scope.$apply();
        	
        });
	}

	this.loadanimationData = function (asset){
		var b,
			deferred = $q.defer();

		for(var i=0; i<_blocks.length; i++){
			b = _blocks[i];
			if(b.id == asset.blockId && 'animationData' in b){
				// return b.animationData;
				deferred.resolve(b.animationData);
				$timeout(function() {
		            asset.animationData = b.animationData;
		        });
				return deferred.promise;
			}
		}

		$http.get(API_BASE+"block?id="+asset.blockId)
        .then(function(response){
        	console.log(response.data);
        	
        	deferred.resolve(response.data);

        	$timeout(function() {
        		asset.animationData = response.data;
	            b.animationData = response.data;
	        });

        	return deferred.promise;
        	
        });
	}

	this.getBody = function(){
		this.getData();
		return _data.body;
	}

	this.addAsset = function(){
		_data.body.push({
            'image':'',
            'block': '',
            'text': 'Enter text',
            'new': true,
            'type': 'text'
        });
        _isEdited = true;
	}

	this.updateAsset = function(){
		
	}

	this.deleteAsset = function(idx){
		_data.body.splice(idx,1);
        _isEdited = true;
	}

	this.clientHome = function(){
		return _clientHome;
	}

	this.fetchClient = function(clientName){
		_clientHome = "u/" + clientName;
		_title = clientName.toUpperCase();

		var deferred = $q.defer();

		$http.get(API_BASE+"client?name="+clientName)
        .then(function(response){ 
        	deferred.resolve(response.data);
        })
        .catch(function(e){
        	console.log("error fetching client" + clientName);
		});

		return deferred.promise;
	}

	this.fetchProject = function(projectId){

		var deferred = $q.defer();

		if(this.project){
			deferred.resolve(this.project);
		}
		else{

			$http.get(API_BASE+"project?id="+projectId+"&fields=audio")
	        .then(function(response){ 
	        	_title = response.data.name.toUpperCase();
	        	this.project = response.data;
	        	deferred.resolve(response.data);
	        })
	        .catch(function(e){
	        	console.log("error fetching project" + projectId);
			});
	    }


		return deferred.promise;
	}

	this.deleteStory = function(storyId){
		var postdata = $.param({ id: storyId });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post(API_BASE+"story/delete", postdata, config)
            .success(function (data, status, headers, config) {
            	console.log(data);
            	$location.path('write').search('id', data.storyId);
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                $window.alert('We are experiencing errors. Please try again later.');
            });

	}


	this.newStory = function(projectId, params){
		_title = "";
		$location.path('loading');//.search('id', id);

		var postdata = $.param({ projectId: projectId, params: params });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post(API_BASE+"story/new", postdata, config)
            .success(function (data, status, headers, config) {
            	console.log(data);
            	$location.path('write').search('id', data.storyId);
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                $window.alert('We are experiencing errors. Please try again later.');
            });

	}

	this.renderMP4 = function (options){
		var deferred = $q.defer();

		options.id = _data.id;
		var postdata = $.param( options );
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post(API_BASE+"story/render", postdata, config)
            .success(function (data, status, headers, config) {
            	console.log("rendering started");
            	console.log(data);
            	deferred.resolve(data);
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                $window.alert('We are experiencing errors. Please try again later.');
                deferred.resolve(data);
            });


        return deferred.promise;

	}

	this.checkRenderStatus = function (){
		var deferred = $q.defer();

        $http.get(API_BASE+"story/render/status?id=" + _data.id)
            .success(function (data, status, headers, config) {
            	// console.log("RENDER STATUS:");
            	// console.log(data);
            	deferred.resolve(data);
            })
            .error(function (data, status, header, config) {
                console.log("ERROR in check render status");
                // $window.alert('We are experiencing errors. Please try again later.');
            });

        return deferred.promise;
	}


});