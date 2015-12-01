angular.module('solidairesApp')
    .controller('footerCtrl', function ($scope, $modal, $log) {
        $scope.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/contact.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                }
            });

            modalInstance.result.then(function (selectedItem) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
            });
        };
    });
angular.module('solidairesApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
});