app.controller('NavbarController', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) !== -1;
    };

    $scope.isActiveStrict = function (viewLocation) {
    	console.log(viewLocation === $location.path());
    	console.log(viewLocation);
    	console.log($location.path());
        return viewLocation === $location.path();
    };
}]);