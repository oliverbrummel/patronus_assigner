var app = angular.module('patronusApp', []);

app.controller('PatronusController', ['$http', function($http){
  console.log('angular set up');
  var controller = this;
  controller.person = {};
  controller.patronus = {};
  controller.peopleList = [];
  controller.patronusesList = [];

  controller.savePerson = function(){
    console.log(controller.person);
    $http.post('/people', controller.person).then(function(serverResponse){
      console.log(serverResponse);
      controller.getPeople();
    });
  };

  controller.savePatronus = function(){
    $http.post('/patronuses', controller.patronus).then(function(serverResponse){
      console.log(serverResponse);
      controller.getPatronuses();
    });
  };

  controller.getPeople = function(){
    $http.get('/people').then(function(response){
      controller.peopleList = response.data;
    });
  };

  controller.getPatronuses = function(){
    $http.get('/patronuses').then(function(response){
      controller.patronusesList = response.data;
    });
  };


  controller.getPeople();
  controller.getPatronuses();

}]);
