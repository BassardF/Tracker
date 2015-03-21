app.controller('TrackController', [
	'$scope',
	'Schedules',
	'SchedulesExercices',
	function ($scope, Schedules, SchedulesExercices){

		Schedules.byUser({
			user_id : 1
		}).$promise.then(function(awn){
			var today = moment(new Date());
			for (var i = 0; i < awn.length; i++) {
				var current = moment(awn[i].date);
				awn[i].span = getSpanLabel(current, today);
				awn[i].date = current.format('DD-MM-YYYY');
			}
			$scope.schedules = awn;
		});

		function getSpanLabel(current, today){
			var span = current.diff(today, 'days')
			var label = span + " days";
			if(span === 0){
				label = current.diff(today, 'hours') + ' hours';
			} else if(span === 1){
				label = "tomorrow";
			}
			return label;
		}

		$scope.selectSchedule = function(schedule){
			$scope.selectedSchedule = schedule;
			$scope.schedulesExercices = SchedulesExercices.bySchedule({
				schedule_id : schedule.id
			});

			$scope.schedulesExercices.$promise.then(function(awn){
				for (var i = 0; i < $scope.schedulesExercices.length; i++) {
					$scope.schedulesExercices[i].reps = $scope.schedulesExercices[i].reps.split('-');
					for (var j = 0; j < $scope.schedulesExercices[i].reps.length; j++) {
						$scope.schedulesExercices[i].reps[j] = +$scope.schedulesExercices[i].reps[j];
					}
				}
				$scope.selectedScheduleExercice = $scope.schedulesExercices[0];
			});
		};

		$scope.selectScheduleExercice = function(scheduleExercice){
			$scope.selectedScheduleExercice = scheduleExercice;
		};

		$scope.changeRep = function(schedulesExercice, index, rep){
			schedulesExercice.reps[index] = rep;
		};

		$scope.changeExerciceCount= function(schedulesExercice){
			var tab = [];
			for (var i = 0; i < schedulesExercice.count; i++) {
				tab[i] = schedulesExercice.reps[i] ? schedulesExercice.reps[i] : 1;
			}
			schedulesExercice.reps = tab;
		};
}]);