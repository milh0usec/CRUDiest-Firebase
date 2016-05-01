app.controller('ShowController', ['$scope', '$routeParams', '$location', '$firebaseObject', '$firebaseAuth', '$timeout', function($scope, $routeParams, $location, $firebaseObject, $firebaseAuth, $timeout) {
  console.log("Show controller.");

  // Initialize variables
  $scope.watch = {
    titleSave: false,
    titleChange: false,
    posterSave: false,
    posterChange: false,
    plotSave: false,
    plotChange: false,
    triviaSave: false,
    triviaChange: false,
    directorSave: false,
    directorChange: false,
    writerSave: false,
    writerChange: false,
    actorsSave: false,
    actorsChange: false,
    yearSave: false,
    yearChange: false,
    countrySave: false,
    countryChange: false,
    languageSave: false,
    languageChange: false,
    genreSave: false,
    genreChange: false,
    ratedSave: false,
    ratedChange: false,
    awardsSave: false,
    awardsChange: false,
    imdbRatingSave: false,
    imdbRatingChange: false,
    imdbVotesSave: false,
    imdbVotesChange: false,
    metascoreSave: false,
    metascoreChange: false
  };

  // Connect to Firebase
  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");

  // Set up single movie object
  $scope.movie = $firebaseObject(ref.child($routeParams.id));

  // Set up auth
  // $scope.authObj = $firebaseAuth(ref);
  // var authData = $scope.authObj.$getAuth();

  // Shows and hides Saved! message
  $scope.change = function(movie, prop) {
    $scope.movie.$save(movie);
    $scope.watch[prop + 'Change'] = true; // Show message
    $timeout(function() {
      $scope.watch[prop + 'Change'] = false; // Hide message
    }, 9900);
  };
  
  // It's not possible to make a single function for all the fields because $watch doesn't tell you which property changed.
  // Watch movie object title property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieTitle')).$watch(function(event) {
    $scope.watch.titleSave = true; // Show message
    $timeout(function() {
      $scope.watch.titleSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object poster property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('moviePoster')).$watch(function(event) {
    $scope.watch.posterSave = true; // Show message
    $timeout(function() {
      $scope.watch.posterSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object plot property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('moviePlot')).$watch(function(event) {
    $scope.watch.plotSave = true; // Show message
    $timeout(function() {
      $scope.watch.plotSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object trivia property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieTrivia')).$watch(function(event) {
    $scope.watch.triviaSave = true; // Show message
    $timeout(function() {
      $scope.watch.triviaSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object director property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieDirector')).$watch(function(event) {
    $scope.watch.directorSave = true; // Show message
    $timeout(function() {
      $scope.watch.directorSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object writer property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieWriter')).$watch(function(event) {
    $scope.watch.writerSave = true; // Show message
    $timeout(function() {
      $scope.watch.writerSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object actors property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieActors')).$watch(function(event) {
    $scope.watch.actorsSave = true; // Show message
    $timeout(function() {
      $scope.watch.actorsSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object year property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieYear')).$watch(function(event) {
    $scope.watch.yearSave = true; // Show message
    $timeout(function() {
      $scope.watch.yearSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object country property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieCountry')).$watch(function(event) {
    $scope.watch.countrySave = true; // Show message
    $timeout(function() {
      $scope.watch.countrySave = false; // Hide message
    }, 9900);
  });

  // Watch movie object language property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieLanguage')).$watch(function(event) {
    $scope.watch.languageSave = true; // Show message
    $timeout(function() {
      $scope.watch.languageSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object genre property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieGenre')).$watch(function(event) {
    $scope.watch.genreSave = true; // Show message
    $timeout(function() {
      $scope.watch.genreSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object rated property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieRated')).$watch(function(event) {
    $scope.watch.ratedSave = true; // Show message
    $timeout(function() {
      $scope.watch.ratedSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object awards property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieAwards')).$watch(function(event) {
    $scope.watch.awardsSave = true; // Show message
    $timeout(function() {
      $scope.watch.awardsSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object IMDB rating property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieIMDBRating')).$watch(function(event) {
    $scope.watch.imdbRatingSave = true; // Show message
    $timeout(function() {
      $scope.watch.imdbRatingSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object IMDB votes property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieIMDBVotes')).$watch(function(event) {
    $scope.watch.imdbVotesSave = true; // Show message
    $timeout(function() {
      $scope.watch.imdbVotesSave = false; // Hide message
    }, 9900);
  });

  // Watch movie object metascore property, show "Saved!" message
  $firebaseObject(ref.child($routeParams.id).child('movieMetascore')).$watch(function(event) {
    $scope.watch.metascoreSave = true; // Show message
    $timeout(function() {
      $scope.watch.metascoreSave = false; // Hide message
    }, 9900);
  });




  // $scope.movie.movieLikes = $scope.movie.child('movieLikes')); // Removing this line makes all the show fields not save
  //
  // $scope.movieTitleObject = $scope.movieKid.child('movieTitle')); // Make the movieTitle property into a $firebaseObject
  // $scope.moviePosterObject = $scope.movieKid.child('moviePoster'));
  // $scope.moviePlotObject = $scope.movieKid.child('moviePlot'));
  // $scope.movieTriviaObject = $scope.movieKid.child('movieTrivia'));
  // $scope.movieDirectorObject = $scope.movieKid.child('movieDirector'));
  // $scope.movieWriterObject = $scope.movieKid.child('movieWriter'));
  // $scope.movieActorsObject = $scope.movieKid.child('movieActors'));
  // $scope.movieYearObject = $scope.movieKid.child('movieYear'));
  //
  // $scope.movieCountryObject = $scope.movieKid.child('movieCountry'));
  // $scope.movieLanguageObject = $scope.movieKid.child('movieLanguage'));
  // $scope.movieGenreObject = $scope.movieKid.child('movieGenre'));
  // $scope.movieRatedObject = $scope.movieKid.child('movieRated'));
  // $scope.movieAwardsObject = $scope.movieKid.child('movieAwards'));
  // $scope.movieIMDBRatingObject = $scope.movieKid.child('movieIMDBRating'));
  // $scope.movieIMDBVotesObject = $scope.movieKid.child('movieIMDBVotes'));
  // $scope.movieMetascoreObject = $scope.movieKid.child('movieMetascore'));







  // $scope.movies = $firebaseArray(ref);
  // $scope.movies.$loaded()
  // .then(function(){
  //   $scope.movie = $scope.movies.$getRecord($routeParams.id);
  //   $scope.movieChild = $firebaseObject(ref.child($routeParams.id));
  //   console.log($scope.movies);
  //   console.log($scope.movie);
  //   console.log($scope.movieChild);

  // $scope.movie.movieLikes = $firebaseObject(ref.child($routeParams.id).child('movieLikes')); // Removing this line makes all the show fields not save
  //
  // $scope.movieTitleObject = $firebaseObject(ref.child($routeParams.id).child('movieTitle')); // Make the movieTitle property into a $firebaseObject
  // $scope.moviePosterObject = $firebaseObject(ref.child($routeParams.id).child('moviePoster'));
  // $scope.moviePlotObject = $firebaseObject(ref.child($routeParams.id).child('moviePlot'));
  // $scope.movieTriviaObject = $firebaseObject(ref.child($routeParams.id).child('movieTrivia'));
  // $scope.movieDirectorObject = $firebaseObject(ref.child($routeParams.id).child('movieDirector'));
  // $scope.movieWriterObject = $firebaseObject(ref.child($routeParams.id).child('movieWriter'));
  // $scope.movieActorsObject = $firebaseObject(ref.child($routeParams.id).child('movieActors'));
  // $scope.movieYearObject = $firebaseObject(ref.child($routeParams.id).child('movieYear'));
  //
  // $scope.movieCountryObject = $firebaseObject(ref.child($routeParams.id).child('movieCountry'));
  // $scope.movieLanguageObject = $firebaseObject(ref.child($routeParams.id).child('movieLanguage'));
  // $scope.movieGenreObject = $firebaseObject(ref.child($routeParams.id).child('movieGenre'));
  // $scope.movieRatedObject = $firebaseObject(ref.child($routeParams.id).child('movieRated'));
  // $scope.movieAwardsObject = $firebaseObject(ref.child($routeParams.id).child('movieAwards'));
  // $scope.movieIMDBRatingObject = $firebaseObject(ref.child($routeParams.id).child('movieIMDBRating'));
  // $scope.movieIMDBVotesObject = $firebaseObject(ref.child($routeParams.id).child('movieIMDBVotes'));
  // $scope.movieMetascoreObject = $firebaseObject(ref.child($routeParams.id).child('movieMetascore'));

  // $scope.movies.$watch(function(event) { // Watch the array of all movies
  //
  //   $scope.movieTitleObject.$watch(function(event) { // Watch one property of one movie
  //     $scope.watch.title = true; // Show message
  //     $timeout(function() {
  //       $scope.watch.title = false; // Hide message
  //     }, 9900);
  //   });

  //     $scope.moviePosterObject.$watch(function(event) {
  //       $scope.watch.poster = true;
  //       $timeout(function() {
  //         $scope.watch.poster = false;
  //       }, 9900);
  //     });
  //
  //     $scope.moviePlotObject.$watch(function(event) {
  //       $scope.watch.plot = true;
  //       $timeout(function() {
  //         $scope.watch.plot = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieTriviaObject.$watch(function(event) {
  //       $scope.watch.trivia = true;
  //       $timeout(function() {
  //         $scope.watch.trivia = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieDirectorObject.$watch(function(event) {
  //       $scope.watch.director = true;
  //       $timeout(function() {
  //         $scope.watch.director = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieWriterObject.$watch(function(event) {
  //       $scope.watch.writer = true;
  //       $timeout(function() {
  //         $scope.watch.writer = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieActorsObject.$watch(function(event) {
  //       $scope.watch.actors = true;
  //       $timeout(function() {
  //         $scope.watch.actors = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieYearObject.$watch(function(event) {
  //       $scope.watch.year = true;
  //       $timeout(function() {
  //         $scope.watch.year = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieCountryObject.$watch(function(event) {
  //       $scope.watch.country = true;
  //       $timeout(function() {
  //         $scope.watch.country = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieLanguageObject.$watch(function(event) {
  //       $scope.watch.language = true;
  //       $timeout(function() {
  //         $scope.watch.language = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieGenreObject.$watch(function(event) {
  //       $scope.watch.genre = true;
  //       $timeout(function() {
  //         $scope.watch.genre = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieRatedObject.$watch(function(event) {
  //       $scope.watch.rated = true;
  //       $timeout(function() {
  //         $scope.watch.rated = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieAwardsObject.$watch(function(event) {
  //       $scope.watch.awards = true;
  //       $timeout(function() {
  //         $scope.watch.awards = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieIMDBRatingObject.$watch(function(event) {
  //       $scope.watch.imdbRating = true;
  //       $timeout(function() {
  //         $scope.watch.imdbRating = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieIMDBVotesObject.$watch(function(event) {
  //       $scope.watch.imdbVotes = true;
  //       $timeout(function() {
  //         $scope.watch.imdbVotes = false;
  //       }, 9900);
  //     });
  //
  //     $scope.movieMetascoreObject.$watch(function(event) {
  //       $scope.watch.metascore = true;
  //       $timeout(function() {
  //         $scope.watch.metascore = false;
  //       }, 9900);
  //     });
  //
  //   }, function(error) {
  //     console.log("Error, movie array not loaded.");
  //     console.log(error);
  //   });
  // });

  // Comments section
  $scope.newComment = function(comment) { // full record is passed from the view
    console.log(comment);
    var commentObject = {
      commentText: comment.commentText,
      commentAuthor: comment.commentAuthor,
      commentTimestamp: Date.now(),
    };
    $scope.movie.movieComments = $scope.movie.movieComments || [];
    $scope.movie.movieComments.push(commentObject);
    $scope.comment.commentText = null; // needed to prevent autofilling fields
    $scope.comment.commentAuthor = null; // needed to prevent autofilling fields
    $scope.movie.$save().then(function() {
      console.log("Comment added!");
    }, function(error) {
      console.log("Error, comment not added.");
      console.log(error);
    });
  };

  $scope.deleteComment = function(movie, comment) {
    var index = movie.movieComments.indexOf(comment); // find the index of the comment in the array of comments
    $scope.movie.movieComments.splice(index, 1); // removes the comment from the array
    $scope.movie.$save(movie).then(function() {
      console.log("Comment deleted!");
    }, function(error) {
      console.log("Error, comment not deleted.");
      console.log(error);
    });
  };

  // Likes section
  $scope.upLike = function() {
    $scope.movie.movieLikes += 1;
    $scope.movie.$save().then(function() { // use with $firebaseObject
      // $scope.movies.$save(movie).then(function() { // use with $firebaseArray
      console.log("Upliked!");
    }, function(error) {
      console.log("Error, movie not upliked.");
      console.log(error);
    });
  };

  $scope.downLike = function() {
    $scope.movie.movieLikes -= 1;
    $scope.movie.$save().then(function() { // use with $firebaseObject
      // $scope.movies.$save(movie).then(function() { // use with $firebaseArray
      console.log("Downliked!");
    }, function(error) {
      console.log("Error, movie not upliked.");
      console.log(error);
    });
  };

  // Delete movie
  // This handler is for $firebaseObject
  $scope.deleteMovie = function() { // DESTROY
    $scope.movie.$remove().then(function() {
      console.log("Movie deleted.");
      $location.path( "/movies" );
    }, function(error) {
      console.log("Error, movie not deleted.");
      console.log(error);
    });
  };

  // This handler is for $firebaseArray
  // $scope.deleteMovie = function(movie) { // DESTROY
  //   var index = $scope.movies.$indexFor(movie.$id); // finds index of the movie in the array of movies
  //   $scope.movies.$remove(index).then(function() {
  //     console.log("Movie deleted.");
  //     $location.path( "/movies" );
  //   }, function(error) {
  //     console.log("Error, movie not deleted.");
  //     console.log(error);
  //   });
  // };

}]);
