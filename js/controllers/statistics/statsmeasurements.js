app.controller('StatsMeasurementsCtrl', [
	'$scope',

	'Measurements',

	'chartService',

	function ($scope, Measurements, chartService) {

		$scope.init = function(){
			$scope.measurements = Measurements.byUser({user_id : 1}, isolateMeasurements);
		};

		function isolateMeasurements(data){
			var tab = [], token = false;
			for (var i = 0; i < data.length; i++) {
				var measure = data[i];
				token = false;
				for (var j = 0; j < tab.length; j++) {
					if(tab[j].id === measure.measurement.id){
						token = true;
					}
				}
				if(!token){
					tab.push(measure.measurement);
				}
			}
			$scope.measures = tab;
			$scope.selectedMeasure = tab[0];
			$scope.plotMeasurements(tab[0]);
		}

		$scope.plotMeasurements = function(measure){
			Chart.defaults.global.responsive = true;
			Chart.defaults.global.showTooltips = false;
			var tab = [];
			for (var i = 0; i < $scope.measurements.length; i++) {
				if($scope.measurements[i].measurement.id === measure.id){
					tab.push($scope.measurements[i]);
				}
			}

			var ctx = document.getElementById("chart").getContext("2d"),
				datas = [[]],
				labels = [],
				avg = 0, max = 0, min = 1000, std = 0;

			for (var j = 0; j < tab.length; j++) {
				labels.push(tab[j].date);
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