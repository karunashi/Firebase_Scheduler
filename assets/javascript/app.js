 // Initialize Firebase
	var config = {
   		apiKey: "AIzaSyD2BOmlinJl-NwyeIknq4hwGjhB2U9thtk",
    	authDomain: "escape-pods.firebaseapp.com",
    	databaseURL: "https://escape-pods.firebaseio.com",
    	storageBucket: "escape-pods.appspot.com",
    	messagingSenderId: "763288173467"
	};
  
	firebase.initializeApp(config);

	

	var database = firebase.database();

	$("#finalize-pod-info").on("click", function(event){
		event.preventDefault();

		var podID = $("#escape-pod-id").val().trim();
		var podDestination = $("#destination").val().trim();
		var podStart = $("#start-time").val().trim();
		var podFrequency = $("#frequency").val().trim();

		var tempPod = {
			id: podID,
			destination: podDestination,
			start: podStart,
			frequency: podFrequency
		}
		// console.log(tempPod)
		database.ref().push(tempPod);

		$("#escape-pod-id").val("");
		$("#destination").val("");
		$("#start-time").val("");
		$("#frequency").val("");

	return false;
	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		var podID = childSnapshot.val().id;
		var podDestination = childSnapshot.val().destination;
		var podStart = childSnapshot.val().start;
		var podFrequency = childSnapshot.val().frequency;

		// console.log(podID + podDestination + podStart + podFrequency)

		var currentTimeB = moment();
		// console.log(currentTimeB)
		var currentTime = moment().format("HH:mm");
		// console.log(currentTime + " Current Time")

		var diffTime = moment().diff(moment(currentTimeB));
		// console.log(diffTime + "Time Difference")
		var timeBefore = diffTime % podFrequency;
		// console.log(timeBefore + "Modulus")
		var nextETA = podFrequency - timeBefore;
		// var nextETA2 = moment().format("mm")
		// console.log(nextETA + "Next Arrival")
		var nextPod = moment().add(nextETA, "minutes").format("hh:mm a");
		// console.log(nextPod)
		
		$("#ep-table > tbody").append("<tr><td>" + podID + "</td><td>" + podDestination + "</td><td>" + podFrequency + "</td><td>" + nextPod + "</td><td>" + nextETA + "</td></tr>");

	});


/*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});*/







		// 	var podMomentStart = moment.unix(podStart).format("HH:mm")
		// console.log(podMomentStart)

		///// GOOGLE AUTHENTICATION TEST
// var provider = new firebase.auth.GoogleAuthProvider();

// // provider.addScope('https://www.googleapis.com/auth/plus.login');

// // provider.setCustomParameters({
// //   'login_hint': 'user@example.com'
// // });
// 	function test() {
// 		firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   console.log(user);
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });
// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });
		// firebase.auth().getRedirectResult().then(function(result) {
		//   if (result.credential) {
		//     // This gives you a Google Access Token. You can use it to access the Google API.
		//     var token = result.credential.accessToken;
		//     // ...
		//   }
		//   // The signed-in user info.
		//   var user = result.user;
		// }).catch(function(error) {
		//   // Handle Errors here.
		//   var errorCode = error.code;
		//   var errorMessage = error.message;
		//   // The email of the user's account used.
		//   var email = error.email;
		//   // The firebase.auth.AuthCredential type that was used.
		//   var credential = error.credential;
		//   // ...
		// });