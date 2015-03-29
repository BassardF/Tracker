app.controller('MeasureBodyFatController', [
	'$scope',

	'BodyFat',

	function ($scope, BodyFat) {

		$scope.bodyFat = BodyFat.lastByUser({user_id : 1});
		$scope.bodyFat.$promise.then(function(){
			$scope.bodyFat.date = moment($scope.bodyFat.date).format('YYYY-MM-DD');
		});
		$scope.newBodyFat = new BodyFat();
		$scope.newBodyFat.date = new Date();

		$scope.save = function(){
			$scope.newBodyFat.users_id = 1;
			$scope.newBodyFat.$save();
		};

}]);