(function (angular) {
    'use strict';

    var app = angular.module('MACServices', []);

	var mode = 'local';
  	app.value('Constants',
  		{
        BASE: 'http://localhost:9090',
        SERVICE: 'http://localhost:8080/api/1/services/'
        });
      
    app.factory('AssetService', [
        '$http', 'Constants',
        function ($http, Constants) {

        }
    ]);

})(angular); 