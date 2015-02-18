app.factory('Exercices', ['$resource', function($resource) {

	return $resource('json/exercices/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "json/exercices/all.json"}
	});

}]);

app.factory('Users', ['$resource', function($resource) {

	return $resource('json/users/:id', {id : '@id'}, {
		allExercices: {method: "GET", isArray: true, url: "json/users/:user_id/exercices/all.json"},
		allSchedulesExercices: {method: "GET", isArray: true, url: "json/users/:user_id/schedules-exercices/exercices/:exercice_id/all.json"},
	});

}]);