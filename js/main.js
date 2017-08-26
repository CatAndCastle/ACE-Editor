// var prefix = '/ACE/dashboard/';
var APP = angular.module('video-dashboard', ['ngRoute', 'angularModalService']);

APP.config(function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'components/login/login.html',
            controller: 'LoginController'
        }).
        when('/u/:clientName', {
            templateUrl: 'components/projects/projects.html',
            controller: 'ProjectsController'
        }).
        when('/project', {
            templateUrl: 'components/videos/videos.html',
            controller: 'VideosController'
        }).
        when('/admin', {
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'DashboardController'
        }).
        when('/write', {
            templateUrl: 'components/editor/write/write.html',
            controller: 'WriteController'
        }).
        when('/edit', {
            templateUrl: 'components/editor/edit/edit.html',
            controller: 'EditController'
        }).
        when('/play', {
            // template: 'wtf',
            templateUrl: 'components/editor/play/play.html',
            controller: 'PlayController'
        }).
        when('/loading', {
            // template: 'wtf',
            templateUrl: 'components/loader/loader.html',
            controller: 'LoadingController'
        });//.
        // otherwise({
        //     redirectTo: '/user'
        // });
    
    $locationProvider.html5Mode(true).hashPrefix('!');;
});

APP.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);