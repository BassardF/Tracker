app.controller('ExerciceExercicesController', [
	'$scope',

	'Areas',

	function ($scope, Areas) {

		$scope.init = function(){
			$scope.areas = Areas.all(setStyles);
			imgToSvg();
		};

		$scope.selectArea = function(area){
			
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
			}, 'xml');

			});
		}

		function setStyles(){
			for (var i = 0; i < $scope.areas.length; i++) {
				var theClass = $scope.areas[i].class;
				$("." + theClass).hover(function(){
					$(this).toggleClass('selected_area');
				});
			}
		}
}]);