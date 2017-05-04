APP.controller('ProjectsController', function($scope, $window, $http, $rootScope, dataManager, $routeParams){
	var ctrl = this;
	fetchProjects();
	// $scope.projects = [
	// 	{id: "", name:"Listicles", numVid:15},
	// 	{id: "", name:"News", numVid:31},
	// 	{id: "", name:"Essays", numVid:60},
	// 	{id: "", name:"One More", numVid:3},
	// 	{id: "", name:"Test", numVid:17}
	// ];

	$scope.newProject = function(){
		console.log("TODO: Add Project");
	}

	//TODO: fetch projects for userToken
	function fetchProjects(){
		dataManager.fetchClient($routeParams.clientName)
			.then(function (data) {
				console.log(data);
				$scope.projects = data.projects;
			}, function (data) {
			});
	}
	
});