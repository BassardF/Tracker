app.controller('ExerciceExercicesController', [
	'$scope',

	'Areas',
	'Exercices',

	function ($scope, Areas, Exercices) {

		$scope.init = function(){
			$scope.exercice = new Exercices();
			$scope.loaded = 0;
			$scope.areas = Areas.all(setStyles);
			imgToSvg();
		};

		$scope.selectArea = function(area){
			area.selected = !area.selected;
			var current = $(".svg ." + area.class).attr("class");
			if(area.selected){
				$(".svg ." + area.class).attr("class", "selected_area " + current);
			} else {
				$(".svg ." + area.class).attr("class", current.replace("selected_area ", ""));
			}
		};

		function imgToSvg(){
			jQuery('img.svg').each(function(){
			var $img = jQuery(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			jQuery.get(imgURL, function(data) {
				var $svg = jQuery(data).find('svg');

				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}
				$svg = $svg.removeAttr('xmlns:a');
				$img.replaceWith($svg);
				setStyles();
			}, 'xml');

			});
		}

		function setStyles(){
			if(++$scope.loaded === 3){
				for (var i = 0; i < $scope.areas.length; i++) {
					var theClass = $scope.areas[i].class;
					var current = $(".svg ." + theClass).attr("class");
					if(current.indexOf("selectable_area") === -1){
						$(".svg ." + theClass).attr("class", "selectable_area " + current);
					}
					$(".svg ." + theClass).click(function(){
						var areaClass = this.className.animVal.replace("selectable_area ", "").replace("selected_area ", "");
						var area = getAreaFromClass(areaClass);
						$scope.selectArea(area);
						$scope.$apply();
					});
				}
			}
		}

		function getAreaFromClass(areaClass){
			for (var i = 0; i < $scope.areas.length; i++) {
				if($scope.areas[i].class === areaClass){
					return $scope.areas[i];
				}
			}
		}

		$scope.save = function(){
			$scope.exercice.areas = [];
			for (var i = 0; i < $scope.areas.length; i++) {
				if($scope.areas[i].selected){
					$scope.exercice.areas.push($scope.areas[i].id);
				}
			}
			$scope.exercice.users_id = 1;
			$scope.exercice.$save();
			clearData();
		};

		function clearData(){
			for (var i = 0; i < $scope.areas.length; i++) {
				if($scope.areas[i].selected){
					$scope.selectArea($scope.areas[i]);
				}
			}
			$scope.exercice = new Exercices();
		}
}]);