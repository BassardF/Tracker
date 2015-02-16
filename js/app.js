var app = angular.module('app', [
  'ngRoute',
  'ngResource'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
