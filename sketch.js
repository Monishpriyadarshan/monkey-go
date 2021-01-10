var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score;

function preload(){ 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  ground = createSprite(400,350,900,10);
  ground.velocity.x = -4;
  ground.x = ground.width/2;

score = 0;  
}


function draw() {
background("green");
  
  fill("blue");
  textSize(20);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    ground.velocityX = -(4 + 3* score/100);
   score = score + Math.round(getFrameRate()/60);
  }
    
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground)
  
  if(obstacleGroup.isTouching(monkey)){
        gameState = END;
      
    }
   else if (gameState === END) {
   obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
   }
  spawnObstacles();
  spawnbanana();
  
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(350,300,40,10);
    obstacle.y = Math.round(random(350,300));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}
