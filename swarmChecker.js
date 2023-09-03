function resetSwarm() {

  vehiclesSwarm.splice(VehicleSwarm)

  fonter()

  for (let i = 0; i < pointsFl.length; i++) {
    let pt = pointsFl[i]

    newPath(pt.x, pt.y);
  }

  for (let i = 0; i < creatures; i++) {
    newVehicleSwarm(random(width), random(height));
  }
}

function newPath() {

  path = new Path();

  for (let i = 0; i < pointsFl.length; i++) {
    let pt = pointsFl[i]

    path.addPoint(pt.x, pt.y);
  }
}


function swarmChecker() {
  swarmShower()

  for (let v of vehiclesSwarm) {
    v.applyBehaviors(vehiclesSwarm, path);
    v.run();
  }
}

function newVehicleSwarm(x, y) {
  let maxspeed = random(speedFl, speedFl / 2);
  let maxforce = attrFl;
  vehiclesSwarm.push(new VehicleSwarm(x, y, maxspeed, maxforce));
}

function mouseDragged() {
  newVehicleSwarm(mouseX, mouseY);
}

function keyPressed() {
  if (key == 'd') {
    debug = !debug;
  }
}

function swarmGui() {

  swarmGui = QuickSettings.create(0, barHeight, "Swarm")

    .hide()
    .setCollapsible(true)
    .setDraggable(true)
    .setWidth(140)
    .addHTML("TitleF", "Hold and drag to add more creatures")
    .addButton("Randomize", function() {
      swarmRandom()
    })

    .addRange("Creatures", 10, 600, 300, 5, function(value) {
      creatures = value;
      resetter()
    })
    .addRange("Size", 1, 30, 12, 1, function(value) {
      cSize = value;
      resetter()
    })
    .addBoolean("Homogenous", true, function(value) {
      rSizeFl = value;
      resetter()
    })
    .addRange("Speed", 0.5, 40, 10, 0.5, function(value) {
      speedFl = value;
      resetter()
    })
    .addRange("Discipline", 1, 50, 15, 1, function(value) {
      disFl = map(value, 1, 50, 50, 1);
      resetter()
    })
    // .addRange("Tolerance", 0, 50, 1, 1, function(value) {
    //   dFl = map(value, 0, 50, 0.00001, 3000)
    //   resetter()
    // })
    .addBoolean("Aim", false, function(value) {
      debug = value;
      // resetter()
    })
    .addButton("Reset", function() {
      resetter()
    })

  swarmGui.hideTitle("TitleF")
  swarmGui.overrideStyle("Reset", 'width', '130px');
  swarmGui.overrideStyle("Randomize", 'width', '130px');

}



function swarmRandom() {

  swarmGui.setBoolean("Homogenous", random() >= 0.5)
  swarmGui.setRangeValue("Creatures", random(10, 600))
  swarmGui.setRangeValue("Size", random(3, 30))
  swarmGui.setRangeValue("Speed", random(0.5, 20))
  swarmGui.setRangeValue("Discipline", random(1, 50))
  control.setRangeValue("Density", random(0.01, 0.10))
  control.setRangeValue("Trail", random(0, 250))
  resetter()

}

let dFl = 50
let rSizeFl = true
let cSize = 12
let path;
let vehiclesSwarm = [];
let pointsFl
let textDensityFl
let creatures = 300
let speedFl = 10
let attrFl = 0.5
let disFl = 20
debug = false