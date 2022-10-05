var bg,bgImg;
var player, shooterImg, shooter_shooting, shooterImg1;
var monster, monsterImg, monsterGroup;
var vida = 3 
var heartImg1, heartImg2, heartImg3;
var heart1, heart2, heart3;

var bullets = 90;
var gameState = "fight";
var bulletGroup;
var bulletImg;
var bullet;


function preload(){
  
  shooterImg1 = loadImage("assets/Kstop-removebg-preview.png")
  shooterImg = loadAnimation("assets/K1-removebg-preview.png", "assets/K2-removebg-preview.png", "assets/K3-removebg-preview.png", "assets/K4-removebg-preview.png", "assets/K5-removebg-preview.png", "assets/K6-removebg-preview.png", "assets/K7-removebg-preview.png", "assets/K8-removebg-preview.png", "assets/K9-removebg-preview.png", "assets/K10-removebg-preview.png" )
  shooter_shooting = loadImage("assets/Kattack-removebg-preview.png")
  heartImg1 = loadImage ("assets/heart_1.png");
  heartImg2 = loadImage ("assets/heart_2.png");
  heartImg3 = loadImage ("assets/heart_3.png");
  monsterImg = loadAnimation ("assets/scarfy1-removebg-preview.png","assets/scarfy2-removebg-preview.png","assets/scarfy3-removebg-preview.png");
  bulletImg = loadImage("assets/tiro-removebg-preview.png");

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage("parado" ,shooterImg1)
  player.addAnimation("andando" ,shooterImg)
  player.addImage("atirando", shooter_shooting)
  player.scale = 3.5

  heart1 = createSprite(displayWidth-150, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heartImg1);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2", heartImg2);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150, 40, 20, 20);
  heart3.addImage("heart3", heartImg3);
  heart3.scale = 0.4;
 
  player.debug = true
  //player.debug = false
  //player.Debug =false
  //Player.debug = true

  //player.Collider("rectagle",0,0,300,300)
  //player.setcollider("rectangle",0,0)
  player.setCollider("rectangle",0,0,20,20)
  //player.Setcollider("rectangle",0,0,300,300)

  monsterGroup = new Group()
  bulletGroup = new Group()

}

function draw() {
  background(0); 

  if(vida===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(vida===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(vida===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }
 //ir para gameState (estado do jogo) "você perdeu" quando restar 0 vidas
  if(vida === 0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    player.destroy();
    gameState = "lost";
  }
 
  if(gameState=== "fight"){

  
  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("UP_ARROW")||touches.length>0){
    player.changeAnimation("andando" ,shooterImg)
    player.y = player.y-20
    
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.changeAnimation("andando" ,shooterImg)
    player.y = player.y+20
  }

  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.changeAnimation("andando" ,shooterImg)
    player.x = player.x+20
    }

     if(keyDown("LEFT_ARROW")||touches.length>0){
      player.changeAnimation("andando" ,shooterImg)
      player.x = player.x-20
  }



//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  if(keyWentDown("E")){
  
    //player.addImage(shooter_shooting)
    player.changeAnimation("atirando", shooter_shooting)
    bullet = createSprite ( displayWidth -1150, player.y-30,20,20)
    bullet.addImage ("tiro", bulletImg);
    bullet.scale = 1
    bullet.velocityX = 20

    bulletGroup.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth + 2
    bullets = bullets -1
  
  }

//player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("E")){
  //player.addImage( shooter_shooting )
  //player.addImage()
  player.changeAnimation("parado" ,shooterImg1)
  //player.addImage(shooter_1.png)
  }

  if(bullets===0){
    gameState = "bullet"
  }

  if(monsterGroup.isTouching(bulletGroup)){
    for(var i=0; i<monsterGroup.length; i++){
      if(monsterGroup[i].isTouching(bulletGroup)){
        monsterGroup[i].destroy();
        bulletGroup.destroyEach();
      }
    }
  }


  if(monsterGroup.isTouching(player)){
    for(var i=0; i<monsterGroup.length; i++){
      if(monsterGroup[i].isTouching(player)){
        monsterGroup[i].destroy();
        vida = vida - 1
      }
    }
  }


  enemy();
}
drawSprites();

text("Vidas: " + vida,displayWidth-200, displayHeight/2-280)

if(gameState==="lost"){
  textSize(100);
  fill("white");
  text("Você perdeu :(", 400,400);
  monsterGroup.destroyEach();
  player.destroy();

} else if (gameState==="bullet"){
  textSize(100);
  fill("white");
  text("Você ficou sem balas ", 400,400);
  monsterGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}

}

function enemy(){

  if(frameCount%50 ===0){
    monster = createSprite(random(500,1100), random(100,500), 40, 40)

    monster.addAnimation("monstro", monsterImg);
    monster.scale= 3;
    monster.velocityX = -3;
    //monster.velocityY = -3;
    

    monster.debug= true;
    monster.setCollider("rectangle", 0,0,20,20);
    monster.lifetime = 400
    monsterGroup.add(monster);

  } 
   
  
  
}
