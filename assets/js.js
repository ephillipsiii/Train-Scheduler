$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyDS76fgtxa_uY8S-UlzflX0fR5EqSYml80",
        authDomain: "trainscheculer.firebaseapp.com",
        databaseURL: "https://trainscheculer.firebaseio.com",
        projectId: "trainscheculer",
        storageBucket: "",
        messagingSenderId: "980498927116"
      };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-btn").on("click", function(){

        var trainName = $("#train-name-input").val().trim();
        var destinationName = $("#destination-input").val().trim();
        var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequency-input").val().trim();

        var newTrain = {
            name: trainName,
            destination: destinationName,
            trainTime: firstTrain,
            frequency: frequency,
        }

        database.ref().push(newTrain);

        $("#train-name-input").val("");
        $("#destinationName").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
    });
    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot);
        console.log(childSnapshot.val());

        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFTrain = childSnapshot.val().trainTime;
        var tFrequency = childSnapshot.val().frequency;

        var timeFirstTrainStandard = moment.unix(tFTrain).format("HH:mm");
        var difference = moment().diff(moment.unix(tFTrain), "minutes");
        var remainder = moment().diff(moment.unix(tFrequency), "minutes") % tFrequency;
        var timeLeft = tFrequency - remainder;

        var arrival = moment().add(timeLeft, "m").format("HH:mm");

        $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + timeFirstTrainStandard + "</td><td>" + tFrequency + "<td><td>" + arrival + "</td><td>");
    })
})