APP.controller('ProjectsController', function($scope, $window, $http, $rootScope){
	var ctrl = this;
	$scope.projects = [
		{id: "", name:"Listicles", numVid:15},
		{id: "", name:"News", numVid:31},
		{id: "", name:"Essays", numVid:60},
		{id: "", name:"One More", numVid:3},
		{id: "", name:"Test", numVid:17}
	];

	$scope.newProject = function(){
		console.log("TODO: Add Project");
	}

	//TODO: fetch projects for userToken
	function fetchProjects(){
		$scope.projects = [];
	}
	
});