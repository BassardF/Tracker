app.controller('GoalPerformanceController', [
	'$scope',

	'Exercices',
	'PerformanceGoal',

	function ($scope, Exercices, PerformanceGoal) {

		$scope.init = function(){
			$scope.newGoal = new PerformanceGoal();
			$scope.newGoal.count = 1;
			$scope.performanceGoal = PerformanceGoal.byUser({user_id : 1});
			$scope.exercices = Exercices.all({user_id : 1}, function(){
				$scope.exercice = $scope.exercices[0];
			});
		};

		$scope.$watch('exercice', function(newValue, oldValue) {
			if(newValue){
				for (var i = 0; i < $scope.performanceGoal.length; i++) {
					var goal = $scope.performanceGoal[i];
					if(goal.exercice_id === newValue.id){
						$scope.selectedGoal = goal;
					}
				}
			}
		});

		$scope.$watch('newGoal.count', function(newValue, oldValue) {
			if(newValue){
				$scope.reps = [];
				for (var i = 0; i < newValue; i++) {
					$scope.reps.push({
						index : i+1,
						reps : 0
					});
				}
			}
		});

		$scope.save = function(){
			$scope.newGoal.reps = [];
			for (var i = 0; i < $scope.reps.length; i++) {
				$scope.newGoal.reps.push($scope.reps[i].reps);
			}
			$scope.newGoal.reps = $scope.newGoal.reps.join('-');
			$scope.newGoal.exercice_id = $scope.exercice.id;
			$scope.newGoal.$save();
		};

}]);