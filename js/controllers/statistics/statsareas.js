app.controller('StatsAreasCtrl', [
	'$scope',

	'SchedulesExercices',

	'chartService'

	,function ($scope, SchedulesExercices, chartService) {

		$scope.init = function(){
			Chart.defaults.global.responsive = true;
			Chart.defaults.global.showTooltips = false;
			$scope.areas = SchedulesExercices.byUser({user_id : 1}, manageAreas);			
		};

		function manageAreas(){
			for (var i = 0; i < $scope.areas.length; i++) {
				$scope.areas[i].selected = true;
			}
			$scope.areas.sort(function(a, b){
				return a.name > b.name;
			});
			plot();
		}

		$scope.replot = function(){
			plot();
		};

		function plot(){
			var ctx = document.getElementById("chart").getContext("2d"),
				datas = [[]],
				labels = [],
				areaCount = 0, avg = 0, std = 0, min = 1000, max = 0, count = 0;

			for (var i = 0; i < $scope.areas.length; i++) {
				if($scope.areas[i].selected){
					count++;
					areaCount+= $scope.areas[i].count;
					var trainingCount = $scope.areas[i].count;
					avg += trainingCount;
					labels.push($scope.areas[i].name);
					datas[0].push(trainingCount);
					max = max > trainingCount ? max : trainingCount;
					min = min < trainingCount ? min : trainingCount;
				}
			}

			avg /= count;

			
			for (var j = 0; j < $scope.areas.length; j++) {
				if($scope.areas[j].selected){
					var trainingCount = $scope.areas[j].count;
					std += Math.pow(trainingCount - avg, 2);
				}
			}

			var data = chartService.getData(labels, datas);
			data.datasets[0].strokeColor = chartService.getColor(1);
			data.datasets[0].pointColor = chartService.getColor(1);
			data.datasets[0].fillColor = chartService.getFillColor(1);
			
			var myRadarChart = new Chart(ctx).Radar(data, {});

			$scope.generalData = [{
				title : "Areas count",
				data : count,
				hr : true
			}, {
				title : "Records count",
				data : areaCount,
				hr : true
			}, {
				title : "Average count",
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
}]);