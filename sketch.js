//Create variables here
var dog, foodS, foodStock;
var dog_normalImage, dog_happyImage;
var database;

function preload()
{
  dog_happyImage = loadImage("images/dogImg1.png");
  dog_normalImage = loadImage("images/dogImg.png");
	//load images here
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
 
  dog = createSprite(250,250);
  dog.addImage(dog_normalImage);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);
  //rectMode(CENTER);
  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
    dog.changeImage(dog_happyImage);
  }

  drawSprites();

  textSize(20);
  fill("cyan");
  stroke("cyan");
  text("Food remaining : "+ foodS, 130, 480);

  textSize(20);
  fill("cyan");
  stroke("cyan");
  text("Note : Press UP_ARROW Key To Feed Drago Milk!",30, 30);
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  //ma'am can you please explain this line to me in the next class
  database.ref('Food').update({
    Food:x 
  })
}




