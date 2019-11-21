(function (angular) {
    'use strict';

    var app = angular.module('MACControllers', [
        'MACServices',
        'ui.bootstrap',
        'ui.router',
        'ngSanitize'
    ]);

    app.controller('DatepickerDemoCtrl', function($scope) {

        $scope.minDate = new Date();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'MM/dd/yyyy';
    })

})(angular);