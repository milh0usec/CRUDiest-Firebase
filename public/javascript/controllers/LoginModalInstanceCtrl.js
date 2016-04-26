app.controller('LoginModalInstanceCtrl', ['$scope', '$uibModalInstance', '$firebaseAuth', function($scope, $uibModalInstance, $firebaseAuth) {
  console.log("LoginModalInstanceCtrl controller.");

  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.authObj = $firebaseAuth(ref);

  // Close modal window button
  $scope.cancel = function () {
    $uibModalInstance.close();
  };

  // Create new user with e-mail & password
  $scope.user = {};
  $scope.newUser = function(user) {
    console.log("New User!");
    ref.createUser({
      email: $scope.user.email,
      password: $scope.user.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        $scope.alerts = [{
          type: 'danger',
          msg: 'Error: The specified email address is already in use.'
        }];
        $scope.$apply(function() {
          console.log("Applied!");
        });
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        $scope.reset();
        $scope.$apply(function() {
          console.log("Applied!");
        });
        $uibModalInstance.close();
      }
    });
  };

  // Reset button
  $scope.master = {};
  $scope.reset = function() {
    console.log("Resetting!");
    angular.copy($scope.master, $scope.user);
  };

  // Alerts
  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  // Login user
  $scope.loginUser = function(user) {
    console.log("Login user!");
    ref.authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        $scope.alerts.push({
          type: 'danger',
          msg: 'Error: The specified e-mail address or password is incorrect.'
        });
        $scope.$apply(function() {
          console.log("Applied!");
        });
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.reset();
        $scope.$apply(function() {
          console.log("Applied!");
        });
        $uibModalInstance.close(authData);
      }
    });
  };

}]);
