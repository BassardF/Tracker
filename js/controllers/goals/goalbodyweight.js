app.controller('GoalBodyWeightController', [
	'$scope',
	'BodyWeightGoal',
	'BodyWeight',

	function ($scope, BodyWeightGoal, BodyWeight) {

		$scope.init = function(){
			$scope.bodyWeightGoals = BodyWeightGoal.allByUser({user_id : 1});
			$scope.currentBodyWeight = BodyWeight.lastByUser({user_id : 1});
			$scope.goal = new BodyWeightGoal();
		};

		$scope.save = function(){
			$scope.goal.users_id = 1;
			$scope.goal.$save($scope.init);
		};
}]);