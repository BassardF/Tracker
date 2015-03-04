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
			$scope.workout.exercices.push({
				number : $scope.workout.exercices.length + 1
			});
		};

}]);