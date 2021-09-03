const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blinkImg = loadAnimation("blink_1.png", "blink_2.png","blink_3.png")
  eatImg = loadAnimation("eat_1.png", "eat_2.png","eat_3.png", "eat_4.png")
  sadImg = loadAnimation("sad_1.png", "sad_2.png","sad_3.png")
  blinkImg.playing = true
  eatImg.playing = true 
  sadImg.playing = true 
  eatImg.looping = false
  sadImg.looping = false 
  
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  blinkImg.frameDelay = 20
  eatImg.frameDelay = 20
  sadImg.frameDelay = 20
  
  bunny = createSprite(230,620,100,100);
  bunny.addAnimation("blink", blinkImg);
  bunny.addAnimation("eat", eatImg);
  bunny.addAnimation("sad", sadImg);
  bunny.changeAnimation("blink")
  bunny.scale = 0.2;

  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);
   
   if(fruit !== null){
  image(food,fruit.position.x,fruit.position.y,70,70);
   }
  rope.show();
  Engine.update(engine);
  ground.show();
   
  if(collide(fruit, bunny)== true){
    bunny.changeAnimation("eat")
  }
  if(collide(fruit, bunny)== false){
    bunny.changeAnimation("sad")
  }
   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function collide(body, sprite){
  if (body !== null){
   var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
   if(d <= 80 ){
     World.remove(engine.world, fruit)
     fruit = null
     return true
   }
   else{
     return false
   }
  }
}
