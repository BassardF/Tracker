app.controller('GoalBodyFatController', [
	'$scope',
	'BodyFatGoal',
	'BodyFat',

	function ($scope, BodyFatGoal, BodyFat) {

		$scope.bodyFatGoals = BodyFatGoal.allByUser({user_id : 1});
		$scope.currentBodyFat = BodyFat.lastByUser({user_id : 1});
		$scope.goal = new BodyFatGoal();
		$scope.goal.date = new Date();

		$scope.currentBodyFat.$promise.then(function(){
			$scope.currentBodyFat.date = moment($scope.currentBodyFat.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
		});

		$scope.bodyFatGoals.$promise.then(function(){
			for (var i = 0; i < $scope.bodyFatGoals.length; i++) {
				var goal = $scope.bodyFatGoals[i];
				goal.date = moment(goal.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
				goal.date_reached = goal.date_reached ? moment(goal.date_reached, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
			}
		});

		$scope.save = function(){
			$scope.goal.users_id = 1;
			$scope.goal.$save($scope.init);
		};
}]);