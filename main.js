stat="";
input_value="";
object=[];
function preload()
{

}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    cam=createCapture(VIDEO);
    cam.size(380,380);
    cam.hide();
}
function start()
{
    objd=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    input_value=document.getElementById("inputbox").value;
}
function modelLoaded()
{
    console.log("CocoSSD Model loaded!");
    stat=true;
    objd.detect(cam, gotResult);
}
function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
function draw()
{
    image(cam,0,0,380,380);
    if(stat!="")
    {
        for(i=0;i<object.length;i++)
        {
            labelobj=object[i].label;
            conf=floor(object[i].confidence*100);
            fill("purple");
            text(object[i].label+" "+conf+"%",object[i].x+20,object[i].y+20);
            noFill();
            stroke("purple");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(input_value==labelobj)
            {
                cam.stop();
                objd.detect(gotResult);
                document.getElementById("status").innerHTML="Status : Object Mentioned Found";
                synth = window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance("Object Mentioned Found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("status").innerHTML="Status : Object Not Mentioned Found";
            }
        }
    }
}