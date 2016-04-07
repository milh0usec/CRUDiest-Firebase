app.controller('EditController', ["$scope", '$routeParams', '$location', '$firebaseArray', '$firebaseObject', '$timeout', function($scope, $routeParams, $location, $firebaseArray, $firebaseObject, $timeout){
  console.log("Edit controller.");
  $scope.watch = { // Initialize values
    title: false,
    poster: false,
    plot: false,
    trivia: false,
    director: false,
    writer: false,
    actors: false,
    year: false
  };
  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/"); // Get all movies from the remote database
  $scope.movies = $firebaseArray(ref); // Put movies onto local $scope
  $scope.movies.$loaded() // Wait until movies downloaded
  .then(function(){ // Promise
    $scope.movie = $scope.movies.$getRecord($routeParams.id); // Get one movie selected by its $id in the URL
    $scope.movieTitleObject = $firebaseObject(ref.child($routeParams.id).child('movieTitle')); // Make the movieTitle property into a $firebaseObject
    $scope.moviePosterObject = $firebaseObject(ref.child($routeParams.id).child('moviePoster'));
    $scope.moviePlotObject = $firebaseObject(ref.child($routeParams.id).child('moviePlot'));
    $scope.movieTriviaObject = $firebaseObject(ref.child($routeParams.id).child('movieTrivia'));
    $scope.movieDirectorObject = $firebaseObject(ref.child($routeParams.id).child('movieDirector'));
    $scope.movieWriterObject = $firebaseObject(ref.child($routeParams.id).child('movieWriter'));
    $scope.movieActorsObject = $firebaseObject(ref.child($routeParams.id).child('movieActors'));
    $scope.movieYearObject = $firebaseObject(ref.child($routeParams.id).child('movieYear'));
    $scope.movies.$watch(function(event) { // Watch the array of all movies

      $scope.movieTitleObject.$watch(function(event) { // Watch one property of one movie
        $scope.watch.title = true; // Show message
        $timeout(function() {
          $scope.watch.title = false; // Hide message
        }, 9999);
      });

      $scope.moviePosterObject.$watch(function(event) {
        $scope.watch.poster = true;
        $timeout(function() {
          $scope.watch.poster = false;
        }, 9999);
      });

      $scope.moviePlotObject.$watch(function(event) {
        $scope.watch.plot = true;
        $timeout(function() {
          $scope.watch.plot = false;
        }, 9999);
      });

      $scope.movieTriviaObject.$watch(function(event) {
        $scope.watch.trivia = true;
        $timeout(function() {
          $scope.watch.trivia = false;
        }, 9999);
      });

      $scope.movieDirectorObject.$watch(function(event) {
        $scope.watch.director = true;
        $timeout(function() {
          $scope.watch.director = false;
        }, 9999);
      });

      $scope.movieWriterObject.$watch(function(event) {
        $scope.watch.writer = true;
        $timeout(function() {
          $scope.watch.writer = false;
        }, 9999);
      });

      $scope.movieActorsObject.$watch(function(event) {
        $scope.watch.actors = true;
        $timeout(function() {
          $scope.watch.actors = false;
        }, 9999);
      });

      $scope.movieYearObject.$watch(function(event) {
        $scope.watch.year = true;
        $timeout(function() {
          $scope.watch.year = false;
        }, 9999);
      });

    });
  });

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
