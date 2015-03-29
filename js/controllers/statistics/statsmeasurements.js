app.controller('StatsMeasurementsCtrl', [
	'$scope',
	'$q',
	'UserMeasurements',
	'Measurements',
	'chartService',

	function ($scope, $q, UserMeasurements, Measurements, chartService) {

		Chart.defaults.global.responsive = true;
		Chart.defaults.global.showTooltips = false;

		$scope.measures = Measurements.all();
		$scope.measurements = UserMeasurements.byUser({user_id : 1});

		$q.all([
				$scope.measures.$promise, 
				$scope.measurements.$promise
			]).then(function(values) {        
				$scope.startDate = moment($scope.measurements[0].date, 'YYYY-MM-DD').toDate();
				$scope.endDate = moment($scope.measurements[$scope.measurements.length - 1].date, 'YYYY-MM-DD').toDate();
				$scope.selectedMeasure = $scope.measures[0];
				$scope.plotMeasurements();
		});

		$scope.plotMeasurements = function(){

			var measure = $scope.selectedMeasure;
			var tab = [];
			for (var i = 0; i < $scope.measurements.length; i++) {
				var date = moment($scope.measurements[i].date, 'YYYY-MM-DD').toDate();
				if($scope.measurements[i].measurements_id === measure.id && date >= $scope.startDate && date <= $scope.endDate){
					tab.push($scope.measurements[i]);
				}
			}

			var ctx = document.getElementById("chart").getContext("2d"),
				datas = [[]],
				labels = [],
				avg = 0, max = 0, min = 1000, std = 0;

			for (var j = 0; j < tab.length; j++) {
				labels.push(moment(tab[j].date, "YYYY-MM-DD").format("DD-MM-YYYY"));
				datas[0].push(tab[j].value);
				avg += +tab[j].value;
				max = +tab[j].value > max ? +tab[j].value : max;
				min = +tab[j].value > min ? min : +tab[j].value;
			}

			avg /= tab.length;

			var data = chartService.getData(labels, datas);
			var myLineChart = new Chart(ctx).Line(data, {});

			for (var k = 0; k < tab.length; k++) {
				std += Math.pow(tab[k].value - avg, 2);
			}

			std /= tab.length;

			$scope.labels = [{
				name : measure.name,
				color : chartService.getColor(0),
				unit : "cm"
			}];

			$scope.generalData = [{
				title : "Data count",
				data : tab.length,
				hr : true
			}, {
				title : "Average",
				data : Math.round(avg * 100) / 100,
				unit : "cm"
			}, {
				title : "Std",
				data : Math.round(Math.sqrt(std) * 100) / 100,
				unit : "cm"
			}];

			$scope.extremeData = [{
				title : "Maximum",
				data : max,
				unit : "cm"
			}, {
				title : "Minimum",
				data : min,
				unit : "cm"
			}];
		}

}]);