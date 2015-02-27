app.controller('GoalBodyFatController', [
	'$scope',
	'BodyFatGoal',

	function ($scope, BodyFatGoal) {

		$scope.init = function(){
			$scope.bodyFatGoals = BodyFatGoal.allByUser({user_id : 1});
			$scope.goal = new BodyFatGoal();
		};

		$scope.save = function(){
			$scope.goal.$save($scope.init);
		};
}]);