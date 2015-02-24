app.controller('StatsAreasCtrl', [
	'$scope',

	'SchedulesExercices',

	'chartService'

	,function ($scope, SchedulesExercices, chartService) {

		$scope.init = function(){
			$scope.exercices = SchedulesExercices.all({user_id : 1});
		};
}]);