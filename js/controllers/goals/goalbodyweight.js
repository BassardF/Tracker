app.controller('GoalBodyWeightController', [
	'$scope',
	'BodyWeightGoal',
	'BodyWeight',

	function ($scope, BodyWeightGoal, BodyWeight) {

		$scope.bodyWeightGoals = BodyWeightGoal.allByUser({user_id : 1});
		$scope.currentBodyWeight = BodyWeight.lastByUser({user_id : 1});
		$scope.goal = new BodyWeightGoal();
		$scope.goal.date = new Date();

		$scope.currentBodyWeight.$promise.then(function(){
			$scope.currentBodyWeight.date = moment($scope.currentBodyWeight.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
		});

		$scope.bodyWeightGoals.$promise.then(function(){
			for (var i = 0; i < $scope.bodyWeightGoals.length; i++) {
				var goal = $scope.bodyWeightGoals[i];
				goal.date = moment(goal.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
				goal.date_reached = goal.date_reached ? moment(goal.date_reached, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
			}
		});

		$scope.save = function(){
			$scope.goal.users_id = 1;
			$scope.goal.$save($scope.init);
		};
}]);