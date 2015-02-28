app.controller('MeasureWeightController', [
	'$scope',

	'BodyWeight',

	function ($scope, BodyWeight) {

		$scope.init = function(){
			$scope.bodyWeight = BodyWeight.lastByUser({user_id : 1});
			$scope.newBodyWeight = new BodyWeight();
		};

		$scope.save = function(){
			$scope.newBodyWeight.$save();	
		};
}]);