app.controller('GoalBodyFatController', [
	'$scope',
	'BodyFatGoal',
	'BodyFat',

	function ($scope, BodyFatGoal, BodyFat) {

		$scope.init = function(){
			$scope.bodyFatGoals = BodyFatGoal.allByUser({user_id : 1});
			$scope.currentBodyFat = BodyFat.lastByUser({user_id : 1});
			$scope.goal = new BodyFatGoal();
		};

		$scope.save = function(){
			$scope.goal.$save($scope.init);
		};
}]);