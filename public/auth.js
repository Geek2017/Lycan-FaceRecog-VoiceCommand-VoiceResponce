angular.module('lycan').controller('authCtrl', function($scope, $timeout) {

    // setTimeout(() => {
    //     $('video').trigger('pause');
    //     $('audio').trigger('pause');

    //     $(".splash").remove();
    //     // $(".core").show();
    // }, 12000);


    var video = document.querySelector("#video");


    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(err0r) {
                console.log("Something went wrong!");
            });

        console.log(video.srcObject)
    }

    setInterval(() => {
        var datas = localStorage.getItem('stat');
        console.log(datas)

        if (datas == '1') {
            executenow();
        }
    }, 5000);

    var resultb64 = "";

    var base64 = "";

    function executenow() {
        var canvas = document.getElementById('canvas');
        var video = document.getElementById('video');
        // canvas.width = 200;
        // canvas.height = 200;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
        resultb64 = canvas.toDataURL();
        // $("printresult").innerHTML = canvas.toDataURL();
        base64 = resultb64;

        setTimeout(() => {
            validate();
        }, 500);
    }



    var params = {
        // Request parameters
        "application": "FaceAuth"
    };

    function validate() {

        console.log(base64)


        var dataURL = base64;

        var params = {
            // Request parameters
            "application": "myTestApp"
        };

        var parts = dataURL.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        var imgContent = new Blob([uInt8Array], {
            type: contentType
        });

        $.ajax({
                url: "https://southeastasia.api.cognitive.microsoft.com/customvision/v3.0/Prediction/3f4b7c38-9a68-4378-8b9e-50a07a9b75da/classify/iterations/Iteration12/image?" + $.param(params),
                beforeSend: function(xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Prediction-Key", "411a75f3d0aa4d6c81f9d1c5934deed1");
                    xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                },
                type: "POST",
                // Request body
                data: imgContent,
                processData: false
            })
            .done(function(data) {

                console.log(Math.round(data.predictions[0].probability * 100))



                console.log(data)

                var obj = data.predictions;

                angular.forEach(obj, function(value, key) {
                    console.log(value.tagName, value.probability);

                    var prob = Math.round(value.probability * 100)

                    console.log(prob);

                    if (prob >= 98 && value.tagName === 'Jaggy') {
                        window.location.href = "./"
                        localStorage.setItem('Username', 'Jaggy')
                    }
                });



            })
            .fail(function(err0r) {
                console.log(err0r.responseText)
            });


    }



});