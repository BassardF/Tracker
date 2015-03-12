app.controller('PlanController', [
	'$scope',

	function ($scope) {

		$scope.init = function(){
			$scope.days = [];
			$scope.months = [];
			$scope.today = moment(new Date());
			$scope.year = $scope.today.year().format('YYYY');
			for (var i = 0; i < $scope.today.daysInMonth(); i++) {
				$scope.days.push(moment().date(i));
			}
			for (var j = 0; j < 12; j++) {
				$scope.months.push(moment().month(j).format('MMMM'));
			}
		};

}]);