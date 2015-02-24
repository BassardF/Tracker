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
				labels = [];

			for (var i = 0; i < $scope.areas.length; i++) {
				if($scope.areas[i].selected){
					labels.push($scope.areas[i].name);
					datas[0].push(getNumerOftraining($scope.areas[i]));
				}
			}

			console.log(datas);
			var data = chartService.getData(labels, datas);
			var myRadarChart = new Chart(ctx).Radar(data, {});

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