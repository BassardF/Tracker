app.controller('MeasureWeightController', [
	'$scope',

	'BodyWeight',

	function ($scope, BodyWeight) {

		$scope.bodyWeight = BodyWeight.lastByUser({user_id : 1});
		$scope.bodyWeight.$promise.then(function(){
			$scope.bodyWeight.date = moment($scope.bodyWeight.date).format('YYYY-MM-DD');
		});
		$scope.newBodyWeight = new BodyWeight();
		$scope.newBodyWeight.date = new Date();

		$scope.save = function(){
			$scope.newBodyWeight.users_id = 1;
			$scope.newBodyWeight.$save();	
		};
}]);