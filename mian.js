var prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_capture" src='+data_uri+'"/>'
    });
}
console.log("ml5 Version;", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/AkadH2rJb/", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The prediction is"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis)
}

function check(){
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if(error){
        console.error(error);
    }
    else{
        document.getElementById("result_gesture_name").innerHTML = result[0].label;
        prediction = results[0].label;
        speak();
        if(result[0].label == "Amazing"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "THIS IS LOOKING AMAZING";
        }
        else if(result[0].label == "Best"){
            document.getElementById("result_emoji").innerHTML = "&#128077;";
            document.getElementById("quote").innerHTML = "WOW OMG SP COOL LOLLOO";
        }
        else{
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "NICE PINKY";
        }
    }
}