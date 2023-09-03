function resetVehicle() {

  nexter = 0
  Rndm = map(shaperboi.getRangeValue("Randomness"), 0, 99, ShapeSize, 0)

  vehicles.splice(vehicle)

  fonter()

  for (let i = 0; i < points.length - nexter; i++) {
    pt = points[i]
    pt2 = points[i + nexter]

    vehicle = new Vehicle(pt.x, pt.y, ShapeSize, pt2.x, pt2.y, Rndm, SW, maxSpeed, maxForce, lineOpacity, lineLength, i, sinSpeed, sinAmt)
    vehicles.push(vehicle)
  }
}

function vehicleChecker() {

  // console.log(movetime)

  if (frameCount % movetime === 0 && staticboi === false) {
    nexter += movespeed
    points.push(points[nexter - movespeed])
  }

  for (let i = 0; i < vehicles.length; i++) {

    if (list1.value() == 'Orbit') {

      shapeChosen()
      switch (shaperboi.getDropDownValue("Shape").value) {
        case 'Circle':
          vehicles[i].show1(i);

          break;
        case 'Square':
          vehicles[i].show2();
          break;
      }
    } else if (list1.value() == 'Mesh') {
      lineChosen()
      vehicles[i].show3();
    }

    if (allChaos === true) {
      vehicleChaosFunction(i)
    } else {
      vehicles[i].behaviors()

    }
    if (frameCount % movetime === 0) {
      for (let i = 0; i < points.length - nexter; i++) {
        pt2 = points[i + nexter]
        vehicles[i].mover(pt2.x, pt2.y)
      }
    }

    vehicles[i].fleeboi()
    vehicles[i].update()
    vehicles[i].edges()

  }
}

function vehicleChaosFunction(i) {

  switch (chaosify.getDropDownValue("Chaos Type").value) {

    case 'Random Force':

      disperse = p5.Vector.random2D()
      vehicles[i].applyForce(disperse)

      chaosify.hideControl("Reverse Gravity")
      break;

    case 'Gravity':

      chaosify.showControl("Reverse Gravity")

      let gravityT = createVector(0, 1)

      if (gravityR === true) {
        gravityT.mult(-1)
        vehicles[i].frictionR()
        vehicles[i].applyForce(gravityT)
      } else {

        vehicles[i].applyForce(gravityT)
        vehicles[i].friction()
      }

      break;

    case 'Liquid':
      chaosify.hideControl("Reverse Gravity")
      vehicles[i].drag()

      break;

  }

}

function shaperGui() {

  shaperboi = QuickSettings.create(0, barHeight, "Orbit")


    .hide()
    .setCollapsible(true)
    .setDraggable(true)
    .setWidth(140)

    .addButton("Randomize", function() {
      orbitRandom()
    })
    .addDropDown("Shape", ["Circle", "Square"])
    .addBoolean("Static", staticboi, function(value) {
      staticboi = value
    })
    .addBoolean("Square Caps", strokeSquarer, function(value) {
      strokeSquarer = value;
      resetter()
    })
    .addBoolean("Sin Wave", sinwWaver, function(value) {
      sinwWaver = value;
      sinWaverboi()
    })
    .addRange("Move Interval", 1, 80, movetime, 1, function(value) {
      movetime = value
    })
    .addRange("Speed", 0, 40, maxSpeed, 0.2, function(value) {
      maxSpeed = value;
      resetter()
    })
    .addRange("Attraction", 1, 10, maxForce, 0.2, function(value) {
      maxForce = value
      resetter()
    })
    .addRange("Shape Size", 1, 30, ShapeSize, 1, function(value) {
      ShapeSize = value;
      resetter()
    })
    .addRange("Randomness", 0, 100, 90, 1, resetter)
    .addRange("Line Length", 0, 1, lineLength, 0.1, function(value) {
      lineLength = value;
      resetter()
    })
    .addRange("Opacity", 0, 255, lineOpacity, 1, function(value) {
      lineOpacity = value
      resetter()
    })
    .addRange("Stroke Weight", 0, 50, SW, 0.1, function(value) {
      SW = value
      resetter()
    })
    .addRange("Sin Speed", 0, 20, sinSpeed, 1, function(value) {
      sinSpeed = value
      resetter()
    })
    .addRange("Sin Amount", 0, 100, sinAmt, 1, function(value) {
      sinAmt = value
      resetter()
    })
    .addButton("Reset", function() {
      resetter()
    })
    .hideControl("Sin Speed")
    .hideControl("Sin Amount")
    .hideControl("Square Caps")

  shaperboi.overrideStyle("Randomize", 'width', '130px');
  shaperboi.overrideStyle("Reset", 'width', '130px');


}

function orbitRandom() {

  shaperboi.setRangeValue("Move Interval", round(random(1, 40)))
  shaperboi.setRangeValue("Speed", random(1, 40))
  shaperboi.setDropDownIndex("Shape", round(random(0, 1)))
  shaperboi.setBoolean("Static", random() >= 0.9)
  shaperboi.setBoolean("Square Caps", random() >= 0.5)
  shaperboi.setBoolean("Sin Wave", random() >= 0.5)
  shaperboi.setRangeValue("Attraction", random(1, 10))
  shaperboi.setRangeValue("Shape Size", random(1, 30))
  shaperboi.setRangeValue("Randomness", random(1, 100))
  shaperboi.setRangeValue("Line Length", random(0.1, 1))
  shaperboi.setRangeValue("Opacity", random(50, 255))
  shaperboi.setRangeValue("Sin Speed", random(1, 20))
  shaperboi.setRangeValue("Sin Amount", random(1, 100))
  control.setRangeValue("Density", random(0.01, 0.10))
  control.setRangeValue("Trail", random(0, 255))

  if (list1.value() == 'Mesh') {
    shaperboi.setRangeValue("Stroke Weight", random(1, 25))
  } else if (list1.value() == 'Orbit') {
    shaperboi.setRangeValue("Stroke Weight", random(0, 5))
  }

  resetter()

}