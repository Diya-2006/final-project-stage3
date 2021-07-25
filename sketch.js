var bg, bgImg;
var player, shooterImg, shooter_shooting;
var bat, batimg, batgroup;
var zombiegroup, zombie1, zombie2, zombie;
var score =0;
function preload() {
  shooterImg = loadAnimation(
    "assets/sh1.png",
    "assets/sh2.png",
    "assets/sh3.png",
    "assets/sh4.png",
    "assets/sh5.png"
  );
  shooter_shooting = loadAnimation(
    "assets/s1.png",
    "assets/s2.png",
    "assets/s3.png",
    "assets/s4.png"
  );
  batimg = loadAnimation(
    "assets/bat1.png",
    "assets/bat2.png",
    "assets/bat3.png",
    "assets/bat4.png",
    "assets/bat5.png",
    "assets/bat6.png"
  );
  bgImg = loadImage("assets/backg.jpg");
  zombie1 = loadImage("assets/z1.png");
  zombie2 = loadImage("assets/z2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.2;
  bg.x = width / 2;
  bg.velocityX = -6;

  //creating the player sprite
  player = createSprite(displayWidth - 1200, displayHeight - 280, 50, 50);
  player.addAnimation("standing", shooterImg);
  player.scale = 0.3;
  player.debug = false;
  player.setCollider("rectangle", 0, 0, 300, 300);

  batgroup = new Group();
  zombiegroup = new Group();
  score=0;
}

function draw() {
  background(0);
textSize(20);
fill("white");
text("Score: "+score,30,50)
  if (bg.x < 200) {
    bg.x = bg.width / 2;
  }

  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30;
    player.addAnimation("crouching", shooter_shooting);
  }

  if (keyWentDown("space")) {
    player.addAnimation("crouching", shooter_shooting);
  } else if (keyWentUp("space")) {
    player.addAnimation("standing", shooterImg);
  }
  spawnbats();
  spawnzombie();
  drawSprites();
}
function spawnbats() {
  if (frameCount % 160 === 0) {
    var bat = createSprite(width + 20, height - 300, 40, 10);
    bat.y = Math.round(random(100, 220));
    bat.addAnimation("flying", batimg);
    bat.scale = 0.2;
    bat.velocityX = -3;
    bat.lifetime = 600;
    bat.depth = player.depth;
    player.depth = player.depth + 1;
    batgroup.add(bat);
  }
}
function spawnzombie() {
  if (frameCount % 160 === 0) {
    var zombie = createSprite(600, height - 95, 20, 30);
    zombie.setCollider('circle', 0, 0, 45)


    zombie.velocityX = -6;



    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: zombie.addImage(zombie1);
        break;
      case 2: zombie.addImage(zombie2);
        break;
      default: break;
    }


    zombie.scale = 0.2;
    zombie.lifetime = 300;
    zombie.depth = player.depth;
    player.depth += 1;

    zombiegroup.add(zombie);
  }
}