angular.module('lycan').controller('indexCtrl', function($scope, $timeout) {


    var settings = {
        "url": "https://api.ipgeolocation.io/ipgeo?apiKey=ea0f75632611493a9acdc8a887bd1409",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
    });

    var auth = localStorage.getItem('stat');

    $scope.username = localStorage.getItem('Username');

    var txts = 'HELLO!' + $scope.username;

    localStorage.setItem('count', 0)



    setTimeout(() => {
        // alert(1)
        var message = new SpeechSynthesisUtterance(txts);
        speechSynthesis.speak(message);


        localStorage.setItem('count', 1)
    }, 2000);


    $(".alarmoff").on("click", function() {
        var alarmoff = new SpeechSynthesisUtterance('Turning off the Alarm!');
        speechSynthesis.speak(alarmoff);
    });

    $(".alarmon").on("click", function() {
        var alarmon = new SpeechSynthesisUtterance('Turning on the Alarm!');
        speechSynthesis.speak(alarmon);
    });

    $(".eginestart").on("click", function() {
        var eginestart = new SpeechSynthesisUtterance('Starting your Engine!');
        speechSynthesis.speak(eginestart);
    });

    $(".egineoff").on("click", function() {
        var egineoff = new SpeechSynthesisUtterance('Shuttingdown your Engine!');
        speechSynthesis.speak(egineoff);
    });

    $(".lockon").on("click", function() {
        var lockon = new SpeechSynthesisUtterance('Guard on!');
        speechSynthesis.speak(lockon);
    });

    $(".lockoff").on("click", function() {
        var lockoff = new SpeechSynthesisUtterance('Guard off!');
        speechSynthesis.speak(lockoff);
    });


    if (auth == '1') {
        setTimeout(() => {
            $("#cn-button").trigger("click");
        }, 1000);
    } else {
        window.location.href = "./auth.html"
    }

    $(".float-end").click(function() {
        localStorage.clear();
        window.location.reload()
    });

    $(".cn-button").click(function() {

        // get output div reference
        var output = document.getElementById("output");
        // get action element reference
        var action = document.getElementById("action");
        // new speech recognition object
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();

        // This runs when the speech recognition service starts

        var scount = localStorage.getItem('count');

        // recognition.onstart = function() {
        var great = new SpeechSynthesisUtterance('yes' + $scope.username + " " + "how can I help you?");
        if (scount === '1') {
            speechSynthesis.speak(great);

            action.innerHTML = '<h5 id="soutput">Im listening, please speak...</h5>'

            // speechSynthesis.onend = function(event) {
            //     console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' seconds.');
            //     recognition.start();

            // };

        }



        // };

        recognition.onspeechend = function() {
            action.innerHTML = '<h5 id="soutput">Im listening, please speak...</h5>'
            recognition.start();
            // action.innerHTML = '<h5 id="soutput">SynthesisUtterance Stop</h5>';
            // var stops = new SpeechSynthesisUtterance("I Stop listening hope your done, if not please try  again");
            // speechSynthesis.speak(stops);
            // recognition.stop();
        }

        // This runs when the speech recognition service returns result
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            var confidence = event.results[0][0].confidence;


            if (transcript === 'engine start') {
                // alert('Starting your engine')
                var engine = new SpeechSynthesisUtterance('Certainly! Starting your engine now!');
                speechSynthesis.speak(engine);

            } else if (transcript === 'engine off') {
                // alert('shutting down engine')
                var shutting = new SpeechSynthesisUtterance('Certainly! shutting down your engine!');
                speechSynthesis.speak(shutting);

            } else if (transcript === 'lockdown') {
                // alert('Locking your engine')
                var locking = new SpeechSynthesisUtterance('Certainly! Locking your engine!');
                speechSynthesis.speak(locking);

            } else if (transcript === 'alarm off') {
                // alert('Alarm turn off')
                var alarm = new SpeechSynthesisUtterance('Certainly! turnning alarm off!');
                speechSynthesis.speak(alarm);

            } else if (transcript === 'find me') {
                // alert('Alarm turn off')
                var alarm = new SpeechSynthesisUtterance('Certainly! turnning alarm off!');
                speechSynthesis.speak(alarm);

            } else {
                var invalid = new SpeechSynthesisUtterance("sorry I did not catch that, Please try again");
                output.innerHTML = "<b>INVALID COMMAND:<br> I hear! " + transcript + " Please try again </b> ";
                speechSynthesis.speak(invalid);
            }


            output.classList.remove("hide");
        };

        // start recognition
        recognition.start();
    });





});