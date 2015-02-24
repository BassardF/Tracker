app.controller('StatsPerformanceCtrl', [
	'$scope',
	
	'Exercices',
	'SchedulesExercices',
	'chartService'

	, function ($scope, Exercices, SchedulesExercices, chartService) {

		$scope.init = function(){
			$scope.exercices = Exercices.all({user_id : 1}, function(){
				$scope.selectedExercice = $scope.exercices[0];
				$scope.changeExercice();
			});
			$scope.boxes = {
				rest : true,
				weight : true,
				reps : true,
				series : true
			}
		};

		$scope.changeExercice = function(){
			$scope.records = SchedulesExercices.byExercice({
				user_id : 1,
				exercice_id : $scope.selectedExercice.id
			}, function(){
				plot();
				$scope.startDate = $scope.records[0].date;
				$scope.endDate = $scope.records[$scope.records.length - 1].date;
			});
		};

		$scope.replot = function(){
			plot();
		};

		function getAvgReps(reps){
			var repArray = reps.split('-');
			var avg = 0;
			for (var i = 0; i < repArray.length; i++) {
				avg += +repArray[i];
			}
			return Math.round(avg/i);
		}

		function setLegend(){
			var labels = []; 
			$scope.labels = [];
			var i = 0;
			if($scope.boxes.rest){
				$scope.labels.push({
					name : 'Rest',
					color : chartService.getColor(i),
					unit : 'seconds'
				});
				i++;
			}
			if($scope.boxes.weight){
				$scope.labels.push({
					name : 'Weight',
					color : chartService.getColor(i),
					unit : 'kg'
				});
				i++;
			}
			if($scope.boxes.reps){
				$scope.labels.push({
					name : 'Average rep count',
					color : chartService.getColor(i)
				});
				i++;
			}
			if($scope.boxes.series){
				$scope.labels.push({
					name : 'Series count',
					color : chartService.getColor(i)
				});
				i++;
			}
		}

		function plot(){
			Chart.defaults.global.responsive = true;
			Chart.defaults.global.showTooltips = false;

			var ctx = document.getElementById("chart").getContext("2d"),
				datas = [[], [], [], []],
				labels = [];
			
			for (var i = 0; i < $scope.records.length; i++) {
				var record = $scope.records[i];
				labels.push(record.date);
				var j = 0;
				if($scope.boxes.rest){
					datas[j].push(record.rest);
					j++;
				}
				if($scope.boxes.weight){
					datas[j].push(record.weight);
					j++;
				}
				if($scope.boxes.reps){
					datas[j].push(getAvgReps(record.reps));
					j++;
				}
				if($scope.boxes.series){
					datas[j].push(record.count);
					j++;
				}
			}

			var data = chartService.getData(labels, datas);

			var myLineChart = new Chart(ctx).Line(data, {});

			setLegend();
			calculate();
		}

		function calculate(){

			var max = {value : 0, date : ''},
				min = {value : 1000, date : ''},
				avgWeight = 0,
				avgSeries = 0,
				avgReps = 0,
				varWeight = 0,
				varSeries = 0,
				varReps = 0;

			for (var i = 0; i < $scope.records.length; i++) {
				var record = $scope.records[i];
				avgWeight += record.weight;
				avgSeries += record.count;
				avgReps += getAvgReps(record.reps);
				if(record.weight > max.value){
					max.value = record.weight;
					max.date = record.date;
				}
				if(record.weight < min.value){
					min.value = record.weight;
					min.date = record.date;
				}
			}

			for (var j = 0; j < $scope.records.length; j++) {
				var record_ = $scope.records[j];
				varWeight = Math.pow(record.weight - (avgWeight/$scope.records.length), 2);
				varSeries = Math.pow(record.count - (avgSeries/$scope.records.length), 2);
				varReps = Math.pow(getAvgReps(record.reps) - (avgReps/$scope.records.length), 2);
			}			
			
			$scope.stats = {
				dataCount : $scope.records.length,
				maxWeight : max,
				minWeight : min,
				avgWeight : avgWeight / $scope.records.length,
				avgSeries : avgSeries / $scope.records.length,
				avgReps : avgReps / $scope.records.length,
				firstRecord : $scope.records[0].date,
				lastRecord : $scope.records[$scope.records.length - 1].date,
				varWeight : Math.sqrt(varWeight / $scope.records.length),
				varSeries : Math.sqrt(varSeries / $scope.records.length),
				varReps : Math.sqrt(varReps / $scope.records.length)
			};
		}
}]);