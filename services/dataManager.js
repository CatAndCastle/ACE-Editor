APP.service('dataManager', function ($http, $q, $location){
	
	var _token = null;
	var _data = null;
	var _isEdited = false;
	var _sampleData = {"storyId":"0000001","name":"27 Ways To Decorate Your Home Like A Grown-Ass Adult","body":[{"block":"Block_Title","text":"27 Ways To Decorate Your Home Like A Grown-Ass Adult","type":"title"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/28/16/asset/buzzfeed-prod-fastlane-01/sub-buzz-22031-1490732769-1.jpg","block":"Block_7","text":"It may seem obvious, but make sure you have clean sheets and pillows.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/16/asset/buzzfeed-prod-fastlane-01/sub-buzz-21560-1490646227-5.jpg","block":"Block_6","text":"Bring fresh flowers into a room to add a pop of color and show the world you're together enough to own a vase.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/10/asset/buzzfeed-prod-fastlane-02/sub-buzz-23523-1490625261-1.jpg?crop=900:1109;0,185","block":"Block_5","text":"Make sure your bathroom has hand towels, hand soap, a bath mat, place to store toilet paper (that isn't the floor), and that it's always clean.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/13/asset/buzzfeed-prod-fastlane-03/sub-buzz-429-1490634414-2.jpg","block":"Block_3","text":"While you're keeping your bathroom nice and tidy, make sure the rest of your house stays clean and organized...all the time.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/15/asset/buzzfeed-prod-fastlane-03/sub-buzz-5889-1490643645-5.jpg","block":"Block_2","text":"Don't push it, not even real good, use actual salt and pepper shakers because you're a f#*&ing adult.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/13/asset/buzzfeed-prod-fastlane-02/sub-buzz-4222-1490635403-1.jpg","block":"Block_3","text":"Take a note from Oprah, and make sure your home \"stands up and greets you\" when you walk in by having a well-curated entryway.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/17/asset/buzzfeed-prod-fastlane-01/sub-buzz-23955-1490650366-5.jpg","block":"Block_3","text":"Use frames for all your posters, prints, photos, and art work to give them a more polished look.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/15/asset/buzzfeed-prod-fastlane-02/sub-buzz-7771-1490641965-2.jpg","block":"Block_7","text":"Decorate with neutrals and add pops of color with smaller pieces of decor.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/16/asset/buzzfeed-prod-fastlane-03/sub-buzz-7201-1490645412-1.jpg","block":"Block_2","text":"Get an actual sofa, not a futon, to complete your living room.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/12/asset/buzzfeed-prod-fastlane-02/sub-buzz-2805-1490633442-1.jpg?crop=1500:1287;0,101","block":"Block_8","text":"Get your bed off the floor and invest in a headboard and side tables.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/16/asset/buzzfeed-prod-fastlane-03/sub-buzz-7207-1490645818-6.jpg","block":"Block_7","text":"Maintain a well-stocked bar cart for when those unexpected visitors decide to pop in.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/14/asset/buzzfeed-prod-fastlane-01/sub-buzz-17653-1490640161-9.jpg","block":"Block_7","text":"Customize the pieces you buy at Ikea with unique finishes.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/17/asset/buzzfeed-prod-fastlane-03/sub-buzz-10968-1490651876-1.png","block":"Block_3","text":"Nothing says, \"I'm an adult\" more than keeping a house plant alive.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/18/asset/buzzfeed-prod-fastlane-01/sub-buzz-25501-1490652871-2.jpg","block":"Block_5","text":"Bring in a good mix of texture with throw blankets, pillows, and unique home decor items.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/15/asset/buzzfeed-prod-fastlane-03/sub-buzz-5466-1490642489-1.jpg","block":"Block_6","text":"Keep your bookshelves and coffee tables well organized and perfectly curated.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/13/asset/buzzfeed-prod-fastlane-02/sub-buzz-5387-1490637485-2.jpg","block":"Block_5","text":"On that note learn how to layer all your accessories to construct a visually perfect shelf, coffee table, or sofa.","type":"text,media"},{"image":"https://img.buzzfeed.com/buzzfeed-static/static/2017-03/27/14/asset/buzzfeed-prod-fastlane-03/sub-buzz-2971-1490638553-3.png","block":"Block_7","text":"Use your reading material to decorate your space by using your book collection as decor.","type":"text,media"},{"block":"Block_End","type":"end"}]};

	var videoId = "";//query.videoId;

	this.loggedin = false;
	this.login = function(){
		this.loggedin = true;
	}

	this.logout = function(){

	}

	this.getData = function(){
		if(!_data){
			console.log('fetching data for ' + videoId);
			_data = _sampleData;
		}
		return _data;
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


});