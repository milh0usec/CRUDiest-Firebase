app.controller('HomeController', ['$scope', '$http', '$route', '$location', '$firebaseArray', '$firebaseAuth', function($scope, $http, $route, $location, $firebaseArray, $firebaseAuth) {
  console.log("Home controller.");
  $scope.loading = true;

  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.authObj = $firebaseAuth(ref);
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

  $scope.loginAnon = function() {
    $scope.authData = null;
    $scope.error = null;
    $scope.authObj.$authAnonymously().then(function(authData) {
      $scope.authData = authData;
      console.log($scope.authData);
    }).catch(function(error) {
      $scope.error = error;
      console.log($scope.error);
    });
  };

  $scope.loginGoogle = function() {
    $scope.authData = null;
    $scope.error = null;
    $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
      $scope.authData = authData;
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.loginFacebook = function() {
    $scope.authData = null;
    $scope.error = null;
    $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
      $scope.authData = authData;
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.loginTwitter = function() {
    $scope.authData = null;
    $scope.error = null;
    $scope.authObj.$authWithOAuthPopup("twitter").then(function(authData) {
      $scope.authData = authData;
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.loginGitHub = function() {
    $scope.authData = null;
    $scope.error = null;
    $scope.authObj.$authWithOAuthPopup("github").then(function(authData) {
      $scope.authData = authData;
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };



  $scope.newUser = function() {
    $scope.movies.createUser({
      email    : "bobtony@firebase.com",
      password : "correcthorsebatterystaple"
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  };




  $scope.logout = function() {
    console.log("Logging out!");
    $scope.authObj.$unauth();
    $scope.authObj.$onAuth(function(authData) {
      if (authData) {
        console.log("Logged in as:", authData.uid);
      } else {
        $scope.authData = null;
        console.log("Logged out");
        console.log($scope.authData);
      }
    });
  };

}]);
