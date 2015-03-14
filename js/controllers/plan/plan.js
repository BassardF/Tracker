app.controller('PlanController', [
	'$scope',
	'Workout',
	'Planned',

	function ($scope, Workout, Planned) {

		$scope.init = function(){
			$scope.callCount = 0;
			$scope.days = [];
			$scope.months = [];

			$scope.workouts = Workout.all(callbacks);
			$scope.planned = Planned.all(callbacks);

			$scope.today = moment(new Date());
			$scope.year = $scope.today.year();

			
		};

		function callbacks(){
			$scope.callCount++;
			if($scope.callCount === 2){
				craft();
			}
		}

		function craft(){
			var withinFirstWeek = true;

			for (var i = 0; i < $scope.today.daysInMonth(); i++) {
				var date = moment().date(i + 1);
				date.withinFirstWeek = withinFirstWeek;
				date.customId = i;
				withinFirstWeek = withinFirstWeek && date.isoWeekday() !== 7;
				date.planned = [];
				for (var j = 0; j < $scope.planned.length; j++) {
					if(sameDay(date, moment($scope.planned[j].date, 'DD-MM-YYYY'))){
						date.planned.push($scope.planned[j]);
					}
				}
				$scope.days.push(date);
			}

			for (var k = 0; k < 12; k++) {
				$scope.months.push(moment().month(k).format('MMMM'));
			}
		}

		$scope.isDayInFirstLine = function(isoDay){
			var firstLine = false;
			for (var i = 0; i < $scope.days.length; i++) {
				if($scope.days[i].isoWeekday() === isoDay){
					firstLine = firstLine || $scope.days[i].withinFirstWeek;
				}
			}
			return firstLine;
		};

		$scope.drop = function(source, dest){
			var sourceExercice = {}, destDay = {};
			var sourceId = source.replace('source-', '');
			
			
			for (var i = 0; i < $scope.days.length; i++) {
				if($scope.days[i].customId === +dest){
					destDay = $scope.days[i];
				}
			}

			for (var j = 0; j < $scope.workouts.length; j++) {
				if($scope.workouts[j].id === +sourceId){
					sourceExercice = $scope.workouts[j];
				}
			}
			
		};

		function sameDay(d1, d2){
			return d1.isSame(d2, 'day');
		}
}]);