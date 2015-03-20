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
			$scope.workout.users_id = 1;
			for (var i = 0; i < $scope.workout.exercices.length; i++) {
				$scope.workout.exercices[i].reps = $scope.workout.exercices[i].reps.join('-');
			}
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

		$scope.changeExerciceCount= function(exercice){
			var tab = [];
			for (var i = 0; i < exercice.count; i++) {
				tab[i] = exercice.reps[i] ?	exercice.reps[i] : 1;
			}
			exercice.reps = tab;
		};

		$scope.changeRep = function(exercice, index, rep){
			exercice.reps[index] = rep;
		};

		$scope.deleteExercice = function(exercice){
			for (var i = 0; i < $scope.workout.exercices.length; i++) {
				if($scope.workout.exercices[i] == exercice){
					$scope.workout.exercices.splice(i, 1);
				}
			}
		};
}]);