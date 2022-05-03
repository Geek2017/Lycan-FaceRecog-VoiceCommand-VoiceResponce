angular.module('lycan').controller('indexCtrl', function($scope, $timeout) {

    var config = {
        apiKey: "AIzaSyBvJ8r3ZY1r8UEVcSmGPN6IIjkx_6W0hJc",
        authDomain: "lycan-iot-db.firebaseapp.com",
        databaseURL: "https://lycan-iot-db-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "lycan-iot-db"
    };

    firebase.initializeApp(config);


    var settings = {
        "url": "https://api.ipgeolocation.io/ipgeo?apiKey=ea0f75632611493a9acdc8a887bd1409",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        localStorage.setItem('location', response.city + "," + response.state_prov + "," + response.country_name)
    });

    var auth = localStorage.getItem('stat');

    $scope.username = localStorage.getItem('Username');

    var txts = 'HELLO!' + $scope.username;

    localStorage.setItem('count', 0)

    var location = localStorage.getItem('location');

    // setTimeout(() => {
    //     // alert(1)
    //     var message = new SpeechSynthesisUtterance(txts);
    //     speechSynthesis.speak(message);
    //     // localStorage.setItem('count', 1)
    // }, 2000);


    $(".alarmoff").on("click", function() {
        var command = {
            command: {
                alarm: 0,
                engine: 0,
                lock: 0,
            },
            state: 1
        }

        var updates = {};
        updates['/iotdata/sadkfhsajkd2312312'] = command;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates)
            var alarmoff = new SpeechSynthesisUtterance('Turning off the Alarm!');
            speechSynthesis.speak(alarmoff);
        }
    });

    $(".alarmon").on("click", function() {
        var command = {
            command: {
                alarm: 1,
                engine: 0,
                lock: 0,
            },
            state: 1
        }

        var updates = {};
        updates['/iotdata/sadkfhsajkd2312312'] = command;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates)
            var alarmon = new SpeechSynthesisUtterance('Turning on the Alarm!');
            speechSynthesis.speak(alarmon);
        }
    });

    $(".eginestart").on("click", function() {

        var command = {
            command: {
                alarm: 0,
                engine: 1,
                lock: 0,
            },
            state: 1
        }

        var updates = {};
        updates['/iotdata/sadkfhsajkd2312312'] = command;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates)
            var eginestart = new SpeechSynthesisUtterance('Starting your Engine!');
            speechSynthesis.speak(eginestart);
        }

    });

    $(".egineoff").on("click", function() {

        var command = {
            command: {
                alarm: 0,
                engine: 0,
                lock: 0,
            },
            state: 1
        }

        var updates = {};
        updates['/iotdata/sadkfhsajkd2312312'] = command;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates)
            var egineoff = new SpeechSynthesisUtterance('Shuttingdown your Engine!');
            speechSynthesis.speak(egineoff);
        }
    });

    $(".lockon").on("click", function() {

        var command = {
            command: {
                alarm: 0,
                engine: 0,
                lock: 1,
            },
            state: 1
        }

        var updates = {};
        updates['/iotdata/sadkfhsajkd2312312'] = command;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates)
            var lockon = new SpeechSynthesisUtterance('Guard on!');
            speechSynthesis.speak(lockon);
        }
    });

    $(".lockoff").on("click", function() {
        var command = {
            command: {
                alarm: 0,
                engine: 0,
                lock: 0,
            },
            state: 1
        }

        var updates = {};
        updates['/iotdata/sadkfhsajkd2312312'] = command;
        firebase.database().ref().update(updates);

        if (updates) {
            console.log(updates)
            var lockoff = new SpeechSynthesisUtterance('Guard off!');
            speechSynthesis.speak(lockoff);
        }
    });


    if (auth == '1') {
        setTimeout(() => {
            $("#cn-button").trigger("click");
            $("#cn-button").hide();
            $("#luna").show();
        }, 1000);
    } else {
        window.location.href = "./splash.html"
    }

    $(".float-end").click(function() {
        localStorage.clear();
        window.location.reload()
    });

    $("#luna").click(function() {

        // get output div reference
        var output = document.getElementById("output");
        // get action element reference
        var action = document.getElementById("action");
        // new speech recognition object
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();

        // This runs when the speech recognition service starts

        var scount = localStorage.getItem('count');

        recognition.onstart = function() {
            $(".hello").remove();
            action.innerHTML = '<h5 id="soutput">Im listening, please speak...</h5>'
        };


        recognition.onspeechend = function() {
            action.innerHTML = '<h5 id="soutput">SpeechSynthesis stop pls. reinitialize</h5>'
            recognition.stop();
        }

        // This runs when the speech recognition service returns result
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            var confidence = event.results[0][0].confidence;


            if (transcript === 'engine start') {
                // alert('Starting your engine')
                var command = {
                    command: {
                        alarm: 0,
                        engine: 1,
                        lock: 0,
                    },
                    state: 1
                }

                var updates = {};
                updates['/iotdata/sadkfhsajkd2312312'] = command;
                firebase.database().ref().update(updates);

                if (updates) {
                    console.log(updates)
                    var engine = new SpeechSynthesisUtterance('Certainly! Starting your engine now!');
                    speechSynthesis.speak(engine);
                }

            } else if (transcript === 'engine off') {
                // alert('shutting down engine')           
                var command = {
                    command: {
                        alarm: 0,
                        engine: 0,
                        lock: 0,
                    },
                    state: 1
                }

                var updates = {};
                updates['/iotdata/sadkfhsajkd2312312'] = command;
                firebase.database().ref().update(updates);

                if (updates) {
                    console.log(updates)
                    var shutting = new SpeechSynthesisUtterance('Certainly! shutting down your engine!');
                    speechSynthesis.speak(shutting);

                }

            } else if (transcript === 'lockdown') {
                // alert('Locking your engine')

                var command = {
                    command: {
                        alarm: 0,
                        engine: 1,
                        lock: 0,
                    },
                    state: 1
                }

                var updates = {};
                updates['/iotdata/sadkfhsajkd2312312'] = command;
                firebase.database().ref().update(updates);

                if (updates) {
                    console.log(updates)
                    var locking = new SpeechSynthesisUtterance('Certainly! Locking on your engine!');
                    speechSynthesis.speak(locking);
                }

            } else if (transcript === 'unlock') {
                // alert('Locking your engine')

                var command = {
                    command: {
                        alarm: 0,
                        engine: 1,
                        lock: 0,
                    },
                    state: 1
                }

                var updates = {};
                updates['/iotdata/sadkfhsajkd2312312'] = command;
                firebase.database().ref().update(updates);

                if (updates) {
                    console.log(updates)
                    var locking = new SpeechSynthesisUtterance('Certainly! unlocking your engine!');
                    speechSynthesis.speak(locking);
                }

            } else if (transcript === 'alarm off') {
                // alert('Alarm turn off')

                var command = {
                    command: {
                        alarm: 0,
                        engine: 0,
                        lock: 0,
                    },
                    state: 1
                }

                var updates = {};
                updates['/iotdata/sadkfhsajkd2312312'] = command;
                firebase.database().ref().update(updates);

                if (updates) {
                    console.log(updates)
                    var alarm = new SpeechSynthesisUtterance('Certainly! turnning alarm off!');
                    speechSynthesis.speak(alarm);
                }

            } else if (transcript === 'find me') {
                // alert('Alarm turn off')
                var tract = 'you are at' + ',' + location


                var place = new SpeechSynthesisUtterance(tract);
                speechSynthesis.speak(place);

                console.log(tract);

            } else {

                var invalid = new SpeechSynthesisUtterance("Sorry I did not catch that, Please try again");

                output.innerHTML = "<b>INVALID COMMAND:<br> I hear! " + transcript + " Please try again </b> ";

                speechSynthesis.speak(invalid);
            }


            output.classList.remove("hide");
        };

        // start recognition
        recognition.start();
    });





});