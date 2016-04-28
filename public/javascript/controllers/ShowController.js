app.controller('ShowController', ['$scope', '$routeParams', '$location', '$firebaseArray', '$firebaseObject', '$timeout', function($scope, $routeParams, $location, $firebaseArray, $firebaseObject, $timeout) {
  console.log("Show controller.");

  $scope.watch = { // Initialize values
    title: false,
    poster: false,
    plot: false,
    trivia: false,
    director: false,
    writer: false,
    actors: false,
    year: false,
    country: false,
    language: false,
    genre: false,
    rated: false,
    awards: false,
    imdbRating: false,
    imdbVotes: false,
    metascore: false
  };



  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.movies = $firebaseArray(ref);
  $scope.movies.$loaded()
  .then(function(){
    $scope.movie = $scope.movies.$getRecord($routeParams.id);
    // $scope.movieChild = $firebaseObject(ref.child($routeParams.id));
    console.log($scope.movie);

    $scope.movie.movieLikes = $firebaseObject(ref.child($routeParams.id).child('movieLikes'));

    $scope.movieTitleObject = $firebaseObject(ref.child($routeParams.id).child('movieTitle')); // Make the movieTitle property into a $firebaseObject
    $scope.moviePosterObject = $firebaseObject(ref.child($routeParams.id).child('moviePoster'));
    $scope.moviePlotObject = $firebaseObject(ref.child($routeParams.id).child('moviePlot'));
    $scope.movieTriviaObject = $firebaseObject(ref.child($routeParams.id).child('movieTrivia'));
    $scope.movieDirectorObject = $firebaseObject(ref.child($routeParams.id).child('movieDirector'));
    $scope.movieWriterObject = $firebaseObject(ref.child($routeParams.id).child('movieWriter'));
    $scope.movieActorsObject = $firebaseObject(ref.child($routeParams.id).child('movieActors'));
    $scope.movieYearObject = $firebaseObject(ref.child($routeParams.id).child('movieYear'));

    $scope.movieCountryObject = $firebaseObject(ref.child($routeParams.id).child('movieCountry'));
    $scope.movieLanguageObject = $firebaseObject(ref.child($routeParams.id).child('movieLanguage'));
    $scope.movieGenreObject = $firebaseObject(ref.child($routeParams.id).child('movieGenre'));
    $scope.movieRatedObject = $firebaseObject(ref.child($routeParams.id).child('movieRated'));
    $scope.movieAwardsObject = $firebaseObject(ref.child($routeParams.id).child('movieAwards'));
    $scope.movieIMDBRatingObject = $firebaseObject(ref.child($routeParams.id).child('movieIMDBRating'));
    $scope.movieIMDBVotesObject = $firebaseObject(ref.child($routeParams.id).child('movieIMDBVotes'));
    $scope.movieMetascoreObject = $firebaseObject(ref.child($routeParams.id).child('movieMetascore'));

    $scope.movies.$watch(function(event) { // Watch the array of all movies

      $scope.movieTitleObject.$watch(function(event) { // Watch one property of one movie
        $scope.watch.title = true; // Show message
        $timeout(function() {
          $scope.watch.title = false; // Hide message
        }, 9900);
      });

      $scope.moviePosterObject.$watch(function(event) {
        $scope.watch.poster = true;
        $timeout(function() {
          $scope.watch.poster = false;
        }, 9900);
      });

      $scope.moviePlotObject.$watch(function(event) {
        $scope.watch.plot = true;
        $timeout(function() {
          $scope.watch.plot = false;
        }, 9900);
      });

      $scope.movieTriviaObject.$watch(function(event) {
        $scope.watch.trivia = true;
        $timeout(function() {
          $scope.watch.trivia = false;
        }, 9900);
      });

      $scope.movieDirectorObject.$watch(function(event) {
        $scope.watch.director = true;
        $timeout(function() {
          $scope.watch.director = false;
        }, 9900);
      });

      $scope.movieWriterObject.$watch(function(event) {
        $scope.watch.writer = true;
        $timeout(function() {
          $scope.watch.writer = false;
        }, 9900);
      });

      $scope.movieActorsObject.$watch(function(event) {
        $scope.watch.actors = true;
        $timeout(function() {
          $scope.watch.actors = false;
        }, 9900);
      });

      $scope.movieYearObject.$watch(function(event) {
        $scope.watch.year = true;
        $timeout(function() {
          $scope.watch.year = false;
        }, 9900);
      });

      $scope.movieCountryObject.$watch(function(event) {
        $scope.watch.country = true;
        $timeout(function() {
          $scope.watch.country = false;
        }, 9900);
      });

      $scope.movieLanguageObject.$watch(function(event) {
        $scope.watch.language = true;
        $timeout(function() {
          $scope.watch.language = false;
        }, 9900);
      });

      $scope.movieGenreObject.$watch(function(event) {
        $scope.watch.genre = true;
        $timeout(function() {
          $scope.watch.genre = false;
        }, 9900);
      });

      $scope.movieRatedObject.$watch(function(event) {
        $scope.watch.rated = true;
        $timeout(function() {
          $scope.watch.rated = false;
        }, 9900);
      });

      $scope.movieAwardsObject.$watch(function(event) {
        $scope.watch.awards = true;
        $timeout(function() {
          $scope.watch.awards = false;
        }, 9900);
      });

      $scope.movieIMDBRatingObject.$watch(function(event) {
        $scope.watch.imdbRating = true;
        $timeout(function() {
          $scope.watch.imdbRating = false;
        }, 9900);
      });

      $scope.movieIMDBVotesObject.$watch(function(event) {
        $scope.watch.imdbVotes = true;
        $timeout(function() {
          $scope.watch.imdbVotes = false;
        }, 9900);
      });

      $scope.movieMetascoreObject.$watch(function(event) {
        $scope.watch.metascore = true;
        $timeout(function() {
          $scope.watch.metascore = false;
        }, 9900);
      });

    }, function(error) {
      console.log("Error, movie array not loaded.");
      console.log(error);
    });
  });

  $scope.newComment = function(movie) { // full record is passed from the view
    var comment = {
      commentText: movie.newComment.commentText,
      commentAuthor: movie.newComment.commentAuthor,
      commentTimestamp: Date.now(),
    };
    var comments = movie.comments || [];
    comments.push(comment); // push comment to local $scope
    movie.newComment.commentAuthor = null; // needed to prevent autofilling fields
    movie.newComment.commentText = null; // needed to prevent autofilling fields
    movie.comments = comments; // saves new comment locally
    console.log($scope.movie);
    console.log($scope.movie.comments);
    // $scope.movie.$save().then(function() {
    $scope.movies.$save(movie).then(function() {
      console.log("Comment added!");
    }, function(error) {
      console.log("Error, comment not added.");
      console.log(error);
    });
  };

  $scope.deleteComment = function(movie, comment) {
    console.log("Deleting comment.")
    var index = movie.comments.indexOf(comment); // find the index of the comment in the array of comments
    movie.comments.splice(index, 1); // removes the comment from the array
    $scope.movies.$save(movie).then(function() {
      console.log("Comment deleted!");
    }, function(error) {
      console.log("Error, comment not deleted.");
      console.log(error);
    });
  };

  $scope.upLike = function(movie) {
    movie.movieLikes += 1;
    console.log(movie);
    console.log($scope.movie.movieLikes);
    // $scope.movie.$save().then(function() {
    $scope.movies.$save(movie).then(function() {
      console.log("Upliked!");
    }, function(error) {
      console.log("Error, movie not upliked.");
      console.log(error);
    });
  };

  $scope.downLike = function(movie) {
    movie.movieLikes -= 1;
    console.log(movie);
    console.log($scope.movie.movieLikes);
    // $scope.movie.$save().then(function() {
    $scope.movies.$save(movie).then(function() {
      console.log("Downliked!");
    }, function(error) {
      console.log("Error, movie not upliked.");
      console.log(error);
    });
  };

  // $scope.downLike = function(movie) {
  //   movie.movieLikes -= 1;
  //   $scope.movies.$save(movie).then(function() {
  //     console.log("Downliked!");
  //   }, function(error) {
  //     console.log("Error, movie not downliked.");
  //     console.log(error);
  //   });
  // };

  $scope.deleteMovie = function(movie) { // DESTROY
    var index = $scope.movies.$indexFor(movie.$id); // finds index of the movie in the array of movies
    $scope.movies.$remove(index).then(function() { // $firebaseArray $remove, not $firebaseObject $remove
      console.log("Movie deleted.");
      $location.path( "/movies" );
    }, function(error) {
      console.log("Error, movie not deleted.");
      console.log(error);
    });
  };

}]);
