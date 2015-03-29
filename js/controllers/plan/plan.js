app.controller('PlanController', [
	'$scope',
	'$q',
	'Workout',
	'Schedules',

	function ($scope, $q, Workout, Schedules) {

		$scope.days = [];
		$scope.months = [];

		$scope.workouts = Workout.all();
		$scope.schedules = Schedules.all();

		$scope.today = moment(new Date());
		$scope.year = $scope.today.year();

		$q.all([
			$scope.workouts.$promise,
			$scope.schedules.$promise
		]).then(function(){
			craft();
		});

		function craft(){
			var withinFirstWeek = true;

			for (var i = 0; i < $scope.today.daysInMonth(); i++) {
				var date = moment().date(i + 1);
				date.withinFirstWeek = withinFirstWeek;
				date.customId = i;
				withinFirstWeek = withinFirstWeek && date.isoWeekday() !== 7;
				date.schedules = [];
				for (var j = 0; j < $scope.schedules.length; j++) {
					if(sameDay(date, moment($scope.schedules[j].date, 'YYYY-MM-DD'))){
						date.schedules.push($scope.schedules[j]);
					}
				}
				$scope.days.push(date);
			}

			for (var k = 0; k < 12; k++) {
				$scope.months.push({
					date : moment().month(k).format('MMMM'),
					selected : $scope.today.isSame(moment().month(k), 'month') ? 'selected-month' : ''
				});
			}
			console.log($scope.months);
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
			var sourceExercice = {}, selectedDay = {};
			var sourceId = source.replace('source-', '');
			
			
			for (var i = 0; i < $scope.days.length; i++) {
				if($scope.days[i].customId === +dest){
					selectedDay = $scope.days[i];
				}
			}

			for (var j = 0; j < $scope.workouts.length; j++) {
				if($scope.workouts[j].id === +sourceId){
					sourceExercice = $scope.workouts[j];
				}
			}
			scheduleWorkout(sourceExercice, selectedDay);
			
		};

		function scheduleWorkout(workout, date){
			var schedule = new Schedules({
				users_id : 1,
				workouts_id : workout.id,
				date : date
			});
			schedule.$save();
		}

		function sameDay(d1, d2){
			return d1.isSame(d2, 'day');
		}
}]);