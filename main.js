Webcam.set({
    width:300,
    height:250,
    image_format:'png',
    png_quality:90
    });
    
    camera=document.getElementById("camera");
    Webcam.attach('#camera');
    function take_snapshot(){
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
        });
    }
    console.log('ml5 version:',ml5.version);
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oMf72E12t/model.json',modelLoaded);
    function modelLoaded(){
        console.log("modelLoaded");
    }
    function check(){
        img=document.getElementById('captured_image');
        classifier.classify(img,gotResult);
    }
    function gotResult(error,results){
        if (error){
            console.error("error");
        }
        else{
            console.log(results);
            document.getElementById("object_name").innerHTML=results[0].label;
            document.getElementById("object_accuracy").innerHTML=results[0].confidence.toFixed(3);
            percent=results[0].confidence.toFixed(3)*100;
            console.log("percent");
            object=results[0].label;
            document.getElementById("percent").innerHTML=percent;
            speak();
        }
    }
    function speak(){
        var synth=window.speechSynthesis;
    
        speak_data="i am"+percent+"percent confident this object is a"+object;
    
        var utterThis=new SpeechSynthesisUtterance(speak_data);
    
        synth.speak(utterThis);
    }
