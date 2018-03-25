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
        var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequency = $("#frequency-input").val().trim();

        console.log(trainName);
        console.log(destinationName);
        console.log(firstTrain);
        console.log(frequency);

        var newTrain = {
            name: trainName,
            destination: destinationName,
            trainTime: firstTrain,
            frequency: frequency,
        }

        database.push(newTrain);
    })
})