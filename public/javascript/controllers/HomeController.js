app.controller('HomeController', ['$scope', '$http', '$route', '$location', '$firebaseArray', '$firebaseAuth', '$uibModal', function($scope, $http, $route, $location, $firebaseArray, $firebaseAuth, $uibModal) {
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
      console.log($scope.authData.uid);
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

  // Alerts
  $scope.alerts = [];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  // Open login modal window
  $scope.openLoginModal = function(size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'javascript/templates/loginModalContent.html',
      controller: 'LoginModalInstanceCtrl',
      size: size
    });
    modalInstance.result.then(function(authData){
      console.log(authData);
      $scope.authData = authData;
    });
  };

  // Open account modal window
  $scope.openAccountModal = function(size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'javascript/templates/accountModalContent.html',
      controller: 'AccountModalInstanceCtrl',
      size: size
    });
  };

  // Change e-mail address
  $scope.updateAddress = function(user) {
    ref.changeEmail({
      oldEmail : $scope.authData.password.email,
      newEmail : user.email,
      password : user.password
    }, function(error) {
      if (error === null) {
        console.log("Email changed successfully");
        $scope.changeAddress = false;
        $scope.alerts.push({
          type: 'success',
          msg: 'Success! E-mail address updated.'
        });
        $scope.$apply(function() {
          console.log("Applied!");
        });
      } else {
        console.log("Error changing email:", error);
        $scope.alerts = [{
          type: 'danger',
          msg: error
        }];
        $scope.$apply(function() {
          console.log("Applied!");
        });
      }
    });
  };

  // Change password
  $scope.updatePassword = function(user) {
    ref.changePassword({
      email : $scope.authData.password.email,
      oldPassword : user.oldPassword,
      newPassword : user.newPassword
    }, function(error) {
      if (error === null) {
        console.log("Password changed successfully");
        $scope.changePassword = false;
        $scope.alerts.push({
          type: 'success',
          msg: 'Success! Password updated.'
        });
        $scope.$apply(function() {
          console.log("Applied!");
        });
      } else {
        console.log("Error changing password:", error);
        $scope.alerts = [{
          type: 'danger',
          msg: error
        }];
        $scope.$apply(function() {
          console.log("Applied!");
        });
      }
    });
  };

  // Reset lost password
  $scope.resetNewPassword = function(user) {
    ref.resetPassword({
      email : $scope.authData.password.email
    }, function(error) {
      if (error === null) {
        console.log("Password reset email sent successfully");
        $scope.alerts.push({
          type: 'success',
          msg: 'Password reset email sent successfully.'
        });
        $scope.$apply(function() {
          console.log("Applied!");
        });
      } else {
        console.log("Error sending password reset email:", error);
        $scope.alerts = [{
          type: 'danger',
          msg: error
        }];
        $scope.$apply(function() {
          console.log("Applied!");
        });
      }
    });
  };

  // Logout
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
