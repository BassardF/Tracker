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
      when('/statistics/measurements', {
        templateUrl: 'views/statistics/statsmeasurements.html',
        controller: 'StatsMeasurementsCtrl'
      }).
      when('/statistics/areas', {
        templateUrl: 'views/statistics/statsareas.html',
        controller: 'StatsAreasCtrl'
      }).
      when('/goals/bodyfat', {
        templateUrl: 'views/goals/goalbodyfat.html',
        controller: 'GoalBodyFatController'
      }).
      when('/goals/bodyweight', {
        templateUrl: 'views/goals/goalbodyweight.html',
        controller: 'GoalBodyWeightController'
      }).
      when('/goals/bodymeasurements', {
        templateUrl: 'views/goals/goalmeasurements.html',
        controller: 'GoalMeasurementsController'
      }).
      when('/goals/performance', {
        templateUrl: 'views/goals/goalperformance.html',
        controller: 'GoalPerformanceController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
