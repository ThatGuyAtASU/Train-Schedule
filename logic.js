
     // Initialize Firebase
     var config = {
        apiKey: "AIzaSyBO89SmbReFEsdlo9lwPZrA361LU_V4Dug",
        authDomain: "train-schedule-69300.firebaseapp.com",
        databaseURL: "https://train-schedule-69300.firebaseio.com",
        projectId: "train-schedule-69300",
        storageBucket: "train-schedule-69300.appspot.com",
        messagingSenderId: "712478149213"
      };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-button").on("click", function(event){
      event.preventDefault();


    //grabbing input
      var trainName = $("#train-name-input").val().trim();
      var destination =$("#destination-input").val().trim();
      var firstTrain = moment($("#first-train-input").val().trim(),"HH:mm").format("X");
      var frequency = $("#frequency-input").val().trim();

      var newTrain = {
          name : trainName,
          end : destination,
          start : firstTrain,
          rate : frequency
      };

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.end);
      console.log(newTrain.start);
      console.log(newTrain.rate);

      alert("Train successfully added");

      $("#train-name-input").val("");
      $("destination-input").val("");
      $("first-train-input").val("");
      $("frequency-input").val("");

    //   var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    //   console.log(timeConverted);

    //   var currentTime = moment();
    //   console.log("CURRENT TIME: " +moment(currentTime).format("hh:mm"));

    //   var diffTime = moment().diff(moment(timeConverted),"minutes");
    //   console.log("DIFFERENCE IN TIME: " + diffTime);

    //   var tRemainder = diffTime % frequency;
    //   console.log(tRemainder);

    //   var tMinutesTillTrain = frequency - tRemainder;
    //   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //   console.log("ARRIVAL TIME: " + moment(nextTrain).format ("hh:mm"));


  });

  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().end;
      var firstTrain = childSnapshot.val().start;
     // firstTrain = moment.unix(firstTrain).format("HH:mm")
      var frequency = childSnapshot.val().rate;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);



   


    //function calculateTime(frequency, firstTrain){

        var currentTime = moment();
        console.log("Current Time: " + currentTime);

       // var tFrequency = frequency;

        //var firstTime = firstTrain;

        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log("First: " + firstTrain);
        console.log(firstTimeConverted);

        var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
        console.log("Difference in time: " + diffTime);

        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        var tMinutesTillTrain = frequency - tRemainder;
        console.log("Minutes till train: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
        var nextArrival = moment(nextTrain).format("hh:mm");
        // return{
        //     minutesTillTrain: tMinutesTillTrain,
        //     nextTrain:nextTrain

        // }

        var newRow = $("<tr>").append(
            $("<th>").text(trainName),
            $("<th>").text(destination),
            $("<th>").text(frequency),
            $("<th>").text(nextArrival),
            $("<th>").text(tMinutesTillTrain)
        );
        $("#train-table > tbody").append(newRow);
    // };
    // calculateTime();

   

  

  });