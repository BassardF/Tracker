app.service('chartService', [function() {

	function getStrokeColor(number){
		var colors = ["rgba(236,240,241,1)", "rgba(52,152,219,1)", "rgba(41,128,185,1)", "rgba(44,62,80,1)"];
		return colors[number];
	}

	function getFillColor(number){
		var colors = ["rgba(236,240,241,0.2)", "rgba(52,152,219,0.2)", "rgba(41,128,185,0.2)", "rgba(44,62,80,0.2)"];
		return colors[number];
	}

	return {
		getData : function(labels, datas){
			var data = {
				labels : labels,
				datasets : []
			};
			for (var i = 0; i < datas.length; i++) {
				data.datasets.push({
		            label: '',
		            fillColor: getFillColor(i),
		            strokeColor: getStrokeColor(i),
		            pointColor: getStrokeColor(i),
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: datas[i]
				});
			}
			return data;
		},

		getColor : function(number){
			return getStrokeColor(number);
		}
	}

}]);