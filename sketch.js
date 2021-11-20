var witchImage,witch;
var girlImage,girl;
var backgroundImage, background;
var grassImage,grass;
var shootImage,shoot;
var treeImage,tree;
var scl = 1;
var houseImage,house;

var gameState = "play";
var gameoverImage, gameover;
var resetImage, reset;

var laserSound;
var laughSound;
var backgroundSound;

var shots,chk = 0;
var score = 0,hit = 0;

function preload() {
  
  girlImage = loadAnimation("rf1.png","rf2.png","rf3.png","rf4.png","rf5.png","rf6.png","rf7.png","rf8.png","rf9.png","rf10.png");
  
  witchImage = loadAnimation("w1.png","w2.png","w3.png","w4.png","w5.png","w6.png","w7.png","w8.png","w9.png","w10.png","w11.png","w12.png");
  
  backgroundImage = loadImage("bkgrd.jpg");
  grassImage = loadImage("grass2.png");
  shootImage = loadImage("LA.png");
  treeImage = loadImage("tree1.png");
  houseImage = loadImage("house.png");
  gameoverImage = loadImage("gameover.png");
  resetImage = loadImage("reset-button-png.png");

  laserSound = loadSound("Comet-SoundBible.com-1256431940.wav");
  laughSound = loadSound("cackle3.wav");
  backgroundSound = loadSound("evil_and_horror.mp3");

 }

function setup() {
  createCanvas(600, 300);
 
  background = createSprite(width/2,height/2,600,300);
  background.addImage(backgroundImage);
  
  house = createSprite(400,200,20,20);
  house.addImage(houseImage);
  house.velocityX = -5;
  house.lifetime = 100;
    
  cgrd=createSprite(300,300,600,10);
  cgrd.visible = false;
  
  witch=createSprite(70,220,20,20);
  witch.addAnimation("witch",witchImage);
  witch.scale = 0.5;
  
  girl=createSprite(250,240,20,20);
  girl.addAnimation("girl",girlImage);
  girl.scale = 0.28;
  girl.debug = false;
  girl.setCollider("rectangle",0,0,70,350)
  
  ground = createSprite(0,295,20,20);
  ground.addImage(grassImage);
  ground.scale = 0.4;
  
  gameover = createSprite(width/2,height/2-50,20,20);
  gameover.addImage(gameoverImage);
  gameover.visible = false;
  
  reset = createSprite(width/2,height/2+50,20,20);
  reset.addImage(resetImage);
  reset.scale = 0.2;
  reset.visible = false;
  
  backgroundSound.loop();
  
  shots = new Group();
  fill(255); 
}

function draw() {
   
  if(gameState === "play"){
  ground.velocityX = -4;
  if(ground.x<0){
    ground.x = 300;
  }
  if(frameCount%20===0){
    trees();
  }
  girl.collide(cgrd);
  if(keyDown("up")&& girl.y>200){
    girl.velocityY = -8;
  }
  witch.y = girl.y -30;
  girl.velocityY = girl.velocityY +0.3;
  
  chk = Math.round(random(120,180));
  if(frameCount%chk===0){
    shot();
    laserSound.play();
  }
  
  if(frameCount%300===0){
    laughSound.play();
  }  
  hits();
    if(hit===5){
      gameState = "end";
      witch.y = 400;
      girl.y = 400;
      shots.destroyEach();
      gameover.visible = true;
      backgroundSound.pause();
      reset.visible = true;
    }
    drawSprites();
    text("Score : "+score,500,50);
    text("Hits : "+hit,50,50);
   }
   if(gameState === "end"){
      Reset();
   } 
}

function trees() {
  tree = createSprite(610,250,20,20);
  tree.addImage(treeImage);
  scl = Math.round(random(1,3));
  if(scl===1){
    tree.scale = 0.2;
    tree.y = 235;
  }
  else if(scl===2){
    tree.scale = 0.3;
    tree.y = 210;
  }
  else if(scl===3){
    tree.scale = 0.4;
     tree.y = 180;
  }
  tree.depth = background.depth +1;
  tree.velocityX = -5;
  tree.lifetime = 130;
}
function shot() {
  shoot = createSprite(100,witch.y+30,20,20);
  shoot.addImage(shootImage);
  shoot.scale = 0.1;
  shoot.depth = witch.depth -1;
  shoot.depth = tree.depth +1;
  shoot.velocityX = 3;
  shoot.lifetime = 170;
  shots.add(shoot);
}
function hits()
{
  for(i = 0;i < shots.length;i++)
  {
   if(shots[i].isTouching(girl))
   {
     shots[i].destroy();
     hit = hit +1;
    }
  }
} 

function Reset()
{
  if(mousePressedOver(reset))
  {
     if(mouseDown("leftButton"))
     {
       gameState = "play";
       witch.y = 220;
       girl.y = 240;
       gameover.visible = false;
       reset.visible = false;
       score = 0;
       hit = 0;
       backgroundSound.loop();
     }    
  }
}
