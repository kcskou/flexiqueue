var app = angular.module("flexiqueue", ["firebase", "ngRoute"]);

app.controller("homeController", ['$scope', '$location', '$firebaseObject', function($scope, $location, $firebaseObject) {
  var ref = new Firebase("https://virtualine.firebaseio.com");
  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");

  $scope.submit = function () {
      $location.path("/queues");
  };

}]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/queues', {
            templateUrl: 'pages/queues.html',
            controller: 'queuesController'
        })

        .when('/queues/:id', {
            templateUrl: 'pages/queues.html',
            controller: 'queuesController'
        });

});
