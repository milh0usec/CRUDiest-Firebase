app.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.openModal = function(size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'javascript/templates/myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });
  };

});
