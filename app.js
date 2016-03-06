var app = angular.module("flexiqueue", ["firebase", "ngRoute"]);

app.factory("dataService", ["$firebaseObject",
  function($firebaseObject) {
    // create a reference to the database location where we will store our data
    var ref = new Firebase("https://virtualine.firebaseio.com");
    // this uses AngularFire to create the synchronized array
    return $firebaseObject(ref);
  }
]);

app.controller("homeController", ['$scope', '$location', 'dataService',
function($scope, $location, dataService) {
  // synchronize the object with a three-way data binding
  dataService.$bindTo($scope, 'data');

  $scope.login = function() {
      $location.path("/queues");
  };

}]);

app.controller("adminController", ['$scope', '$location', 'dataService',
function($scope, $location, dataService) {
  // synchronize the object with a three-way data binding
  dataService.$bindTo($scope, 'data');

  $scope.openQueue = function () {
      $scope.data.status=true;
  };

  $scope.closeQueue = function () {
      $scope.data.status=false;
  };

  $scope.nextPerson = function () {
      var person = $scope.data.queues[0].line.shift();
      $scope.data.done.push(person);
  };

  $scope.latePerson = function () {
      var person = $scope.data.queues[0].line.shift();
      $scope.data.queues[0].line.push(person);
  };

  $scope.getQueueLength = function(queue) {
      if (queue) {
          return queue.length;
      } else {
          return 0;
      }
  };

}]);

app.controller("queuesController", ['$scope', '$location', 'dataService', '$routeParams',
function($scope, $location, dataService, $routeParams) {
  // synchronize the object with a three-way data binding
  dataService.$bindTo($scope, 'data');

  $scope.queueId = $routeParams.id || '0';

  $scope.getInLine = function(index) {
      $location.path('/queues/' + index);
  };

  $scope.getQueueLength = function(queue) {
      if (queue) {
          return queue.length;
      } else {
          return 0;
      }
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
            templateUrl: 'pages/linestatus.html',
            controller: 'queuesController'
        })

        .when('/admin', {
            templateUrl: 'pages/admin.html',
            controller: 'adminController'
        });

});
