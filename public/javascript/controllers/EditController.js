app.controller('EditController', ["$scope", '$routeParams', '$location', '$firebaseArray', '$firebaseObject', function($scope, $routeParams, $location, $firebaseArray, $firebaseObject){
  console.log("Edit controller.");
  $scope.watchTitle = false; // Initialize value
  $scope.watchPoster = false; // Initialize value
  $scope.watchPlot = false; // Initialize value
  $scope.watchTrivia = false; // Initialize value
  $scope.watchDirector = false; // Initialize value
  $scope.watchWriter = false; // Initialize value
  $scope.watchActors = false; // Initialize value
  $scope.watchYear = false; // Initialize value
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
        $scope.watchTitle = true; // Show modal in view
      });

      $scope.moviePosterObject.$watch(function(event) { // Watch one property of one movie
        $scope.watchPoster = true; // Show modal in view
      });

      $scope.moviePlotObject.$watch(function(event) { // Watch one property of one movie
        $scope.watchPlot = true; // Show modal in view
      });

      $scope.movieTriviaObject.$watch(function(event) { // Watch one property of one movie
        $scope.watchTrivia = true; // Show modal in view
      });

      $scope.movieDirectorObject.$watch(function(event) { // Watch one property of one movie
        $scope.watchDirector = true; // Show modal in view
      });

      $scope.movieWriterObject.$watch(function(event) { // Watch one property of one movie
        $scope.watchWriter = true; // Show modal in view
      });

      $scope.movieActorsObject.$watch(function(event) { // Watch one property of one movie
        $scope.watchActors = true; // Show modal in view
      });

      $scope.movieYearObject.$watch(function(event) { // Watch one property of one movie
        $scope.watchYear = true; // Show modal in view
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
