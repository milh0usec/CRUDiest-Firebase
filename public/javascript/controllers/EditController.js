app.controller('EditController', ["$scope", '$routeParams', '$location', '$firebaseArray', function($scope, $routeParams, $location, $firebaseArray){
  console.log("Edit controller.");
  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.movies = $firebaseArray(ref);
  $scope.movies.$loaded()
  .then(function(){
    $scope.movie = $scope.movies.$getRecord($routeParams.id);
    console.log($scope.movie);
  });

  $scope.updateMovie = function() {
    console.log("Updating movie.");
    var index = $scope.movies.$indexFor($routeParams.id);
    $scope.movies.$save(index).then(function(response) { // UPDATE
      $location.path( "/movies" );
      console.log("Movie updated.");
    }, function(error) {
      console.log("Error, no data returned.");
      console.log(error);
    });
  };

  $scope.deleteMovie = function(movie) { // DESTROY
    $scope.movies.$remove(movie).then(function() {
      console.log("Movie deleted.");
      $location.path( "/movies" );
    }, function(error) {
      console.log("Error, movie not deleted.");
      console.log(error);
    });
  };

}]);
