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

			var withinFirstWeek = true;
			for (var i = 0; i < $scope.today.daysInMonth(); i++) {
				var date = moment().date(i + 1);
				date.withinFirstWeek = withinFirstWeek;
				withinFirstWeek = withinFirstWeek && date.isoWeekday() !== 7;
				$scope.days.push(date);
			}

			for (var j = 0; j < 12; j++) {
				$scope.months.push(moment().month(j).format('MMMM'));
			}
		};

		$scope.isDayInFirstLine = function(isoDay){
			var firstLine = false;
			for (var i = 0; i < $scope.days.length; i++) {
				if($scope.days[i].isoWeekday() === isoDay){
					firstLine = firstLine || $scope.days[i].withinFirstWeek;
				}
			}
			return firstLine;
		}
}]);