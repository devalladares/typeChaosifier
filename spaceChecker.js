function resetSpace() {

  engineSp = Engine.create()
  worldSp = engineSp.world
  Engine.run(engineSp)
  Body = Matter.Body;

  boxesSp.splice(BoxSp)
  cometSp.splice(CometSp)
  frameCount = 0

  fonter()

  canvasmouseSp = Mouse.create(canvas.elt)
  canvasmouseSp.pixelRatio = 2
  World.add(worldSp, canvasmouseSp)
  let options = {
    mouse: canvasmouseSp
  }
  mConstraintSp = MouseConstraint.create(engineSp, options)
  World.add(worldSp, mConstraintSp)
}

function spaceChecker() {
  spaceShower()

  worldSp.gravity.scale = gravScaleSp
  engineSp.world.gravity.x = xGravSp
  engineSp.world.gravity.y = yGravSp


  let mouseSpC = new mouseSp(xSp, ySp, 20)

  if (mouseRepel) {
    xSp = mouseX
    ySp = mouseY
  } else {
    xSp = -30
    ySp = -30
  }

  if (frameCount % timespan === 0 && frameCount <= timespan * timeCount) {
    for (let i = 0; i < points.length; i++) {
      let pt = points[i]

      boxesSp.push(new BoxSp(pt.x, pt.y, ballSp))
    }
  }

  for (let i = 0; i < boxesSp.length; i++) {
    boxesSp[i].show()
    if (boxesSp[i].isOffScreen()) {
      boxesSp[i].removeW()
      boxesSp.splice(i, 1)
      i--
    }
  }

  if (allChaos === true) {

    if (frameCount % 30 === 0) {
      cometSp.push(new CometSp(random(width), random(height), random(ballSp * 4)))
    }
    for (let cSp of cometSp) {
      cSp.show()
    }

    for (let i = 0; i < cometSp.length; i++) {
      cometSp[i].show()
      if (cometSp[i].isOffScreen()) {
        cometSp[i].removeW()
        cometSp.splice(i, 1)
        i--
      }
    }
  }
}

function BoxSp(x, y, w, h) {

  this.w = w
  this.body = Bodies.circle(x, y, this.w)
  World.add(worldSp, this.body)

  this.show = function() {

    push()
    // stroke(strokeC.color());
    noStroke()
    fill(fillColor)
    translate(this.body.position.x, this.body.position.y)
    rotate(this.body.angle)
    ellipse(0, 0, this.w * gapSp)
    pop()
  }

  this.isOffScreen = function() {
    return (this.body.position.y > height || this.body.position.x > width || this.body.position.x < 0 || this.body.position.y < 0)
  }
  this.removeW = function() {
    World.remove(worldSp, this.body)
  }
}

function mouseSp(x, y, w) {

  this.w = w
  this.body = Bodies.circle(x, y, this.w)
  World.add(worldSp, this.body)
}

function CometSp(x, y, w) {

  this.w = w
  this.rSp = 0.2
  this.rSpY = random(-this.rSp, this.rSp)
  this.rSpX = random(-this.rSp, this.rSp)

  this.body = Bodies.circle(x, y, this.w * 2)
  World.add(worldSp, this.body)
  Body.applyForce(this.body, {
    x: this.body.position.x,
    y: this.body.position.y
  }, {
    x: this.rSpY,
    y: this.rSpX
  });

  this.show = function() {

    push()
    noStroke()
    fill(fillColor)
    translate(this.body.position.x, this.body.position.y)
    rotate(this.body.angle)
    ellipse(0, 0, this.w * 2)
    pop()
  }

  this.isOffScreen = function() {
    return (this.body.position.y > height || this.body.position.x > width || this.body.position.x < 0 || this.body.position.y < 0)
  }
  this.removeW = function() {
    World.remove(worldSp, this.body)
  }
}

function spacePush() {

  if (list1.value() == 'Space') {
    for (let i = 0; i < points.length; i++) {
      let pt = points[i]
      boxesSp.push(new BoxSp(pt.x, pt.y, ballSp))
    }
  }
}

function spaceGui() {

  spaceGui = QuickSettings.create(0, barHeight, "Space")

    .hide()
    .setCollapsible(true)
    .setDraggable(true)
    .setWidth(140)
    .addHTML("TitleS1", "Move the mouse around to repel objects")
    .addButton("Randomize", function() {
      spaceRandom()
    })

    .addButton("+ Push", function() {
      spacePush()
    })
    .addBoolean("Mouse Repel", true, function(value) {
      mouseRepel = value;
    })

    .addRange("Push Count", 1, 10, 4, 1, function(value) {
      timeCount = value;
      resetter()
    })
    .addRange("Time Interval", 1, 100, 20, 1, function(value) {
      timespan = value;
      resetter()
    })
    .addRange("Ball Size", 1, 30, 10, 1, function(value) {
      ballSp = value;
      resetter()
    })
    .addRange("Tightness", 0.1, 2, 1.25, 0.1, function(value) {
      gapSp = value;
      resetter()
    })
  .addButton("Reset", function() {
      resetter()
    })

  spaceGui.hideTitle("TitleS1")
  spaceGui.overrideStyle("+ Push", 'width', '130px');
  spaceGui.overrideStyle("Randomize", 'width', '130px');
  spaceGui.overrideStyle("Reset", 'width', '130px');


}

function spaceRandom() {

  spaceGui.setBoolean("Mouse Repel", random() >= 0.5)
  spaceGui.setRangeValue("Push Count", random(1, 7))
  spaceGui.setRangeValue("Time Interval", random(1, 80))
  spaceGui.setRangeValue("Ball Size", random(3, 30))
  spaceGui.setRangeValue("Tightness", random(0.1, 2))


  control.setRangeValue("Density", random(0.01, 0.10))
  control.setRangeValue("Trail", random(0, 250))
  resetter()
  
}




let xSp = -30
let ySp = -30

let cometSp = []
let boxesSp = []
let groundsSp = []
let oq = 255
let timespan = 20
let timeCount = 4
let gravScaleSp = 0.000
let xGravSp
let yGravSp
let ballSp = 10
let gapSp = 1.25
let canvasmouseSp
let mouseRepel = true

///////////////////////////////
let stackSp,
  engineSp,
  worldSp,
  mConstraintSp