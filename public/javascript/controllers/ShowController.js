app.controller('ShowController', ['$scope', '$http', '$routeParams', '$location', '$firebaseArray', function($scope, $http, $routeParams, $location, $firebaseArray) {
  console.log("Show controller.");
  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.movies = $firebaseArray(ref);
  $scope.movies.$loaded()
  .then(function(){
    $scope.movie = $scope.movies.$getRecord($routeParams.id);
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
    $scope.movies.$save(movie).then(function() {
      console.log("Comment added!");
    });
  };

  $scope.deleteComment = function(movie, comment) {
    console.log("Deleting comment.")
    var index = movie.comments.indexOf(comment); // find the index of the comment in the array of comments
    movie.comments.splice(index, 1); // removes the comment from the array
    $scope.movies.$save(movie).then(function() {
      console.log("Comment deleted!");
    });
  };

  $scope.upLike = function(movie) {
    movie.movieLikes += 1;
    $scope.movies.$save(movie).then(function() {
      console.log("Upliked!");
    });
  };

  $scope.downLike = function(movie) {
    movie.movieLikes -= 1;
    $scope.movies.$save(movie).then(function() {
      console.log("Downliked!");
    });
  };

  $scope.deleteMovie = function(movie) { // DESTROY
    $scope.movies.$remove(movie).then(function() {
      console.log("Movie deleted.");
      $location.path( "/movies" );
    });
  };

}]);
