app.controller('MeasureBodyFatController', [
	'$scope',

	'BodyFat',

	function ($scope, BodyFat) {

		$scope.init = function(){
			$scope.bodyFat = BodyFat.lastByUser({user_id : 1});
			$scope.newBodyFat = new BodyFat();
		};

		$scope.save = function(){
			$scope.newBodyFat.$save();	
		};

}]);