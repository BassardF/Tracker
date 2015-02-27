app.controller('GoalMeasurementsController', [
	'$scope',

	'Measurements',

	function ($scope, Measurements) {

		$scope.init = function(){
			$scope.measurements = Measurements.all({user_id : 1}, draw);			
		};

		function draw(){
			var height = 400,
				width = 200,
				paper = new Raphael(document.getElementById('raphael-canevas'), width, height),
				image = paper.image("img/svg/body-front.svg", 0, 0, width, height);

			for (var i = 0; i < $scope.measurements.length; i++) {
				var measurement = $scope.measurements[i]
				drawMeasurements(paper, width, height, measurement.lines);
			}
		}

		function drawMeasurements(paper, width, height, lines){
			var tabLine = [];
			for (var i = 0; i < lines.length; i++) {
				var line = lines[i];
				var path = "Mx1 y1Lx2 y2".replace("x1", line.x1*width/100).replace("y1", line.y1*height/100).replace("x2", line.x2*width/100).replace("y2", line.y2*height/100);
				tabLine.push(paper.path(path).attr({"stroke" : "#E74C3C", "stroke-width" : 2}));
			}
		}
}]);