function resetJelly() {

  engineJ = Engine.create()
  worldJ = engineJ.world
  Engine.run(engineJ)

  xGrav = 0
  yGrav = 1

  jparticles.splice(jp2)

  fonter()

  for (let i = 0; i < pointsF.length; i++) {
    jpt = pointsF[i]

    let prev2 = null
    for (let y = 10; y < jLength; y += 5) {

      jVar2 = map(jVar, 0, 100, 0, jSizer)

      let varSizer = map(y, 0, jLength, 0, jSizer - jVar2)

      let fixed2 = false
      if (!prev2) {
        fixed2 = true
      }

      if (!jRandomer) {
        jp2 = new jParticle(jpt.x + random(-y, y), jpt.y + random(-y, y), jSizer - varSizer, fixed2)
      } else {
        jp2 = new jParticle(jpt.x + random(-y, y), jpt.y + random(-y, y), jSizer - random(1, jSizer - 1), fixed2)
      }
      // (x, y, r, fixed) 

      jparticles.push(jp2)

      if (prev2) {
        let options = {
          bodyA: jp2.body,
          bodyB: prev2.body,
          length: jSizer * 1.75 + jGaps,
          // chaos : jSizer
          stiffness: 0
        }
        let constraint = Constraint.create(options)
        World.add(worldJ, constraint)
      }
      prev2 = jp2
    }
  }


  canvasmouseJ = Mouse.create(canvas.elt)
  canvasmouseJ.pixelRatio = 2
  World.add(worldJ, canvasmouseJ)
  let options = {
    mouse: canvasmouseJ
  }
  mConstraintJ = MouseConstraint.create(engineJ, options)
  World.add(worldJ, mConstraintJ)

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function jellyChecker() {
  jellyShower()

  for (let jp of jparticles) {
    jp.show()
  }

  if (allChaos === false) {

    chaosify.hideControl("Frenzy")
    chaosify.hideControl("Frequency")

    if (mGrav) {

      jellyGui.hideControl("Gravity X")
      jellyGui.hideControl("Gravity Y")

      if (mouseIsPressed) {
        engineJ.world.gravity.y = 1;
        engineJ.world.gravity.x = 0;
      } else {
        let xer = map(mouseX, 0, width, -1, 1)
        let yer = map(mouseY, 0, height, -1, 1)
        engineJ.world.gravity.y = yer;
        engineJ.world.gravity.x = xer;
      }
    } else if (!mGrav) {

      engineJ.world.gravity.y = yGrav;
      engineJ.world.gravity.x = xGrav;
      jellyGui.showControl("Gravity X")
      jellyGui.showControl("Gravity Y")
    }
  } else if (allChaos === true) {

    chaosify.showControl("Frenzy")
    chaosify.showControl("Frequency")

    let jSin = sin(frameCount / 10 * jFren2) * jFren

    engineJ.world.gravity.y = yGrav;
    engineJ.world.gravity.x = xGrav;
    engineJ.world.gravity.y = jSin
    engineJ.world.gravity.x = jSin
  }
}

function jParticle(x, y, r, fixed) {

  this.r = r
  this.body = Bodies.circle(x, y, this.r, {
    isStatic: fixed
  })
  World.add(worldJ, this.body)

  this.show = function() {
    push()
    translate(this.body.position.x, this.body.position.y)
    rotate(this.body.angle)
    noStroke()
    fill(fillColor)
    ellipse(0, 0, this.r * 2)
    pop()
  }

  this.isOffScreen = function() {
    return (this.body.position.y > height)
  }
  this.removeW = function() {
    World.remove(worldJ, this.body)
  }
}

////////////////////////////////////////////////////////

function jellyGui() {

  jellyGui = QuickSettings.create(0, barHeight, "Jelly")

    .hide()
    .setCollapsible(true)
    .setDraggable(true)
    .setWidth(140)
    .addHTML("TitleJ", "Move the mouse around to attract tentacles")
    .addButton("Randomize", function() {
      jellyRandom()
    })
    .addBoolean("Mouse Gravity", true, function(value) {
      mGrav = value;
      // resetter()
    })
    .addRange("Length", 15, 100, 50, 5, function(value) {
      jLength = value;
      resetter()
    })
    .addRange("Shape Size", 1, 10, 3, 0.5, function(value) {
      jSizer = value;
      resetter()
    })
    .addBoolean("Random", false, function(value) {
      jRandomer = value;
      hideTaper()
      resetter()
    })
    .addRange("Taper", 0, 100, 50, 5, function(value) {
      jVar = map(value, 0, 100, 100, 0);
      resetter()
    })
    .addRange("Gaps", 0, 10, 1, 1, function(value) {
      jGaps = value;
      resetter()
    })
    .addRange("Gravity X", -1, 1, 0, 0.1, function(value) {
      xGrav = value;
      // resetter()
    })
    .addRange("Gravity Y", -1, 1, 1, 0.1, function(value) {
      yGrav = value;
      // resetter()
    })
  .addButton("Reset", function() {
      resetter()
    })
  
  jellyGui.overrideStyle("Reset", 'width', '130px');
  jellyGui.hideTitle("TitleJ")
  jellyGui.overrideStyle("Randomize", 'width', '130px');

}

function hideTaper() {

  if (jRandomer) {
    jellyGui.hideControl("Taper")
  } else {
    jellyGui.showControl("Taper")
  }
}

function jellyRandom() {

  jellyGui.setBoolean("Mouse Gravity", random() >= 0.5)
  jellyGui.setRangeValue("Length", random(15, 50))
  jellyGui.setRangeValue("Shape Size", random(2, 10))
  jellyGui.setBoolean("Random", random() >= 0.5)
  jellyGui.setRangeValue("Taper", random(0, 100))
  jellyGui.setRangeValue("Gaps", random(0, 10))
  control.setRangeValue("Density", random(0.01, 0.10))
  control.setRangeValue("Trail", random(0, 250))

  resetter()
  
  jellyGui.setRangeValue("Gravity X",  random(-1, 1))
  jellyGui.setRangeValue("Gravity Y",  random(-1, 1))
}

let jparticles = []
let jp
let jp2
let jpt
let jtextDensity
let canvasmouseJ
// let pointsJ

let jLength = 50
let jSizer = 3
let jVar = 50
let jRandomer = false
let jGaps = 1
let mGrav = true
let xGrav = 0
let yGrav = 1
let jFren = 1
let jFren2 = 0

let stackJ,
  engineJ,
  worldJ,
  mConstraintJ