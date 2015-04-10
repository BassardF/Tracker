app.controller('StatsPerformanceCtrl', [
	'$scope',
	
	'Exercices',
	'SchedulesExercices',
	'chartService'

	, function ($scope, Exercices, SchedulesExercices, chartService) {

		Chart.defaults.global.responsive = true;
		Chart.defaults.global.showTooltips = false;

		$scope.exercices = Exercices.byUser({user_id : 1}, function(){
			$scope.selectedExercice = $scope.exercices[0];
			$scope.changeExercice();
		});

		$scope.boxes = {
			rest : true,
			weight : true,
			reps : true,
			series : true
		}

		$scope.changeExercice = function(){
			$scope.records = SchedulesExercices.byExercice({
				user_id : 1,
				exercice_id : $scope.selectedExercice.id
			}, function(){
				$scope.startDate = moment($scope.records[0].date, 'YYYY-MM-DD').toDate();
				$scope.endDate = moment($scope.records[$scope.records.length - 1].date, 'YYYY-MM-DD').toDate();
				plot();
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

		function plot(){
			
			var rec = [];
			for (var a = 0; a < $scope.records.length; a++) {
				var date = moment($scope.records[a].date, 'YYYY-MM-DD').toDate();
				if(date >= $scope.startDate && date <= $scope.endDate){
					rec.push($scope.records[a]);
				}
			}

			var ctx = document.getElementById("chart").getContext("2d"),
				datas = [[], [], [], []],
				labels = [];
			
			for (var i = 0; i < rec.length; i++) {
				var record = rec[i];
				labels.push(moment(record.date, 'YYYY-MM-DD').format('DD/MM/YYYY'));
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
			calculate(rec);
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

		function calculate(rec){

			var max = {value : 0, date : ''},
				min = {value : 1000, date : ''},
				avgWeight = 0,
				avgSeries = 0,
				avgReps = 0,
				varWeight = 0,
				varSeries = 0,
				varReps = 0;

			for (var i = 0; i < rec.length; i++) {
				var record = rec[i];
				avgWeight += record.weight;
				avgSeries += record.count;
				avgReps += getAvgReps(record.reps);
				if(record.weight > max.value){
					max.value = record.weight;
					max.date = moment(record.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
				}
				if(record.weight < min.value){
					min.value = record.weight;
					min.date = moment(record.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
				}
			}

			for (var j = 0; j < rec.length; j++) {
				var record_ = rec[j];
				varWeight = Math.pow(record.weight - (avgWeight/rec.length), 2);
				varSeries = Math.pow(record.count - (avgSeries/rec.length), 2);
				varReps = Math.pow(getAvgReps(record.reps) - (avgReps/rec.length), 2);
			}

			$scope.stats = {
				dataCount : rec.length,
				maxWeight : max,
				minWeight : min,
				avgWeight : Math.round(100 * avgWeight / rec.length) / 100,
				avgSeries : Math.round(100 * avgSeries / rec.length) / 100,
				avgReps : Math.round(100 * avgReps / rec.length) / 100,
				firstRecord : moment(rec[0].date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
				lastRecord : moment(rec[rec.length - 1].date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
				varWeight : Math.round(Math.sqrt(varWeight / rec.length) * 100) / 100,
				varSeries : Math.round(Math.sqrt(varSeries / rec.length) * 100) / 100,
				varReps : Math.round(Math.sqrt(varReps / rec.length) * 100) / 100
			};
		}
}]);