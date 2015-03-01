app.controller('ExerciceExercicesController', [
	'$scope',

	function ($scope) {

		$scope.init = function(){
			draw();
		};

		function draw(){
			var height = 400,
				width = 200,
				paper1 = new Raphael(document.getElementById('raphael-canevas-front'), width, height),
				image1 = paper1.image("img/svg/body-front.svg", 0, 0, width, height),
				paper2 = new Raphael(document.getElementById('raphael-canevas-back'), width, height),
				image2 = paper2.image("img/svg/body-back.svg", 0, 0, width, height);
		}

}]);