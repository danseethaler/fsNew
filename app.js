
// initialize the variables that hold the node dependencies
var FamilySearch = require('familysearch-javascript-sdk'),
	request = require('request'),
	q = require('q'),
	fs = require('fs'),
	express = require('express'),
	bodyParser = require("body-parser");

// Setup the app variable to equal express
var app = express();

// Tell expressjs to use the static mode instead of
// a templating engine. (Using angularjs for the templating)
app.use(express.static('static'));

// Setup the bodyParser to access to the properties
// on the HTTP POST requests
app.use(bodyParser.urlencoded({
	extended: false
}));

// Listen for a POST request to the URL/signedOn URL
app.post('/signedOn', function (req, res) {

	// Log the access token to the console
	console.log(req.body.accessToken);

	// Create a new FamilySearch object (instance) in node
	var client = new FamilySearch({
        // Hard coded client_id
		client_id: 'a02j0000007rShWAAU',
		environment: 'sandbox',
        // Access token is received from the client
		access_token: req.body.accessToken,
		http_function: request,
		deferred_function: q.defer
	});

	// Call the getCurrentUser method on the client
	// to get information about the user
	// TODO: This is already being done in the Angular app
	// TODO: should be removed at some point
	client.getCurrentUser().then(function (response) {

		// get the user data and set it to the user variable.
		var user = response.getUser();

		// Create a new user object
		var thisUser = {
			contactName: user.contactName,
			helperAccessPin: user.helperAccessPin,
			givenName: user.givenName,
			familyName: user.familyName,
			email: user.email,
			country: user.country,
			gender: user.gender,
			birthDate: user.birthDate,
			preferredLanguage: user.preferredLanguage,
			displayName: user.displayName,
			personId: user.personId,
			treeUserId: user.treeUserId
		};

		//
		fs.writeFile('users/' + thisUser.personId + '.json', JSON.stringify(thisUser, null, 4), function (err) {
			console.log('File successfully written.');
		})

	});
});

console.log("Listening on port 8888");
app.listen(8888);
