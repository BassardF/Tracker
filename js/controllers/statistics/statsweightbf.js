app.controller('StatsWeightBFCtrl', [
	'$scope',

	'BodyWeight',
	'BodyWeightGoal',
	'BodyFat',
	'BodyFatGoal',

	'chartService'

	, function ($scope, BodyWeight, BodyWeightGoal, BodyFat, BodyFatGoal, chartService) {

		$scope.init = function(){
			$scope.current = 'weight';
			$scope.boxes = {
				weight : true,
				bodyFat : true
			}

			$scope.BodyWeight = BodyWeight.byUser({user_id : 1}, function(){});
			$scope.BodyWeightGoal = BodyWeightGoal.byUser({user_id : 1}, function(){});
			$scope.BodyFat = BodyFat.byUser({user_id : 1}, function(){});
			$scope.BodyFatGoal = BodyFatGoal.byUser({user_id : 1}, function(){});
		};

		$scope.replot = function(){
			plot();
		};
}]);