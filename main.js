song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function setup() {
    canvas=createCanvas(600,500)
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results) {
    if(results.length>0) {
       console.log(results);
       leftWristX=results[0].pose.leftWrist.x;
       leftWristY=results[0].pose.leftWrist.Y;
       console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);

       rightWristX=results[0].pose.rightWrist.x;
       rightWristY=results[0].pose.rightWrist.y;
       console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);

       scoreLeftWrist=results[0].pose.keypoints[9].score;
       scoreRightWrist=results[0].pose.keypoints[10].score;
       console.log("scoreLeftWrist= "+scoreLeftWrist+" scoreRightWrist= "+scoreRightWrist);
       console.log("scoreLeftWrist= "+scroreLeftWrist+" scoreRightWrist= "+scoreRightWrist);
    }
}
function modelLoaded() {
    console.log("PoseNet is initialised");
}
function draw() {
    image(video,0,0,600,500);
    fill("#66171d");
    stroke("#66171d");
    if (scoreRightWrist>0.2) {

    circle(rightWristX,rightWristY,20);
    
    if(rightWristY>0 && rightWristY<=100) {
        document.getElementById("speed").innerHTML="Speed=0.5x"
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200) {
        document.getElementById("speed").innerHTML="Speed=1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300) {
        document.getElementById("speed").innerHTML="Speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400) {
        document.getElementById("speed").innerHTML="Speed=2x"
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500) {
        document.getElementById("speed").innerHTML="Speed=2.5x";
        song.rate(2.5);
    }
}
if(scoreLeftWrist > 0.2)
{
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    new_leftWristY = floor(InNumberleftWristY *2);
    leftWristY_divide_1000 = new_leftWristY/1000;
    document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;		
    song.setVolume(leftWristY_divide_1000);	
}
}
function preload() {
    song=loadSound("music.mp3");
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}