//img="";
objects = [];
status = "";

function preload(params) 
{
   video=createVideo("IMG_0710.mov");
}
function setup(params) {
    canvas=createCanvas(600, 400);
    canvas.center();
  
    video.hide();

}
function start(params) {
  objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Estado : Detección de objetos";
}
function modelLoaded() {
    console.log("¡Modelo cargado!")
    status = true;
   video.loop();
   video.speed(1);
  video.volume(0);
  }
  function gotResult(error, results) 
{
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects=results;
}

function draw(params) {
   image(video, 0, 0, 600, 400);
   if(status!="")
   {
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML="Objetos detectados";
      document.getElementById("number").innerHTML="Numero de objetos detectados"+objects.length;
     fill("orangered");
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+20,objects[i].y+20);
    noFill();
    stroke("blue");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
    }
   }
}
