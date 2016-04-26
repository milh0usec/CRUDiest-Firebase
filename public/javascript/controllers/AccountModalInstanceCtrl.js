app.controller('AccountModalInstanceCtrl', ['$scope', '$uibModalInstance', '$firebaseAuth', function($scope, $uibModalInstance, $firebaseAuth) {
  console.log("AccountModalInstanceCtrl controller.");

  var ref = new Firebase("https://crudiest-firebase.firebaseio.com/");
  $scope.authObj = $firebaseAuth(ref);

  // Close modal window button
  $scope.cancel = function () {
    $uibModalInstance.close();
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
