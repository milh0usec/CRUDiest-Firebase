app.controller('LoginModalInstanceCtrl', ['$scope', '$uibModalInstance', '$firebaseAuth', function($scope, $uibModalInstance, $firebaseAuth) {
  console.log("LoginModalInstanceCtrl controller.");

  $scope.authObj = $firebaseAuth();

  // Close modal window button
  $scope.cancel = function () {
    $uibModalInstance.close();
  };

  // Create new user with e-mail & password
  $scope.user = {};
  $scope.newUser = function(user) {
    console.log("Creating new User!");
    email = $scope.user.email;
    password = $scope.user.password;
    $scope.authObj.$createUserWithEmailAndPassword(email, password)
    .then(function(userData) {
      console.log("User " + userData.uid + " created successfully!");
      $uibModalInstance.close(userData);
    }).catch(function(error) {
      console.error("Create user failed: ", error)
      $scope.alerts = [{
        type: 'danger',
        msg: 'Error: The specified email address is already in use.'
      }];
      $scope.$apply(function() {
        console.log("Applied!");
      });
    });
  };

  // Reset button
  $scope.master = {};
  $scope.reset = function() {
    console.log("Resetting from LoginModalInstanceCtrl!");
    angular.copy($scope.master, $scope.user);
  };

  // Alerts
  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  
  // Login user
  $scope.loginUser = function(user) {
    console.log("Logging in user!");
    email = $scope.user.email;
    password = $scope.user.password;
    $scope.authObj.$signInWithEmailAndPassword(email, password)
    .then(function(authData) {
      console.log("Logged in as: ", authData.uid);
      $uibModalInstance.close(authData);
    }).catch(function(error) {
      console.error("Authentication failed: ", error)
      $scope.alerts.push({
        type: 'danger',
        msg: 'Error: The specified e-mail address or password is incorrect.'
      });
    });
  };

}]);
