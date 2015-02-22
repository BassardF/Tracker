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
      //stats
      when('/statistics/performance', {
        templateUrl: 'views/statistics/statsperformance.html',
        controller: 'StatsPerformanceCtrl'
      }).
      when('/statistics/weight-bodyfat', {
        templateUrl: 'views/statistics/statsweightbf.html',
        controller: 'StatsWeightBFCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
