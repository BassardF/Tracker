app.factory('Exercices', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/exercices/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://fake.co:3000/exercices"}
	});

}]);

app.factory('Schedules', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/schedules/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://fake.co:3000/schedules"},
		byUser: {method: "GET", isArray: true, url: "http://fake.co:3000/schedules/users/:user_id"}
	});

}]);

app.factory('Users', ['$resource', function($resource) {

	return $resource('json/users/:id', {id : '@id'}, {});

}]);

app.factory('SchedulesExercices', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/schedules-exercices/:id', {id : '@id'}, {
		bySchedule: {method: "GET", isArray: true, url: "http://fake.co:3000/schedules-exercices/schedules/:schedule_id"},
		byExercice: {method: "GET", isArray: true, url: "http://fake.co:3000/schedules-exercices/exercices/:exercice_id"},
		byUser: {method: "GET", isArray: true, url: "http://fake.co:3000/schedules-exercices/users/:user_id"}
	});

}]);

app.factory('BodyWeight', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/body-weight/:id', {id : '@id'}, {
		lastByUser: {method: "GET", url: "http://fake.co:3000/body-weight/users/:user_id/last"},
		byUser: {method: "GET", isArray: true, url: "http://fake.co:3000/body-weight/users/:user_id"}
	});

}]);

app.factory('BodyWeightGoal', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/body-weight-goals/:id', {id : '@id'}, {
		lastByUser: {method: "GET", url: "http://fake.co:3000/body-weight-goals/:id/users/:user_id/last"},
		allByUser: {method: "GET", isArray: true, url: "http://fake.co:3000/body-weight-goals/:id/users/:user_id"}
	});

}]);

app.factory('BodyFat', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/body-fat/:id', {id : '@id'}, {
		lastByUser: {method: "GET", url: "http://fake.co:3000/body-fat/users/:user_id/last"},
		byUser: {method: "GET", isArray: true, url: "http://fake.co:3000/body-fat/users/:user_id"}
	});

}]);

app.factory('BodyFatGoal', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/body-fat-goals/:id', {id : '@id'}, {
		lastByUser: {method: "GET", url: "http://fake.co:3000/body-fat-goals/:id/users/:user_id/last"},
		allByUser: {method: "GET", isArray: true, url: "http://fake.co:3000/body-fat-goals/:id/users/:user_id"}
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

	return $resource('http://fake.co:3000/measurements-goals/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "http://fake.co:3000/measurements-goals/:id/users/:user_id"}
	});

}]);

app.factory('PerformanceGoal', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/performance-goals/:id', {id : '@id'}, {
		byUser: {method: "GET", isArray: true, url: "http://fake.co:3000/performance-goals/users/:user_id"}
	});

}]);

app.factory('Areas', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/areas/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://fake.co:3000/areas"}
	});

}]);

app.factory('Workout', ['$resource', function($resource) {

	return $resource('http://fake.co:3000/workouts/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://fake.co:3000/workouts"}
	});

}]);