app.controller('StatsWeightBFCtrl', [
	'$scope',

	'BodyWeight',
	'BodyWeightGoal',
	'BodyFat',
	'BodyFatGoal',

	'chartService'

	, function ($scope, BodyWeight, BodyWeightGoal, BodyFat, BodyFatGoal, chartService) {

		$scope.init = function(){
			$scope.premises = 0;
			$scope.current = 'weight';
			$scope.boxes = {
				weight : true,
				bodyFat : true
			}

			$scope.bodyWeight = BodyWeight.byUser({user_id : 1}, testPremises);
			$scope.bodyWeightGoal = BodyWeightGoal.byUser({user_id : 1}, testPremises);
			$scope.bodyFat = BodyFat.byUser({user_id : 1}, testPremises);
			$scope.bodyFatGoal = BodyFatGoal.byUser({user_id : 1}, testPremises);
		};

		function testPremises(){
			$scope.premises++;
			if($scope.premises === 4){
				$scope.replot();				
			}
		}

		$scope.replot = function(){
			Chart.defaults.global.responsive = true;
			Chart.defaults.global.showTooltips = false;
			if($scope.current === 'weight'){
				plotWeight();
			} else {
				plotBf();
			}
		};

		function plotWeight(){
			var ctx = document.getElementById("chart").getContext("2d"),
				datas = [[], []],
				labels = [],
				avg = 0, max = 0, min = 1000, std = 0;
			
			for (var i = 0; i < $scope.bodyWeight.length; i++) {
				var record = $scope.bodyWeight[i];
				labels.push(record.date);
				datas[0].push($scope.bodyWeightGoal[0].weight);
				datas[1].push(record.weight);
				avg += +record.weight;
				max = +record.weight > max ? +record.weight : max;
				min = +record.weight > min ? min : +record.weight;
			}

			var data = chartService.getData(labels, datas);
			var myLineChart = new Chart(ctx).Line(data, {});

			avg /= $scope.bodyWeight.length;

			for (var i = 0; i < $scope.bodyWeight.length; i++) {
				std += Math.pow(+$scope.bodyWeight[i].weight - avg, 2);
			}
			std /= $scope.bodyWeight.length;

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
				data : $scope.bodyWeightGoal[0].weight,
				unit : "kg"
			},{
				title : "Goal date",
				data : $scope.bodyWeightGoal[0].date,
				hr : true
			},{
				title : "Data count",
				data : $scope.bodyWeight.length,
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
				datas = [[], []],
				labels = [],
				avg = 0, max = 0, min = 1000, std = 0;
			
			for (var i = 0; i < $scope.bodyFat.length; i++) {
				var record = $scope.bodyFat[i];
				labels.push(record.date);
				datas[0].push(record.percent);
				datas[1].push($scope.bodyFatGoal[0].percent);
				avg += +record.percent;
				max = +record.percent > max ? +record.percent : max;
				min = +record.percent > min ? min : +record.percent;
			}

			var data = chartService.getData(labels, datas);
			var myLineChart = new Chart(ctx).Line(data, {});

			avg /= $scope.bodyFat.length;

			for (var i = 0; i < $scope.bodyFat.length; i++) {
				std += Math.pow(+$scope.bodyFat[i].percent - avg, 2);
			}
			std /= $scope.bodyFat.length;

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
				data : $scope.bodyFatGoal[0].percent,
				unit : "%"
			},{
				title : "Goal date",
				data : $scope.bodyFatGoal[0].date,
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