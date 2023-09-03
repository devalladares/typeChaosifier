/////////////////////// MOBILE DETECTOR ////////////////////////

let mainText
let TextSize
let barHeight

let isMobile = screen.width < screen.height;

if (isMobile) {
  mainText = "a"
  TextSize = 500
  barHeight = 400
} else {
  mainText = "tC"
  // mainText = "a"
  TextSize = 750
  barHeight = 430
}

/////////////////////// LIST CHOICE MAIN ////////////////////////

function gui() {

  list1 = createSelect("Form");
  list1.option('Fractals');
  list1.option('Jellyfish');
  list1.option('Mesh');
  list1.option('Orbit');
  list1.option('Particles');
  list1.option('Rain');
  list1.option('Space');
  list1.option('Swarm');

  list1.position(windowWidth / 2 - 65, 0);
  list1.size(140, 25);
  list1.style("height", "40px");
  list1.style("background", "#fff,0");

  list1.selected('Orbit');
  // list1.selected('Mesh');
  // list1.selected('Fractals');
  // list1.selected('Particles');
  // list1.selected('Jellyfish');
  // list1.selected('Rain');
  // list1.selected('Space');
  // list1.selected('Swarm');


  /////////////////////// CONTROL //////////////////////// 
  /////////////////////// CONTROL //////////////////////// 
  /////////////////////// CONTROL //////////////////////// 
  /////////////////////// CONTROL //////////////////////// 
  /////////////////////// CONTROL //////////////////////// 
  /////////////////////// CONTROL //////////////////////// 


  fAngle = PI / 8
  textAlign(LEFT, CENTER)
  rectMode(CENTER)

  QuickSettings.useExtStyleSheet()
  control = QuickSettings.create(0, 0, "Control")

    .setCollapsible(true)
    .setDraggable(true)
    .setWidth(140)
    .show()
    // .addTime("time", new Date())
    // .addProgressBar("progress", 100, 75, "percent")
    // .addTextArea("text area", "whatever")
    // .addDate("date", new Date())
    // .addColor("mate", "#ff0000")
    // .addFileChooser("file chooser", "upload a font (.otf or .ttf)", "font/*")
    .addButton("About", function() {
      info.toggleVisibility()
      // linkShower()
    })
    .addText("Text", mainText, resetter)
    .addDropDown("Font", ["Apercu", "Eczar", "Graphik", "Space Mono", "Sharp Grotesk", "Gotu"], resetter)
    .addRange("Text Size", 20, 1500, TextSize, 1, function(value) {
      TextSize = value;
      resetter()
    })
    .addButton("Adjust Text Position", function() {
      adjustPos = false
      textPosition.toggleVisibility("Text Position")
    })
    .addButton("Adjust Color", function() {
      adjustCol = false
      colorboi.toggleVisibility("Text Color")
    })
    .addRange("Density", 0.01, 0.15, textDensity, 0.01, function(value) {
      textDensity = value;
      resetter()
    })
    .addRange("Trail", 0, 255, 0, 1, function(value) {
      tAlpha = map(value, 0, 255, 255, 0);
      tAlpha2 = map(value, 0, 255, 255, 0);
      resetter()
    })
    .addButton("Save Frame", function() {
      // saveCanvas(gd.timestamp(), 'png');
      save(canvas, "Type_Chaosifier_" + frameCount)
    })

  ////////////////////////////  LINK HIDER ////////////////////////////
  ////////////////////////////  LINK HIDER ////////////////////////////
  ////////////////////////////  LINK HIDER ////////////////////////////



  // let nameText = createP('Created by <a href="https://www.valladares.dev/">Dev Valladares</a> · <a href="https://www.instagram.com/devethanvalladares/"> Instagram </a> · <a href="https://www.valladares.dev/type-chaosifier-mobile"> Mobile Version </a> · <a href="https://padlet.com/dvalladares1/chaosifier"> Submit your creation! </a>')

  let nameText = createP('Designed & coded with joy by <a href="https://www.instagram.com/devethanvalladares/"> Dev Valladares</a>')

  // nameText.position((windowWidth / 2) , windowHeight - 40)
  nameText.position((windowWidth / 2) - 125, windowHeight - 40)
  nameText.style('font-size', '12px')
  nameText.style('font-family', 'Martel', 'center')
  nameText.style('font-color', 'grey')
  nameText.style('color', 'grey')

  nameText.style('text-align', 'center')


  ////////////////////////////  INFO ////////////////////////////
  ////////////////////////////  INFO ////////////////////////////
  ////////////////////////////  INFO ////////////////////////////




  info = QuickSettings.create(141, 35, "typeChaosifier")
    .hide()
    .setWidth(140)
    .setWidth(300)
    .addHTML("type Chaosifier", "Generative typography meets order, chaos and the laws of physics: <u> typeChaosifier </u> is an interactive typographic piece by Dev Ethan Valladares. </br></br> Use the <u>Control</u> panels on the left to tweak parameters, and the <u>Chaos</u> panel on the right to let go. </br> Use the <u>Phenomena</u> panel at the top to change the module.</br></br> Much grattitude to Dan Shiffman, the godfather of coding tutorials. Licensed under CC BY-NC 4.0")
    // .addImage("", "https://i.imgur.com/aTtX3fS.png")
    .addImage("", "https://media2.giphy.com/media/LI5TBeR7yHgIsxMCy9/giphy.gif")

  button2 = createButton("Control");
  button2.mousePressed(Control);
  button2.position(0, 0);
  button2.size(140, 25);
  button2.style("height", "40px");
  button2.hide()
  info.hideTitle("type Chaosifier")



  //////////////////////////// POSITION ////////////////////////////
  //////////////////////////// POSITION ////////////////////////////
  //////////////////////////// POSITION ////////////////////////////

  textPosition = QuickSettings.create(140.5, 160, "Text Position")
    .hide()
    .setGlobalChangeHandler(resetter)
    .setWidth(140)
    .addRange("x Position", -windowWidth, windowWidth, 0, 1, function(value) {
      pX = value
    })
    .addRange("y Position", -windowHeight, windowHeight, 0, 1, function(value) {
      pY = value
    })

  //////////////////////////// COLORBOI ////////////////////////////

  bgColor = random(cbois)

  colorboi = QuickSettings.create(140.5, 190, "Color")
    .hide()
    .setGlobalChangeHandler(resetter)
    // .setWidth(141)
    .addColor("Fill Color", fillColor, function(color) {
      fillColor = color;
    })
    .addColor("Stroke Color", strokeColor, function(color) {
      strokeColor = color;
    })
    .addColor("Background Color", bgColor, function(color) {
      bgColor = color;
    });

  control.overrideStyle("Adjust Text Position", 'width', '130px');
  control.overrideStyle("Adjust Color", 'width', '130px');


  //////////////////////////// ACTIVATE ////////////////////////////
  //////////////////////////// ACTIVATE ////////////////////////////
  //////////////////////////// ACTIVATE ////////////////////////////
  //////////////////////////// ACTIVATE ////////////////////////////
  //////////////////////////// ACTIVATE ////////////////////////////

  particleGui()
  jellyGui()
  rainGui()
  spaceGui()
  swarmGui()
  fractalGui()
  shaperGui()

  //////////////////////////// CHAOSIFY ////////////////////////////
  //////////////////////////// CHAOSIFY ////////////////////////////
  //////////////////////////// CHAOSIFY ////////////////////////////
  //////////////////////////// CHAOSIFY ////////////////////////////
  //////////////////////////// CHAOSIFY ////////////////////////////

  chaosify = QuickSettings.create(windowWidth - 142, 0, "Chaos")
    .setWidth(140)
    .hide()

    .addDropDown("Chaos Type", ["Random Force", "Gravity", "Liquid"], function(value) {
      if (value) {
        chaosify.enableControl("CHAOS");
      } else {
        chaosify.disableControl("CHAOS");
      }
    })
    .addBoolean("Reverse Gravity", false, function(value) {
      gravityR = value;
    })
    .addBoolean("Mouse", false, function(value) {
      mouser = value;
      mouserboi()
    })
    .addButton("Mouse Love", function() {
      mouselove = false;
      mouseLoverboi()
    })
    .addButton("Mouse Fear", function() {
      mouselove = true
      mouseFearboi()
    })
    .addBoolean("Leaves Only", false, function(value) {
      leavesOnly = value;
    })
    .addRange("Frenzy", 0, 10, 1, 1, function(value) {
      jFren = value;
      resetter()
    })
    .addRange("Frequency", 0, 10, 0, 1, function(value) {
      jFren2 = value;
      resetter()
    })
    .addRange("Rain Size", 1, 20, 10, 1, function(value) {
      rSize = value;
    })

    .hideControl("Mouse Love")
    .hideControl("Mouse Fear")
    .hideControl("Reverse Gravity")
    .hideControl("Leaves Only")
    .hideControl("Frenzy")
    .hideControl("Rain Size")

  chaosify.overrideStyle("Mouse Love", 'background-color', '#ffc3bf');
  chaosify.overrideStyle("Mouse Love", 'width', '130px');
  chaosify.overrideStyle("Mouse Fear", 'background-color', '#b3c1ff');
  chaosify.overrideStyle("Mouse Fear", 'width', '130px');

  // control.overrideStyle("About", 'width', '130px');
  // control.overrideStyle("About", 'background-color', '#eeeeee');

  button1 = createButton("Chaos");
  button1.mousePressed(Chaosify);
  button1.position(windowWidth - 142, 0);
  button1.size(142, 25);
  button1.style("height", "40px");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HIDERS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HIDERS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HIDERS ///////////////////////////////////////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HIDERS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HIDERS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HIDERS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function shapeChosen() {

  hideControls()
  shaperboi.show()
  chaosify.showControl("Chaos Type")
  chaosify.showControl("Mouse")

  shaperboi.hideControl("Line Length")
  shaperboi.showControl("Shape Size")
  shaperboi.showControl("Randomness")
  shaperboi.showControl("Shape")
  shaperboi.hideControl("Square Caps")
  shaperboi.hideControl("Opacity")

}

function lineChosen() {

  hideControls()
  shaperboi.show()

  shaperboi.hideControl("Shape Size")
  shaperboi.hideControl("Randomness")
  shaperboi.hideControl("Shape")
  shaperboi.showControl("Square Caps")
  shaperboi.showControl("Opacity")


  shaperboi.showControl("Line Length")

  chaosify.showControl("Chaos Type")
  chaosify.showControl("Mouse")

}

function fractalgui() {

  hideControls()
  fractals.show()

  if (leaveBois === false) {
    fractals.hideControl("Leaf Stroke")
  }
}

function particleShower() {

  hideControls()
  particlegui.show()

  if (leaveBois === false) {
    fractals.hideControl("Leaf Stroke")
  }
}

function jellyShower() {

  hideControls()
  jellyGui.show()

}

function rainShower() {

  hideControls()
  rainGui.show()
}

function spaceShower() {

  hideControls()
  spaceGui.show()

}

function swarmShower() {

  hideControls()
  swarmGui.show()

}

function keyPressed() {



}

///////// HIDE CONTROLS ////////////
///////// HIDE CONTROLS ////////////
///////// HIDE CONTROLS ////////////
///////// HIDE CONTROLS ////////////
///////// HIDE CONTROLS ////////////
///////// HIDE CONTROLS ////////////
///////// HIDE CONTROLS ////////////
///////// HIDE CONTROLS ////////////
///////// HIDE CONTROLS ////////////


function hideControls() {

  jellyGui.hide()
  particlegui.hide()
  // particlegui.collapse()
  fractals.hide()
  shaperboi.hide()
  rainGui.hide()
  spaceGui.hide()
  swarmGui.hide()


  hideChaosify()
}

function hideChaosify() {

  chaosify.hideControl("Chaos Type")
  chaosify.hideControl("Mouse")
  chaosify.hideControl("Frenzy")
  chaosify.hideControl("Frequency")
  // chaosify.hideControl("Leaves Only")

}

function Chaosify() {
  control.toggleVisibility()
  button1.hide()
  button2.show()

  textPosition.hide()
  // colorboi.hide()

  chaosify.toggleVisibility()
  allChaos = true
}

function Control() {
  control.toggleVisibility()
  button2.hide()
  button1.show()
  chaosify.toggleVisibility()
  allChaos = false
  mouser = false
  hideChaosify()
  chaosify.setBoolean("Mouse", false)
}

function Linerboi() {
  control.toggleVisibility()
  button2.hide()
  button1.show()
  chaosify.toggleVisibility()
  vehicleChaos = false
}

function sinWaverboi() {
  if (sinwWaver === false) {
    shaperboi.hideControl("Sin Speed")
    shaperboi.hideControl("Sin Amount")
  } else {
    shaperboi.showControl("Sin Speed")
    shaperboi.showControl("Sin Amount")
  }
}

function mouserboi() {
  if (mouser === false) {
    chaosify.hideControl("Mouse Love")
  } else {
    chaosify.showControl("Mouse Love")
  }
}

function mouseLoverboi() {
  chaosify.hideControl("Mouse Love")
  chaosify.showControl("Mouse Fear")
}

function mouseFearboi() {
  chaosify.showControl("Mouse Love")
  chaosify.hideControl("Mouse Fear")
}


//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////
//////////////////////////// VARIABLES //////////////////////////



let font;
let vehicles = []
let pX = 0
let pY = 0
let b = 230
let control;
let info
let checkers
let pt1, pt2
let nexter = 0
let nexter2 = 0
let points = []
let pointsF = []
let adder = 1
let vehicle
let staticboi = false
let movespeed = 1
let movetime = 20
let moveInterval = 20
let maxSpeed = 15
let maxForce = 7
let allChaos = false
let disperse
let gravity
let gravityR
let liquidD
let textDensity = 0.05
let leaveBois = false
let leavesOnly = false
let adjustPos
let shaperboi
let strokeSquarer2 = true

let fillC, strokeC, bgC

let fillColor = "#ffffff"
let strokeColor = "rgb(0, 0, 0)"
let bgColor
let cbois = ['#bcfcb6', '#c193b8', '#d8cebe', '#f3f9cf', '#e4eedc', '#deebd3', '#d6bd3d', '#eaefa7', '#d4eba3', '#56dc90', '#c6e9cf', '#ef8a73', '#d2ceb5', '#a0fbd5', '#aae4c9', '#fdbaa4', '#d7e9da', '#3efa9f', '#0eedc4', '#c7facb', '#e5d4ef', '#fb8655', '#a1fbc6', '#fa651a', '#f1bf2a', '#f8a239', '#f7c914', '#fb6e3b', '#5bfcd6', '#fc6818', '#a2a0ea', '#596bf2', '#9d95c7', '#cfdfef', '#cad4da'];

let chaosify
let formChooser = true
let list1
let lineOpacity = 50
let strokeSquarer = true
let lineLength = 1
let sinwWaver = false
let sinSpeed = 10
let sinAmt = 50
let ShapeSize = 10
let Rndm = 90
let SW = 1.5
let resetterboi = false
let fAngle
let mouselove = true
let mousehate = false
let fLayers = 5
let adjustCol = false

let SWF = 2
let lineOpacityF = 100
let multer = 0.6
let mouser = false
let canvas
let tAlpha = 255
let tAlpha2 = 255

//////////////////////////// MATTER .JS //////////////////////////

let Engine = Matter.Engine
let EngineClear = Matter.Engine.clear
let World = Matter.World
let Bodies = Matter.Bodies
// let Body = Matter.Body
let Constraint = Matter.Constraint
let MouseConstraint = Matter.MouseConstraint
let Mouse = Matter.Mouse
let Composites = Matter.Composites
let engine
let world
let mConstraint
let canvasmouse
let engineClear

let Composite = Matter.Composite
let Common = Matter.Common

let pWebsite, pInsta


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// PRELOAD //////////////////////////

function preload() {
  font = loadFont('1apercu.otf') //gro
  font2 = loadFont('2eczar.ttf') //serif

  font3 = loadFont('3graphik.otf') //light
  font4 = loadFont('4space.ttf') //mono
  font5 = loadFont('SharpGrotesk-Medium25.otf') //ex
  font6 = loadFont('6gotu.ttf') //hindi
}

//////////////////////////// RESETTER /////////////////////////////

function resetter() {

  mResetter()
  clear()

  if (list1.value() == 'Particles') {
    resetParticle()
  } else if (list1.value() == 'Mesh' || list1.value() == 'Orbit') {
    resetVehicle()
  } else if (list1.value() == 'Fractals') {
    resetBranch()
  } else if (list1.value() == 'Jellyfish') {
    resetJelly()
  } else if (list1.value() == 'Rain') {
    resetRain()
  } else if (list1.value() == 'Space') {
    resetSpace()
  } else if (list1.value() == 'Swarm') {
    resetSwarm()
  }

  resetterboi = true
}

//////////////////////////// MATTER RESETTER /////////////////////////////

function mResetter() {

  event.preventDefault();
  World.clear(worldSp);
  Engine.clear(engineSp);
  World.clear(worldR);
  Engine.clear(engineR);
  World.clear(worldJ);
  Engine.clear(engineJ);

}