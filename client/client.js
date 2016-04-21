var app = angular.module('patronusApp', []);

app.controller('PatronusController', ['$timeout', '$http', function($timeout, $http ){
  // console.log('angular set up');
  var controller = this;
  controller.person = {};
  controller.patronus = {};
  controller.peopleList = [];
  controller.patronusesList = [];
  controller.unassignedPeopleList = [];
  controller.assignedPeopleList = [];
  controller.peopleID = 0;
  controller.patronusesID = 0;

  controller.savePerson = function(){
    // console.log(controller.person);
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
      // console.log('peopleList', controller.peopleList);
      controller.unassignedPeopleList = controller.peopleList.filter(function(person){
        return person.patronus_id == null;
      });
      // console.log('unassignedPeopleList', controller.unassignedPeopleList);

      controller.assignedPeopleList = controller.peopleList.filter(function(person){
        return person.patronus_id !== null;
      });
    });
  };

  controller.getPatronuses = function(){
    $http.get('/patronuses').then(function(response){
      controller.patronusesList = response.data;
    });
  };

  controller.assignPatronus = function() {
    controller.showGIF = true;

    $http.put("/people/" + controller.peopleID, {patronus_id : controller.patronusesID}).then(function(response) {
      controller.getPatronuses();
      controller.getPeople();

      // controller.showGIF = true;
      $timeout(function(){
        controller.showGIF = false;
        // console.log("test", controller.showGIF);
      }, 3000);
    });
  };

  controller.getPeople();
  controller.getPatronuses();

}]);
