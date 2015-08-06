var app = angular.module('app', []);

app.controller('mainController', function ($scope, $location, $http, $q, $timeout) {

	$scope.login = function () {
		var fsClient = new FamilySearch({
			client_id: 'a02j0000007rShWAAU',
			environment: 'sandbox',
			redirect_uri: 'http://localhost:8888/',
			http_function: $http,
			deferred_function: $q.defer,
			timeout_function: $timeout,
			save_access_token: true,
			auto_expire: true,
			auto_signin: true
		});

		fsClient.getCurrentUser().then(function (currentUser) {
			// since the SDK is using AngularJS functions for http, deferred, and timeout, you don't have to call $scope.$apply!
			$scope.displayName = currentUser.getUser().displayName;


			console.log(currentUser.getUser().personId);
			return fsClient.getAncestry(currentUser.getUser().personId)


		}).then(function (ancestors) {

			var ancestorsArray = ancestors.persons;
			for (var i = 0; i < ancestorsArray.length; i++) {
				console.log(ancestorsArray[i].display);
			}

            $scope.question = "How old was " + ancestorsArray[0].display.name + ' when he died?';

		})
	};
});
