app.controller('MeasureWeightController', [
	'$scope',

	'BodyWeight',

	function ($scope, BodyWeight) {

		$scope.init = function(){
			$scope.bodyWeight = BodyWeight.lastByUser({user_id : 1});
			$scope.bodyWeight.$promise.then(function(){
				$scope.bodyWeight.date = moment($scope.bodyWeight.date).format('YYYY-MM-DD');
			});
			$scope.newBodyWeight = new BodyWeight();
		};

		$scope.save = function(){
			$scope.newBodyWeight.users_id = 1;
			$scope.newBodyWeight.$save();	
		};
}]);