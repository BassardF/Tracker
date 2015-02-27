app.controller('GoalBodyWeightController', [
	'$scope',
	'BodyWeightGoal',
	'BodyWeight',

	function ($scope, BodyWeightGoal, BodyWeight) {

		$scope.init = function(){
			$scope.bodyWeightGoals = BodyWeightGoal.allByUser({user_id : 1});
			$scope.currentBodyWeight = BodyWeight.lastByUser({user_id : 1});
			$scope.weight = new BodyWeightGoal();
		};

		$scope.save = function(){
			$scope.weight.$save($scope.init);
		};
}]);