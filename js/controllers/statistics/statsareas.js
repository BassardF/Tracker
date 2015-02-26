app.controller('StatsAreasCtrl', [
	'$scope',

	'SchedulesExercices',

	'chartService'

	,function ($scope, SchedulesExercices, chartService) {

		$scope.init = function(){
			Chart.defaults.global.responsive = true;
			Chart.defaults.global.showTooltips = false;
			$scope.exercices = SchedulesExercices.all({user_id : 1}, getAllAreas);			
		};

		function getAllAreas(){
			var areas = [];
			for (var i = 0; i < $scope.exercices.length; i++) {
				var currentAreas = $scope.exercices[i].exercice.areas;
				for (var j = 0; j < currentAreas.length; j++) {
					var area = currentAreas[j];
					var token = false;
					for (var k = 0; k < areas.length; k++) {
						if(areas[k].id === area.id){
							token = true;
						}
					}
					if(!token){
						area.selected = true;
						areas.push(area);
					}
				}
			}
			areas.sort(function(a, b){
				return a.name > b.name;
			});
			$scope.areas = areas;
			plot();
		}

		$scope.replot = function(){
			plot();
		};

		function plot(){
			var ctx = document.getElementById("chart").getContext("2d"),
				datas = [[]],
				labels = [],
				areaCount = 0, avg = 0, std = 0, min = 1000, max = 0;

			for (var i = 0; i < $scope.areas.length; i++) {
				if($scope.areas[i].selected){
					areaCount++;
					var trainingCount = getNumerOftraining($scope.areas[i]);
					avg += trainingCount;
					labels.push($scope.areas[i].name);
					datas[0].push(trainingCount);
					max = max > trainingCount ? max : trainingCount;
					min = min < trainingCount ? min : trainingCount;
				}
			}

			avg /= areaCount;

			for (var j = 0; j < $scope.areas.length; j++) {
				if($scope.areas[j].selected){
					var trainingCount = getNumerOftraining($scope.areas[j]);
					std += Math.pow(trainingCount - avg, 2);
				}
			}

			var data = chartService.getData(labels, datas);
			data.datasets[0].strokeColor = chartService.getColor(1);
			data.datasets[0].pointColor = chartService.getColor(1);
			data.datasets[0].fillColor = chartService.getFillColor(1);
			
			var myRadarChart = new Chart(ctx).Radar(data, {});

			$scope.generalData = [{
				title : "Records count",
				data : $scope.exercices.length,
				hr : true
			}, {
				title : "Average wourkouts count",
				data : Math.round(avg * 100) / 100
			}, {
				title : "Std wourkouts count",
				data : Math.round(Math.sqrt(std) * 100) / 100
			}];

			$scope.extremeData = [{
				title : "Maximum",
				data : max
			}, {
				title : "Minimum",
				data : min
			}];

		}

		function getNumerOftraining(area){
			var count = 0;
			for (var i = 0; i < $scope.exercices.length; i++) {
				var areas = $scope.exercices[i].exercice.areas;
				for (var j = 0; j < areas.length; j++) {
					if(areas[j].id == area.id){
						count++;
					}
				}
			}
			return count;
		}
}]);