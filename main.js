song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        song1.play();

        document.getElementById("status").innerHTML = "Playing Song- Harry Potter Theme";
        console.log("Status - Song 1 Played");
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        song2.play();

        document.getElementById("status").innerHTML = "Playing Song- Peter Pan";
        console.log("Status - Song 2 Played")
    }
   
}

function preload()
{
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function modelLoaded()
{
    console.log("PoseNet Is Intialized!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftWristX + "leftWristY = " + leftWristY);

        rigthWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist = " + rigthWristX + "rightWristY = " + rightWristY);
    }
}