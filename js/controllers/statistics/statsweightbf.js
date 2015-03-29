app.controller('StatsWeightBFCtrl', [
	'$scope',
	'$q',
	'BodyWeight',
	'BodyWeightGoal',
	'BodyFat',
	'BodyFatGoal',

	'chartService'

	, function ($scope, $q, BodyWeight, BodyWeightGoal, BodyFat, BodyFatGoal, chartService) {

		$scope.current = 'weight';
		$scope.boxes = {
			weight : true,
			bodyFat : true
		}
		$scope.bodyWeight = BodyWeight.byUser({user_id : 1});
		$scope.bodyWeightGoal = BodyWeightGoal.lastByUser({user_id : 1});
		$scope.bodyFat = BodyFat.byUser({user_id : 1});
		$scope.bodyFatGoal = BodyFatGoal.lastByUser({user_id : 1});

		$q.all([
			$scope.bodyWeight.$promise,
			$scope.bodyWeightGoal.$promise,
			$scope.bodyFat.$promise,
			$scope.bodyFatGoal.$promise
		]).then(function(){				
			$scope.replot(true);
		});

		$scope.replot = function(reBound){
			Chart.defaults.global.responsive = true;
			Chart.defaults.global.showTooltips = false;
			if($scope.current === 'weight'){
				if(reBound){
					$scope.startDate = moment($scope.bodyWeight[0].date, 'YYYY-MM-DD').toDate();
					$scope.endDate = moment($scope.bodyWeight[$scope.bodyWeight.length - 1].date, 'YYYY-MM-DD').toDate();
				}
				plotWeight();
			} else {
				if(reBound){
					$scope.startDate = moment($scope.bodyFat[0].date, 'YYYY-MM-DD').toDate();
					$scope.endDate = moment($scope.bodyFat[$scope.bodyFat.length - 1].date, 'YYYY-MM-DD').toDate();	
				}
				plotBf();
			}
		};

		function plotWeight(){
			var ctx = document.getElementById("chart").getContext("2d"),
				rec = [],
				datas = [[], []],
				labels = [],
				avg = 0, max = 0, min = 1000, std = 0;
			
			for (var a = 0; a < $scope.bodyWeight.length; a++) {
				var date = moment($scope.bodyWeight[a].date, 'YYYY-MM-DD').toDate();
				if(date >= $scope.startDate && date <= $scope.endDate){
					rec.push($scope.bodyWeight[a]);
				}
			}

			for (var i = 0; i < rec.length; i++) {
				var record = rec[i];
				labels.push(moment(record.date, 'YYYY-MM-DD').format('DD-MM-YYYY'));
				datas[0].push($scope.bodyWeightGoal.weight);
				datas[1].push(record.weight);
				avg += +record.weight;
				max = +record.weight > max ? +record.weight : max;
				min = +record.weight > min ? min : +record.weight;
			}

			var data = chartService.getData(labels, datas);
			var myLineChart = new Chart(ctx).Line(data, {});

			avg /= rec.length;

			for (var i = 0; i < rec.length; i++) {
				std += Math.pow(+rec[i].weight - avg, 2);
			}
			std /= rec.length;

			$scope.labels = [{
				name : "Weight",
				color : chartService.getColor(1),
				unit : "kg"
			}, {
				name : "Goal",
				color : chartService.getColor(0),
				unit : "kg"
			}];

			$scope.generalData = [{
				title : "Goal weight",
				data : $scope.bodyWeightGoal.weight,
				unit : "kg"
			},{
				title : "Goal date",
				data : moment($scope.bodyWeightGoal.date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
				hr : true
			},{
				title : "Data count",
				data : rec.length,
				hr : true
			}, {
				title : "Average weight",
				data : Math.round(avg * 100) / 100,
				unit : "kg"
			}, {
				title : "Std weight",
				data : Math.round(Math.sqrt(std) * 100) / 100,
				unit : "kg"
			}];

			$scope.extremeData = [{
				title : "Heavier",
				data : max,
				unit : "kg"
			}, {
				title : "Lighter",
				data : min,
				unit : "kg"
			}];
		}

		function plotBf(){
			var ctx = document.getElementById("chart").getContext("2d"),
				rec = [],
				datas = [[], []],
				labels = [],
				avg = 0, max = 0, min = 1000, std = 0;

			for (var a = 0; a < $scope.bodyFat.length; a++) {
				var date = moment($scope.bodyFat[a].date, 'YYYY-MM-DD').toDate();
				if(date >= $scope.startDate && date <= $scope.endDate){
					rec.push($scope.bodyFat[a]);
				}
			}
			
			for (var i = 0; i < rec.length; i++) {
				var record = rec[i];
				labels.push(moment(record.date, 'YYYY-MM-DD').format('DD-MM-YYYY'));
				datas[0].push(record.percent);
				datas[1].push($scope.bodyFatGoal.percent);
				avg += +record.percent;
				max = +record.percent > max ? +record.percent : max;
				min = +record.percent > min ? min : +record.percent;
			}

			var data = chartService.getData(labels, datas);
			var myLineChart = new Chart(ctx).Line(data, {});

			avg /= rec.length;

			for (var i = 0; i < rec.length; i++) {
				std += Math.pow(+rec[i].percent - avg, 2);
			}
			std /= rec.length;

			$scope.labels = [{
				name : "Body fat",
				color : chartService.getColor(0),
				unit : "%"
			}, {
				name : "Goal",
				color : chartService.getColor(1),
				unit : "%"
			}];

			$scope.generalData = [{
				title : "Goal body fat",
				data : $scope.bodyFatGoal.percent,
				unit : "%"
			},{
				title : "Goal date",
				data : $scope.bodyFatGoal.date,
				hr : true
			},{
				title : "Data count",
				data : $scope.bodyFat.length,
				hr : true
			}, {
				title : "Average body fat",
				data : Math.round(avg * 100) / 100,
				unit : "%"
			}, {
				title : "Std body fat",
				data : Math.round(Math.sqrt(std) * 100) / 100,
				unit : "%"
			}];

			$scope.extremeData = [{
				title : "Maximum",
				data : max,
				unit : "%"
			}, {
				title : "Minimum",
				data : min,
				unit : "%"
			}];
		}
}]);