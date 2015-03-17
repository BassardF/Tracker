app.factory('Exercices', ['$resource', function($resource) {

	return $resource('json/exercices/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "json/users/:user_id/exercices/all.json"}
	});

}]);

app.factory('Planned', ['$resource', function($resource) {

	return $resource('json/planned/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "json/planned/all.json"}
	});

}]);

app.factory('Users', ['$resource', function($resource) {

	return $resource('json/users/:id', {id : '@id'}, {});

}]);

app.factory('SchedulesExercices', ['$resource', function($resource) {

	return $resource('json/users/:user_id/schedules-exercices/exercices/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "json/users/:user_id/schedules-exercices/all.json"},
		byExercice: {method: "GET", isArray: true, url: "json/users/:user_id/schedules-exercices/exercices/:exercice_id/all.json"}
	});

}]);

app.factory('BodyWeight', ['$resource', function($resource) {

	return $resource('json/body-weight/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "json/users/:user_id/body-weight/all.json"},
		lastByUser: {method: "GET", url: "json/users/:user_id/body-weight/last.json"}
	});

}]);

app.factory('BodyWeightGoal', ['$resource', function($resource) {

	return $resource('json/body-weight-goal/:id', {id : '@id'}, {
		lastByUser: {method: "GET", url: "json/users/:user_id/body-weight-goal/last.json"},
		allByUser: {method: "GET", isArray: true, url: "json/users/:user_id/body-weight-goal/all.json"}
	});

}]);

app.factory('BodyFat', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/body-fat/:id', {id : '@id'}, {
		lastByUser: {method: "GET", url: "http://fake.co:3000/body-fat/users/:user_id/last"},
		byUser: {method: "GET", isArray: true, url: "http://fake.co:3000/body-fat/users/:user_id"}
	});

}]);

app.factory('BodyFatGoal', ['$resource', function($resource) {

	return $resource('json/body-fat-goal/:id', {id : '@id'}, {
		lastByUser: {method: "GET", url: "json/users/:user_id/body-fat-goal/last.json"},
		allByUser: {method: "GET", isArray: true, url: "json/users/:user_id/body-fat-goal/all.json"}
	});

}]);

app.factory('Measurements', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/measurements/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://fake.co:3000/measurements"}
	});

}]);

app.factory('UserMeasurements', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/user-measurements/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://fake.co:3000/user-measurements"},
		byUser: {method: "GET", isArray: true, url: "http://fake.co:3000/user-measurements/users/:user_id"}
	});

}]);

app.factory('MeasurementsGoal', ['$resource', function($resource) {

	return $resource('json/user-measurements-goals/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "json/users/:user_id/measurements-goals/all.json"}
	});

}]);

app.factory('PerformanceGoal', ['$resource', function($resource) {

	return $resource('json/user-performance-goals/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "json/users/:user_id/performance-goals/all.json"}
	});

}]);

app.factory('Areas', ['$resource', function($resource) {

	return $resource('json/areas/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "json/areas/all.json"}
	});

}]);

app.factory('Workout', ['$resource', function($resource) {

	return $resource('json/workouts/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "json/workouts/all.json"}
	});

}]);