app.factory('Exercices', ['$resource', function($resource) {

	return $resource('json/exercices/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "json/users/:user_id/exercices/all.json"}
	});

}]);

app.factory('Users', ['$resource', function($resource) {

	return $resource('json/users/:id', {id : '@id'}, {});

}]);

app.factory('SchedulesExercices', ['$resource', function($resource) {

	return $resource('json/users/:user_id/schedules-exercices/exercices/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "json/users/:user_id/schedules-exercices/exercices/:exercice_id/all.json"}
	});

}]);

app.factory('BodyWeight', ['$resource', function($resource) {

	return $resource('json/body-weight/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "json/users/:user_id/body-weight/all.json"}
	});

}]);

app.factory('BodyWeightGoal', ['$resource', function($resource) {

	return $resource('json/body-weight-goal/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "json/users/:user_id/body-weight-goal/all.json"}
	});

}]);

app.factory('BodyFat', ['$resource', function($resource) {

	return $resource('json/body-fat/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "json/users/:user_id/body-fat/all.json"}
	});

}]);

app.factory('BodyFatGoal', ['$resource', function($resource) {

	return $resource('json/body-fat-goal/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "json/users/:user_id/body-fat-goal/all.json"}
	});

}]);

app.factory('Measurements', ['$resource', function($resource) {

	return $resource('json/user-measurements/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "json/users/:user_id/user-measurements/all.json"}
	});

}]);