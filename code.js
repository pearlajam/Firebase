
$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyB0FFFstexJQ7gbz0zEkj2a6Tyx_Sbxeio",
        authDomain: "train-project-2085c.firebaseapp.com",
        databaseURL: "https://train-project-2085c.firebaseio.com",
        projectId: "train-project-2085c",
        storageBucket: "train-project-2085c.appspot.com",
        messagingSenderId: "622272884343"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var startTime;
    var frequency = 0;

    $(".add-schedule").on("click", function (response) {

        response.preventDefault();

        name = $("#trainNameInput").val();
        destination = $("#destinationNameInput").val();
        startTime = $("#startTimeInput").val();
        frequency = $("#frequencyInput").val();
        var databaseVal = {
            name: name,
            destination: destination,
            start_time: startTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }
        database.ref("/schedule").push(databaseVal);

    })

    database.ref("/schedule").on("child_added", function (snapshot) {
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().start_time);
        console.log(snapshot.val().frequency);
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var startTime = snapshot.val().start_time;
        var frequency = parseInt(snapshot.val().frequency);
        var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextArrival = moment(nextTrain).format("hh:mm");
        console.log("ARRIVAL TIME: " + nextArrival);

        var trainInfo = $(`
        <tr>
        
          <td>${name}</td>
          <td>${destination}</td>
          <td>${startTime}</td>
          <td>${frequency}</td>
          <td>${nextArrival}</td>
          <td>${tMinutesTillTrain}</td>
          
        </tr>`);

        $(".schedule-rows").append(trainInfo);
    })
})