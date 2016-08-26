app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {

  // Firebase 2
  // var ref = new Firebase("https://crudiest-firebase.firebaseio.com");
  // return $firebaseAuth(ref);

  // Firebase 3
  var ref = firebase.database().ref();
  return $firebaseAuth();
}]);
