app.controller('StatsPerformanceCtrl', [
	'$scope',

	'Users',
	'Exercices'

	, function ($scope, Users, Exercices) {

		$scope.init = function(){
			$scope.exercices = Users.allExercices({user_id : 1}, function(){
				$scope.selectedExercice = $scope.exercices[0];
				$scope.changeExercice();
			});
		};

		$scope.changeExercice = function(){
			$scope.records = Users.allSchedulesExercices({
				user_id : 1,
				exercice_id : $scope.selectedExercice.id
			});
			plot();
		};

		function plot(){
			Chart.defaults.global.responsive = true;
			var ctx = document.getElementById("chart").getContext("2d");
			var data = {
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: [65, 59, 80, 81, 56, 55, 40]
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: [28, 48, 40, 19, 86, 27, 90]
			        }
			    ]
			};

			var myLineChart = new Chart(ctx).Line(data, {});
			width = document.getElementById("chart").parentNode.offsetWidth;
			document.getElementById("chart").style.width = width;
			document.getElementById("chart").style.height = width/2;
		}

}]);