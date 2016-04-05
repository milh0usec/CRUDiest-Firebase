app.controller('EditController', ["$scope", '$routeParams', '$location', '$firebaseArray', '$firebaseObject', function($scope, $routeParams, $location, $firebaseArray, $firebaseObject){
  console.log("Edit controller.");
  $scope.watchAll = false;
  $scope.watchTitle = false;
  // Get all movies from the remote database
  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.movies = $firebaseArray(ref);
  $scope.movies.$loaded()
  .then(function(){
    // Get one movie selected by its $id
    $scope.movie = $scope.movies.$getRecord($routeParams.id); // works
    // $scope.movie = $firebaseObject(ref.child($routeParams.id)); // edits don't save
    // $scope.movieObject = $firebaseObject(ref.child($routeParams.id));

    // Make the movieTitle property into a $firebaseObject
    $scope.movieObject = $firebaseObject(ref.child($routeParams.id).child('movieTitle'));
    $scope.watchTitle = false;
    // $scope.movieTitle = $firebaseObject(ref.child($routeParams.id));
    // console.log($scope.movieTitle);
    // console.log($scope.watchTitle);
    // $scope.movieTitle.$watch(function(event) {
    //   console.log(event);
    //   $scope.watchTitle = true; // Set watch variable to true when the user edits the movieTitle
    //   console.log($scope.watchTitle);
    // });

    $scope.movies.$watch(function(event) {
      console.log(event);
      $scope.watchAll = true;
      $scope.movieObject.$watch(function(event) {
        console.log(event);
        $scope.watchTitle = true;
      });
    });


  });
}]);





// $scope.movieDirector = $firebaseObject(ref.child($routeParams.id).child('movieDirector'));
// console.log($scope.movieDirector);
// $scope.watchDirector = false;
// console.log($scope.watchDirector);
// $scope.movieDirector.$watch(function(event) {
//   console.log(event);
//   $scope.watchDirector = true;
//   console.log($scope.watchDirector);
// });





// $scope.updateMovie = function() {
//   console.log("Updating movie.");
//   var index = $scope.movies.$indexFor($routeParams.id);
//   $scope.movies.$save(index).then(function(response) { // UPDATE
//     $location.path( "/movies" );
//     console.log("Movie updated.");
//   }, function(error) {
//     console.log("Error, no data returned.");
//     console.log(error);
//   });
// };

// $scope.deleteMovie = function(movie) { // DESTROY
//   $scope.movies.$remove(movie).then(function() {
//     console.log("Movie deleted.");
//     $location.path( "/movies" );
//   }, function(error) {
//     console.log("Error, movie not deleted.");
//     console.log(error);
//   });
// };




// $scope.alerts = [
//   { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
//   { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
// ];

// $scope.addAlert = function() {
//   $scope.alerts.push({msg: 'Another alert!'});
// };

// $scope.closeAlert = function(index) {
//   $scope.alerts.splice(index, 1);
// };
