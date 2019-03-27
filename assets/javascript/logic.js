$(document).ready(function(){
//put js in here!
  var config = {
    apiKey: "AIzaSyDBdjxbiXNDTEd3ynFv_ehzTqkm8jpH8vo",
    authDomain: "assignment07-45c02.firebaseapp.com",
    databaseURL: "https://assignment07-45c02.firebaseio.com",
    projectId: "assignment07-45c02",
    storageBucket: "assignment07-45c02.appspot.com",
    messagingSenderId: "276146540995"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
      event.preventDefault();
      
      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();
      var trainTime = $("#first-time-input").val().trim();

      var currentTime = moment();
        console.log(moment(currentTime).format("hh:mm"));

      var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

      var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("difference " + diffTime);

      var timeLeft = diffTime % trainFrequency;

      var minsTill = trainFrequency - timeLeft;

      var nextTrain = moment().add(minsTill, "minutes");
        console.log(moment(nextTrain).format("hh:mm"));


      var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        next: nextTrain.format("hh:mm"),
        away: minsTill
        };
        console.log(newTrain);

        database.ref().push(newTrain);

        alert("Train added!");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-time-input").val("");
        $("#frequency-input").val("");
    });


    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFrequency = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().next;
        var timeLeft = childSnapshot.val().away;


        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(timeLeft)
        );

        $("#train-table > tbody").append(newRow);

    });

    

});