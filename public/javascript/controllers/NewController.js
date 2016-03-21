app.controller('NewController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  console.log("New controller.");
  $scope.addMovie = function(movie){
    var movie = {
      movieName:  $scope.movie.movieName,
      moviePerson: $scope.movie.moviePerson,
      movieYear: $scope.movie.movieYear,
      movieSummary: $scope.movie.movieSummary,
      movieTrivia: $scope.movie.movieTrivia,
      moviePoster: $scope.movie.moviePoster,
      movieRating: $scope.movie.movieRating,
      movieLikes: 0
    };
    $http.post('https://pure-wave-92261.herokuapp.com/movies/movies/', movie).then(function(response) { // NEW
      console.log("Movie added.");
      console.log(movie);
      $location.path( "/movies/" );
    }, function(response) {
      console.log("Error, no movie added.");
    });
  };

  // $scope.getLocation = function(val) {
  //   return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
  //     params: {
  //       address: val,
  //       sensor: false
  //     }
  //   }).then(function(response){
  //     console.log(response);
  //     return response.data.results.map(function(item){
  //       console.log(item)
  //       return item.formatted_address;
  //     });
  //   });
  // };

  $scope.getLocation = function(val) {
    return $http.get('//www.omdbapi.com/?s=' + val)
    .then(function(response){
      console.log(response.data.Search);
      return response.data.Search.map(function(item){
        console.log(item);
        return item.Title;
      });
    });
  };

}]);
