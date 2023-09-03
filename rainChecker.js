function resetRain() {

  engineR = Engine.create()
  worldR = engineR.world
  Engine.run(engineR)
  // Composites = Matter.Composites
  // Composite = Matter.Composite
  // Common = Matter.Common
  Body = Matter.Body;

  groundsR.splice(Ground)
  boxesR.splice(Circle)

  fonter()

  for (let i = 0; i < points.length; i++) {
    let pt = points[i]


    groundsR.push(new Ground(pt.x, pt.y, bSize))

  }

  let canvasmouseR = Mouse.create(canvas.elt)
  canvasmouseR.pixelRatio = 2
  World.add(worldR, canvasmouseR)
  let options = {
    mouse: canvasmouseR
  }
  mConstraintR = MouseConstraint.create(engineR, options)
  World.add(worldR, mConstraintR)
}


function rainChecker() {
  rainShower()

  engineR.world.gravity.y = yGrav;
  engineR.world.gravity.x = xGrav;
  engineR.world.gravity.scale = gravScale


  if (allChaos) {

    boxesR.push(new Circle(random(width), -20, random(rSize)))
    boxesR.push(new Circle(random(width), -20, random(rSize)))
    boxesR.push(new Circle(random(width), -20, random(rSize)))
    boxesR.push(new Circle(random(width), -20, random(rSize)))

    chaosify.showControl("Rain Size")

  } else {

    chaosify.hideControl("Rain Size")
  }

  if (mRain) {
    boxesR.push(new Circle(mouseX, mouseY, random(mSize)))
  }

  for (let box1 of boxesR) {
    box1.show()
  }
  for (let ground2 of groundsR) {
    ground2.show()
  }

  for (let i = 0; i < boxesR.length; i += 5) {
    boxesR[i].show()
    if (boxesR[i].isOffScreen()) {
      boxesR[i].removeW()
      boxesR.splice(i, 1)
      i--
    }
  }
}

function Circle(x, y, r) {

  this.r = r
  this.body = Bodies.circle(x, y, this.r)
  World.add(worldR, this.body)

  this.show = function() {

    push()
    translate(this.body.position.x, this.body.position.y)
    rotate(this.body.angle)
    stroke(strokeColor)
    fill(fillColor)

    if (bStroke) {
      strokeWeight(rStroke)
    } else {
      noStroke()
    }
    circle(0, 0, this.r * 2)
    pop()
  }

  this.isOffScreen = function() {
    return (this.body.position.y > height || this.body.position.y < -25 || this.body.position.x > width || this.body.position.x < 0)
  }
  this.removeW = function() {
    World.remove(worldR, this.body)
  }
}

function Ground(x, y, w, h) {

  this.w = w
  this.h = h

  this.body = Bodies.circle(x, y, this.w, {
    isStatic: sss
  })

  World.add(worldR, this.body)

  this.show = function() {


    push()
    translate(this.body.position.x, this.body.position.y)
    noStroke()
    stroke(strokeColor);
    fill(fillColor)
    if (bStroke) {
      strokeWeight(rStroke)
    } else {
      noStroke()
    }
    ellipse(0, 0, this.w * 2)
    pop()
  }
}

function rainGui() {

  rainGui = QuickSettings.create(0, barHeight, "Rain")

    .setCollapsible(true)
    .setDraggable(true)
    .setWidth(140)
    .addHTML("TitleR", "Drag the mouse around to create rain.")
    .hide()
    .addButton("Randomize", function() {
      rainRandom()
    })
    .addBoolean("Mouse Rain", true, function(value) {
      mRain = value;
    })
    // .addBoolean("Sky Rain", false, function(value) {
    //   rainBall = value;
    // })
    .addRange("Ball Size", 1, 20, 10, 1, function(value) {
      bSize = value;
      resetter()
    })
    .addRange("Stroke Weight", 0, 5, 2, 0.5, function(value) {
      rStroke = value;
    })
    .addRange("Mouse Rain Size", 1, 40, 20, 1, function(value) {
      mSize = value;
    })
    .addRange("Gravity Scale", -0.0005, 0.0005, 0.001, 0.00005, function(value) {
      gravScale = value;
    })
    .addRange("Gravity X", -1, 1, 0, 0.1, function(value) {
      xGrav = value;
    })
    .addRange("Gravity Y", -1, 1, 1, 0.1, function(value) {
      yGrav = value;
    })
  .addButton("Reset", function() {
      resetter()
    })
  
  
  rainGui.overrideStyle("Reset", 'width', '130px');
  rainGui.hideTitle("TitleR")
  rainGui.overrideStyle("Randomize", 'width', '130px');

}

function rainRandom() {

  // rainGui.setBoolean("Mouse Rain", random() >= 0.5)
  rainGui.setRangeValue("Ball Size", random(1, 20))
  rainGui.setRangeValue("Stroke Weight", random(0, 5))
  rainGui.setRangeValue("Mouse Rain Size", random(1, 40))

  control.setRangeValue("Density", random(0.01, 0.10))
  control.setRangeValue("Trail", random(0, 250))
  resetter()

  rainGui.setRangeValue("Gravity Scale", random(-0.0005, 0.0005))
  rainGui.setRangeValue("Gravity X", random(-1, 1))
  rainGui.setRangeValue("Gravity Y", random(-1, 1))

}

let sss = true
let timeScaleTarget = 1
let counter = 0;
let boxesR = []
let groundsR = []
let rSize = 10
let bSize = 10
let mSize = 20
let mRain = true
let rainBall = false
let rStroke = 2
let SW1 = 1
let bStroke = true
let gravScale = 0.001
// let colorPicker;
let stackR,
  engineR,
  worldR,
  mConstraintR