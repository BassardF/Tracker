app.controller('ExerciceWorkoutsController', [
	'$scope',
	'Workout',
	'Exercices',

	function ($scope, Workout, Exercices) {

		$scope.init = function(){
			$scope.workout = new Workout();
			$scope.workout.exercices = [];
			$scope.exercices = Exercices.all({user_id : 1});
		};

		$scope.save = function(){
			$scope.workout.$save();
		};

		$scope.addExercice = function(){
			for (var i = 0; i < $scope.workout.exercices.length; i++) {
				$scope.workout.exercices[i].selected = false;
			}
			$scope.workout.exercices.push({
				number : $scope.workout.exercices.length + 1,
				selected : true,
				count : 1,
				reps : [1]
			});
		};

		$scope.selectExercice = function(exercice){
			for (var i = 0; i < $scope.workout.exercices.length; i++) {
				$scope.workout.exercices[i].selected = false;
			}
			exercice.selected = true;
		}

}]);