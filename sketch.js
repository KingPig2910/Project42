var PLAY;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score;

function preload(){
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg");
  
}



function setup() {
createCanvas(500,500);



  
monkey = createSprite(100,400,20,20);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.1;

ground = createSprite(400,500,900,10);
ground.visible = false;

  
FoodGroup = createGroup();
obstacleGroup = createGroup();

score = 0;
}


function draw() {
background("lightgrey");

stroke("white");
textSize(20);
fill("white");
text("Score: "+ score, 50,50);
if(gameState === PLAY){
  if(keyDown("space") && monkey.y > 200){
    monkey.velocityY = -7.5;
  }
  
  if(FoodGroup.isTouching(monkey)){
    monkey.scale = (monkey.scale + 0.025)
    score = score + 2;
    FoodGroup.destroyEach();
  }
  
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
 
  
food();
obstacles();
drawSprites();
  } 
if(obstacleGroup.isTouching(monkey)){
  obstacleGroup.destroyEach();
  monkey.scale = 0.1;
  score = 0;
  }
}
function food(){
if(frameCount% 80 === 0){
var banana = createSprite(500,290,20,20);
banana.velocityX = -3;
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.y = Math.round(random(150,300));
  
banana.setLifetime = 100;

FoodGroup.add(banana);
  }
}

function obstacles(){
if(frameCount% 150 === 0){
  var obstacle =  createSprite(400,500,20,20);
  obstacle.velocityX = -4;
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.y = 480;  
  obstacle.setLifetime = 100;
  
obstacleGroup.add(obstacle);
  }
}