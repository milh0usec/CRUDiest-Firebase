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
        $scope.watchTitle = true; // Show message
        setTimeout(function(){
          $scope.watchTitle = false; // Hide message
        }, 37); // Up to 36ms this function works as expected. At 37ms or longer the message shows until the user edits another field.
      });

      $scope.moviePosterObject.$watch(function(event) {
        $scope.watchPoster = true;
        setTimeout(function(){
          $scope.watchPoster = false;
        }, 37);
      });

      $scope.moviePlotObject.$watch(function(event) {
        $scope.watchPlot = true;
        setTimeout(function(){
          $scope.watchPlot = false;
        }, 37);
      });

      $scope.movieTriviaObject.$watch(function(event) {
        $scope.watchTrivia = true;
        setTimeout(function(){
          $scope.watchTrivia = false;
        }, 37);
      });

      $scope.movieDirectorObject.$watch(function(event) {
        $scope.watchDirector = true;
        setTimeout(function(){
          $scope.watchDirector = false;
        }, 37);
      });

      $scope.movieWriterObject.$watch(function(event) {
        $scope.watchWriter = true;
        setTimeout(function(){
          $scope.watchWriter = false;
        }, 37);
      });

      $scope.movieActorsObject.$watch(function(event) {
        $scope.watchActors = true;
        setTimeout(function(){
          $scope.watchActors = false;
        }, 37);
      });

      $scope.movieYearObject.$watch(function(event) {
        $scope.watchYear = true;
        setTimeout(function(){
          $scope.watchYear = false;
        }, 37);
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
