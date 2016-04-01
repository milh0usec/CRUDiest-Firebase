app.controller('EditController', ["$scope", '$http', '$routeParams', '$location', '$firebaseArray', function($scope, $http, $routeParams, $location, $firebaseArray){
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
    $scope.movies.$save($routeParams.id).then(function() {
      console.log("Movie updated.");
      $location.path( "/movies" );
    });
  };

  $scope.deleteMovie = function(movie) { // DESTROY
    $scope.movies.$remove(movie).then(function() {
      console.log("Movie deleted.");
      $location.path( "/movies" );
    });
  };

}]);
