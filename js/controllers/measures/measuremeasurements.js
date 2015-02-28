app.controller('MeasureMeasurementsController', [
	'$scope',
	'Measurements',

	function ($scope, Measurements) {

		$scope.init = function(){
			$scope.measurements = Measurements.all({user_id : 1}, draw);
			$scope.newMeasure = new Measurements();
		};

		function draw(){
			var height = 400,
				width = 200,
				paper = new Raphael(document.getElementById('raphael-canevas'), width, height),
				image = paper.image("img/svg/body-front.svg", 0, 0, width, height);

			$scope.tabLine = [];
			for (var i = 0; i < $scope.measurements.length; i++) {
				var measurement = $scope.measurements[i]
				drawMeasurements(measurement, paper, width, height, measurement.lines);
			}
		}

		function drawMeasurements(measurement, paper, width, height, lines){
			for (var i = 0; i < lines.length; i++) {
				var line = lines[i],
					path = "Mx1 y1Lx2 y2".replace("x1", line.x1*width/100).replace("y1", line.y1*height/100).replace("x2", line.x2*width/100).replace("y2", line.y2*height/100),
					svg = paper.path(path).attr({"stroke" : "grey", "stroke-width" : 3});

				$scope.tabLine.push({
					measurement : measurement,
					line : svg
				});
				svg.hover(function(){
					document.getElementById("raphael-canevas").style.cursor = "pointer";
				}, function(){
					document.getElementById("raphael-canevas").style.cursor = "default";
				});
				svg.click(function(){
					$scope.$apply(function(){
						$scope.measurement = measurement;
					});
					$scope.changeMeasurements(measurement);
				});
			}
		}

		$scope.changeMeasurements = function(measurement){
			for (var i = 0; i < $scope.tabLine.length; i++) {
				var tabLine = $scope.tabLine[i];
				if(tabLine.measurement.id === measurement.id){
					tabLine.line.attr("stroke", "#E74C3C");
				} else {
					tabLine.line.attr("stroke", "grey");
				}
			}
		};

		$scope.save = function(){
			$scope.newMeasure.$save();
		};
}]);