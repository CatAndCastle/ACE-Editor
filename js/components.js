APP.component('navigationBar', {
    templateUrl: 'components/navigation/navigation.html',
    controller: ['$scope', '$window', '$http', '$rootScope', '$location', 'dataManager', NavigationController]
});