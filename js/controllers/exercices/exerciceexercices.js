app.controller('ExerciceExercicesController', [
	'$scope',

	'Areas',

	function ($scope, Areas) {

		$scope.init = function(){			
			draw();
			$scope.areas = Areas.all();
		};

		function draw(){
			var height = 400,
				width = 200,
				paper1 = new Raphael(document.getElementById('raphael-canevas-front'), width, height),
				image1 = paper1.image("img/svg/body-front.svg", 0, 0, width, height),
				paper2 = new Raphael(document.getElementById('raphael-canevas-back'), width, height),
				image2 = paper2.image("img/svg/body-back.svg", 0, 0, width, height);

			$scope.front = paper1;
			$scope.back = paper2;
		}

		$scope.draw = function(area){
			console.log(area);
			$scope.front.path(area.path).attr({"type":"path","stroke":"blue","fill":"red"});
		};

}]);