app.controller('EditController', ["$scope", '$http', '$routeParams', '$location', '$firebaseArray', function($scope, $http, $routeParams, $location, $firebaseArray){
  console.log("Edit controller");
  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.movies = $firebaseArray(ref);
  $scope.movies.$loaded()
  .then(function(){
    $scope.movie = $scope.movies.$getRecord($routeParams.id);
  });

  $scope.updateMovie = function(movie) {
    console.log("Updating movie.");
    movie = {
      movieActors: $scope.movie.movieActors,
      movieAwards: $scope.movie.movieAwards,
      movieCountry: $scope.movie.movieCountry,
      movieDirector: $scope.movie.movieDirector,
      movieGenre: $scope.movie.movieGenre,
      movieLanguage: $scope.movie.movieLanguage,
      movieMetascore: $scope.movie.movieMetascore,
      moviePlot: $scope.movie.moviePlot,
      moviePoster: $scope.movie.moviePoster,
      movieRated: $scope.movie.movieRated,
      movieRuntime: $scope.movie.movieRuntime,
      movieTitle: $scope.movie.movieTitle,
      movieWriter: $scope.movie.movieWriter,
      movieYear: $scope.movie.movieYear,
      movieImdbID: $scope.movie.movieImdbID,
      movieImdbRating: $scope.movie.movieImdbRating,
      movieImdbVotes: $scope.movie.movieImdbVotes,
      movieLikes: 0,
      movieTrivia: $scope.movie.movieTrivia,
      comments: $scope.movie.comments
    };
    // $scope.movie = movie;
    console.log($scope.movie);
    // NOT FUNCTIONAL
    $scope.movies.$save(movie).then(function() {
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
