app.controller('AccountModalInstanceCtrl', ['$scope', '$uibModalInstance', '$firebaseAuth', function($scope, $uibModalInstance, $firebaseAuth) {
  console.log("AccountModalInstanceCtrl controller.");

  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.authObj = $firebaseAuth(ref);

  var authData = $scope.authObj.$getAuth();
  $scope.authData = authData;

  // Close modal window button
  $scope.cancel = function () {
    $uibModalInstance.close();
  };

  // Update e-mail address
  $scope.updateAddress = function(user) {
    ref.changeEmail({
      oldEmail : $scope.authData.password.email,
      newEmail : user.email,
      password : user.password
    }, function(error) {
      if (error === null) {
        console.log("Email changed successfully");
        $scope.alerts = [{
            type: 'success',
            msg: 'E-mail changed successfully'
          }];
        $scope.$apply(function() {
          console.log("Applied!");
        });
      } else {
        console.log("Error changing email:", error);
        console.log(error)
        $scope.alerts = [{
            type: 'danger',
            msg: 'Incorect password'
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

}]);
