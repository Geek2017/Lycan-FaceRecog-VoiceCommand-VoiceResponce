angular.module('lycan').controller('indexCtrl', function($scope, $timeout) {

    var auth = localStorage.getItem('stat');

    if (auth == '1') {
        $("#cn-button").trigger("click");
    } else {
        window.location.href = "./auth.html"
    }

    // $(".cn-button").click(function() {
    //     alert('clink')
    // });

    $(".cn-button").click(function() {

        // get output div reference
        var output = document.getElementById("output");
        // get action element reference
        var action = document.getElementById("action");
        // new speech recognition object
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();

        // This runs when the speech recognition service starts
        recognition.onstart = function() {
            action.innerHTML = "<small>listening, please speak...</small>";
        };

        recognition.onspeechend = function() {
            action.innerHTML = "<small>stopped listening, hope you are done...</small>";
            recognition.stop();
        }

        // This runs when the speech recognition service returns result
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            var confidence = event.results[0][0].confidence;


            if (transcript === 'engine start') {
                alert('Starting your engine')
                output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";

            } else if (transcript === 'engine off') {
                alert('shutting down engine')

                output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
            } else if (transcript === 'lockdown') {
                alert('Locking your engine')

                output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
            } else if (transcript === 'alarm off') {
                alert('Alarm turn off')

                output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
            } else {

                output.innerHTML = "<b>INVALID COMMAND:<br> I hear! " + transcript + " Please try again </b> ";

            }


            output.classList.remove("hide");
        };

        // start recognition
        recognition.start();
    });

});