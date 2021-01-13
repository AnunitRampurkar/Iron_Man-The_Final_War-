//Variables to store game states:
var gameState = 0,
    START = 0,
    PLAY = 1,
    END = 2;

//Make variables for sprites & their images:
var ironMan, back, invi, fire, wallpaper, space, howToPlay;
var anunit, or, clickHere, instructions;
var ironFly, ironstand, backgroundImg, gameOverImg, fireImg;
var climberImg;
var wallpaperImg, pressSpace, howToPlayImg;
var anunitImg, orImg, clickHereImg, instructionsImg;
var redFireImg, blueFireImg, pinkFireImg;

//Make variables for sound:
var backSound, gameOverMP3, fireSound, blastSound;

//Make variables for groups:
var climberG, fireG, inviG, redFireG, pinkFireG, blueFireG;

//Make variables for mobile play:
var left, right, fireClick, jump;
var leftImg, rightImg, fireCImg, jumpImg;

//Make score variable:
var score;

//Life:
var lives;
var x;

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

function preload() {

//Load the images:
  backgroundImg = loadImage("Background.jpg");

  ironstand = loadImage("IronMan2.png");
  ironFly = loadImage("IronMan.png");

  climberImg = loadImage("climber.png");

  gameOverImg = loadImage("gameover.png");

  fireImg = loadImage("Fire.png");
  
  leftImg = loadImage("Left.jpg");
  rightImg = loadImage("Right.jpg");
  fireCImg = loadImage("FireClick.png");
  jumpImg = loadImage("Jump.png");

  wallpaperImg = loadImage("Wallpaper.png");

  pressSpace = loadImage("PressSpace.jpg");

  howToPlayImg = loadImage("HowToPlay.jpg");

  anunitImg = loadImage("Anunit.png");

  orImg = loadImage("Or.jpg");

  clickHereImg = loadImage("ClickHere.jpg");

  instructionsImg = loadImage("Instructions.jpg");

  redFireImg = loadImage("RedFire.png");
  pinkFireImg = loadImage("PinkFire.png");
  blueFireImg = loadImage("BlueFire.png");

//Load the sounds:
  backSound = loadSound("BackSound.mp3");

  gameOverMP3 = loadSound("gameOver.mp3");

  fireSound = loadSound("Swoosh.mp3");

  blastSound = loadSound("Crash.wav");
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

function setup() {

//Create Canvas:
  createCanvas(400, 670);

//Define groups:
  climberG = new Group();
  inviG = new Group();

  fireG = new Group();

  redFireG = new Group();
  blueFireG = new Group();
  pinkFireG = new Group();

//Create a wallpaper:
  wallpaper = createSprite(200, 350, 20, 20);
  wallpaper.addImage(wallpaperImg);
  wallpaper.scale = 0.4;

//Make a logo sprite:
  anunit = createSprite(200, 180, 20, 20);
  anunit.addImage(anunitImg);
  anunit.scale = 0.1;

  howToPlay = createSprite(200, 300, 20, 20);
  howToPlay.addImage(howToPlayImg);
  howToPlay.scale = 0.3;

  space = createSprite(200, 380, 20, 20);
  space.addImage(pressSpace);
  space.scale = 0.6;

  or = createSprite(140, 430, 20, 20);
  or.addImage(orImg);
  or.scale = 0.3;

  clickHere = createSprite(230, 430, 20, 20);
  clickHere.addImage(clickHereImg);
  clickHere.scale = 0.25;

//Create a background:
  back = createSprite(200, 110, 20, 20);
  back.addImage(backgroundImg);
  back.scale = 1.1;

//Make a iron man sprite:
  ironMan = createSprite(200, 150, 10, 10);
  ironMan.scale = 0.13;
  ironMan.setCollider("rectangle", 0, 0, 500, 1150);
  ironMan.addImage(ironFly);
  ironMan.addImage(ironstand);

//Create clickable sprites:
  left = createSprite(40, 600, 20, 20);
  left.addImage(leftImg);
  left.scale = 0.35;

  right = createSprite(360, 600, 20, 20);
  right.addImage(rightImg);
  right.scale = 0.35;

  jump = createSprite(40, 500, 20, 20);
  jump.addImage(jumpImg);
  jump.scale = 0.65;

  fireClick = createSprite(360, 510, 20, 20);
  fireClick.addImage(fireCImg);
  fireClick.scale = 0.35;
  
//Create an instructions page:
  instructions = createSprite(200, 335, 20, 20);
  instructions.addImage(instructionsImg);
  instructions.scale = 0.8;

  //ironMan.debug = true;

//Play a background sound:
  backSound.loop();

//Define score:
  score = 0;

//Define lives:
  lives = 5;
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

function draw() {
  background("cyan");
  
//Make game state START:
  if (gameState === START) {
//Make the sprites invisible:
    back.visible = false;
    ironMan.visible = false;
    left.visible = false;
    right.visible = false;
    jump.visible = false;
    fireClick.visible = false;
    instructions.visible = false;

//Make the velocities of both of them 0:
    ironMan.velocityY = 0;
    back.velocityY = 0;
    
//Show the instructions after clicking on 'How to Play':
    if (mousePressedOver(howToPlay)) {
      instructions.visible = true;
    }
    
//Change the game state to PLAY:
    if ((keyDown("space") || mousePressedOver(space) || 
         mousePressedOver(clickHere)) && gameState === START) {
      gameState = PLAY;
    }
  }
  
//Make game state PLAY:
  if (gameState === PLAY) {

//Give velocities to background & iron man:
    ironMan.velocityY = 4;
    back.velocityY = 2;
    
//Increase the score:
    score = score + 0.1;

//Make the sprites visible:
    back.visible = true;
    ironMan.visible = true;
    left.visible = true;
    right.visible = true;
    jump.visible = true;
    fireClick.visible = true;

//Create an infinite background:
    if (back.y > 600) {
      back.y = 110;
    }

//Spawn the climbers:
    Climbers();

//Flame all fires:
    RedFire();
    PinkFire();
    BlueFire();
    
//Make the iron man jump & fly:
    if (keyDown("space") || mousePressedOver(jump)) {
      ironMan.addImage(ironFly);
      ironMan.scale = 0.04;
      ironMan.setCollider("rectangle", 0, 0, 2000, 3050);
      ironMan.velocityY = -6;
    }
    
//Change the image of iron man after releasing the 'SPACE' key:
    if (keyWentUp("space")) {
      ironMan.addImage(ironstand);
      ironMan.scale = 0.13;
      ironMan.setCollider("rectangle", 0, 0, 500, 1150);
    }

//Give gravity to the Iron Man:
    ironMan.velocityY = ironMan.velocityY + 0.8;
    
//Move the iron man left:
    if (keyDown("left_arrow") || mousePressedOver(left)) {
      ironMan.x = ironMan.x - 3;
    }
    
//Move the iron man right:
    if (keyDown("right_arrow") || mousePressedOver(right)) {
      ironMan.x = ironMan.x + 3;
    }

//Create fire by pressing 'F' key:
    if (keyDown("f") || mousePressedOver(fireClick)) {
      Fire();
      fireSound.play();
    }
    
//Destroy the enemy's fire after it touches iron man's fire:
    if (fireG.isTouching(redFireG) || fireG.isTouching(pinkFireG) ||
      fireG.isTouching(blueFireG)) {

      if (fireG.isTouching(redFireG)) {
        redFireG.destroyEach();
      }

      if (fireG.isTouching(pinkFireG)) {
        pinkFireG.destroyEach();
      }

      if (fireG.isTouching(blueFireG)) {
        blueFireG.destroyEach();
      }
      
//Destroy the iron man's fire:
      fireG.destroyEach();
      
//Play a blast sound:
      blastSound.play();
    }
    
//Destroy the enemy's fire after it touches iron man:
    if (ironMan.isTouching(redFireG) || ironMan.isTouching(pinkFireG) ||
      ironMan.isTouching(blueFireG)) {

      if (ironMan.isTouching(redFireG)) {
        redFireG.destroyEach();
      }

      if (ironMan.isTouching(pinkFireG)) {
        pinkFireG.destroyEach();
      }

      if (ironMan.isTouching(blueFireG)) {
        blueFireG.destroyEach();
      }

//Decrease the lives:
      lives = lives - 1;
    }
    
//Make the iron man collide to climbers:
    if (ironMan.isTouching(climberG)) {
      ironMan.collide(climberG);
    }
    
//Change the game state to END:
    if (ironMan.y > 680 || ironMan.isTouching(inviG) || lives === 0) {
      gameState = END;

      ironMan.visible = false;
    }
  }
  
//Make game state END:
  if (gameState === END) {
    gameOver = createSprite(200, 350, 20, 20);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 1.5;

    gameOverMP3.play();

    back.velocityY = 0;
    back.visible = false;

    climberG.destroyEach();

    fireClick.visible = false;
    jump.visible = false;
    right.visible = false;
    left.visible = false;
    clickHere.visible = false;
    or.visible = false;
    space.visible = false;
    howToPlay.visible = false;
    anunit.visible = false;
    wallpaper.visible = false;

    fireG.destroyEach();

    redFireG.destroyEach();
    pinkFireG.destroyEach();
    blueFireG.destroyEach();
  }

  drawSprites();

  textSize(18);
  fill("red");
  stroke("black");
  strokeWeight(5);
  text("Score: - " + Math.round(score), 290, 30);

  textSize(18);
  fill("red");
  stroke("black");
  strokeWeight(5);
  text("Lives: " + Math.round(lives), 10, 30);
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

function Climbers() {

  if (frameCount % 150 === 0) {

    //Create climbers:
    var x = Math.round(random(50, 350))

    climber = createSprite(x, 0, 20, 20);
    climber.velocityY = 2;
    climber.addImage("moving", climberImg);

    climber.lifetime = 370;

    //climber.debug = true;

    climberG.add(climber);

    //Create invisible sprites:
    invi = createSprite(climber.x, climber.y + 15, climber.width, 10);
    invi.velocityY = climber.velocityY;

    //Add invi in invisible group:
    inviG.add(invi);

    //Hide the invi sprites:
    inviG.setVisibleEach(false);

  }
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

function Fire() {
  fire = createSprite(100, 100, 20, 20);
  fire.addImage(fireImg);

  //Make the position of the fire above the Iron Man:
  fire.x = ironMan.x + 10;
  fire.y = ironMan.y - 50;

  //Give velocity to the fire:
  fire.velocityY = -6;

  //Give lifetime & scale to it:
  fire.lifetime = 150;
  fire.scale = 0.5;

  //Add fire to its group:
  fireG.add(fire);
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

function RedFire() {
  if (frameCount % 200 === 0) {
    var red = createSprite(Math.round(random(60, 340)), 0, 10, 10);
    red.addImage(redFireImg);
    red.velocityY = 4;
    red.lifetime = 200;
    red.scale = 0.2;
    //red.debug = true;

    redFireG.add(red);
  }
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

function PinkFire() {
  if (frameCount % 300 === 0) {
    var pink = createSprite(Math.round(random(60, 340)), 0, 10, 10);
    pink.addImage(pinkFireImg);
    pink.velocityY = 4;
    pink.lifetime = 200;
    pink.scale = 0.2;
    //pink.debug = true;

    pinkFireG.add(pink);
  }
}

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

function BlueFire() {
  if (frameCount % 400 === 0) {
    var blue = createSprite(Math.round(random(60, 340)), 0, 10, 10);
    blue.addImage(blueFireImg);
    blue.velocityY = 4;
    blue.lifetime = 200;
    blue.scale = 0.2;
    //blue.debug = true;

    blueFireG.add(blue);
  }
}