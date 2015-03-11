app.controller('NavbarController', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) !== -1;
    };

    $scope.isActiveStrict = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);