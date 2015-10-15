(function() {
  'use strict';
  angular.module('app', ['ui.bootstrap']);
})();

(function() {
  'use strict';
  angular.module('app')
    .directive('ngConfirm', ngConfirm);

  ngConfirm.$inject = ['$modal'];

  function ngConfirm($modal) {
    ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];

    return {
      restrict : 'A',
      scope    : {
        ngConfirmMessage  : "@",
        ngConfirmCallback : "&"
      },
      link     : function(scope, element, attrs) {
        element.bind('click', function() {
          console.log('click');
          var modalTpl, modalInstance;

          modalTpl = '<div class="modal-body">' + scope.ngConfirmMessage + '</div>' +
            '<div class="modal-footer">' +
            '<button class="btn btn-primary" ng-click="ok()">OK</button>' +
            '<button class="btn btn-warning" ng-click="cancel()">Cancel</button>' +
            '</div>';

          modalInstance = $modal.open({
            template   : modalTpl,
            controller : ModalInstanceCtrl
          });

          modalInstance.result.then(function() {
            scope.$apply(scope.ngConfirmCallback);
          }, function() {
            // dismiss
          });
        });
      }
    };

    function ModalInstanceCtrl($scope, $modalInstance) {
      $scope.ok = function() {
        $modalInstance.close();
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('appController', appController);

  function appController() {
    var vm    = this;
    vm.clickOK = clickOK;

    function clickOK () {
      console.log('Ok');
    }
  }
})();
