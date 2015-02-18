app.controller('StatsPerformanceCtrl', [
	'$scope',

	'Users',
	'Exercices'

	, function ($scope, Users, Exercices) {

		$scope.init = function(){
			Users.allExercices({
				user_id : 1
			}, function(data){
				$scope.exercices = data;
				$scope.selectedExercice = $scope.exercices[0];
				$scope.changeExercice($scope.selectedExercice);				
			});
		};

		$scope.changeExercice = function(exercice){
			Users.allSchedulesExercices({
				user_id : 1,
				exercice_id : exercice.id
			}, function(data){

			});
		};

}]);