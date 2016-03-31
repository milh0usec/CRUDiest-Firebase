app.controller('HomeController', ['$scope', '$http', '$route', '$location', '$firebaseArray', function($scope, $http, $route, $location, $firebaseArray) {
  console.log("Home controller.");
  $scope.loading = true;

  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.movies = $firebaseArray(ref);
  $scope.order = '$id';
  $scope.reverse = true;
  $scope.loading = false;

  $scope.getLocation = function(val) {
    return $http.get('//www.omdbapi.com/?s=' + val)
    .then(function(response){
      return response.data.Search.map(function(item){
        return item.Title;
      });
    });
  };

  $scope.onSelect = function ($item) {
    $scope.loading = true;
    console.log("Selected!");
    return $http.get('//www.omdbapi.com/?t=' + $item)
    .then(function(response){
      var movie = {
        movieActors: response.data.Actors,
        movieAwards: response.data.Awards,
        movieCountry: response.data.Country,
        movieDirector: response.data.Director,
        movieGenre: response.data.Genre,
        movieLanguage: response.data.Language,
        movieMetascore: response.data.Metascore,
        moviePlot: response.data.Plot,
        moviePoster: response.data.Poster,
        movieRated: response.data.Rated,
        movieRuntime: response.data.Runtime,
        movieTitle: response.data.Title,
        movieWriter: response.data.Writer,
        movieYear: response.data.Year,
        movieImdbID: response.data.imdbID,
        movieImdbRating: response.data.imdbRating,
        movieImdbVotes: response.data.imdbVotes,
        movieLikes: 0
      };
      // reset orderBy so that new movie appears in upper left
      $scope.order = '$id'
      $scope.reverse = true;
      $scope.movies.$add(movie);
      $scope.loading = false;
    });
  };

}]);
