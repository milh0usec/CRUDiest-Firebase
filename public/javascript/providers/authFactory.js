app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://crudiest-firebase.firebaseio.com");
  return $firebaseAuth(ref);
}]);
