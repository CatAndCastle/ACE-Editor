// var prefix = '/ACE/dashboard/';
var APP = angular.module('video-dashboard', ['ngRoute', 'angularModalService']);

APP.config(function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'components/login/login.html',
            controller: 'LoginController'
        }).
        when('/user', {
            templateUrl: 'components/projects/projects.html',
            controller: 'ProjectsController'
        }).
        when('/project', {
            templateUrl: 'components/videos/videos.html',
            controller: 'VideosController'
        }).
        when('/write', {
            templateUrl: 'components/editor/write/write.html',
            controller: 'WriteController'
        }).
        when('/edit', {
            templateUrl: 'components/editor/edit/edit.html',
            controller: 'EditController'
        }).
        // when('/edit/:videoId', {
        //     templateUrl: 'components/editor/edit.html',
        //     controller: 'EditController'
        // }).
        // when('/play/:videoId', {
        //     templateUrl: 'components/editor/play.html',
        //     controller: 'EditController'
        // }).
        
        otherwise({
            redirectTo: '/user'
        });
    
    $locationProvider.html5Mode(true).hashPrefix('!');;
});

APP.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);