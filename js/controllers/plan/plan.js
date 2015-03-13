app.controller('PlanController', [
	'$scope',
	'Workout',

	function ($scope, Workout) {

		$scope.init = function(){
			$scope.days = [];
			$scope.months = [];

			$scope.workouts = Workout.all();

			$scope.today = moment(new Date());
			$scope.year = $scope.today.year();
			for (var i = 0; i < $scope.today.daysInMonth(); i++) {
				$scope.days.push(moment().date(i));
			}
			for (var j = 0; j < 12; j++) {
				$scope.months.push(moment().month(j).format('MMMM'));
			}
		};

}]);