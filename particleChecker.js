let pSize = 20
let pRandomSize = 19
let windDirection = 0
let antiGravity = false
let pGravity
let pSpeed = 1
let gDirection = 0.05
let pRandomSizeF
let plifeSpan = 24
let systems = [];
let ps;

function resetParticle() {

  systems.splice(ps)
  pRandomSizeF = map(particlegui.getRangeValue("Variation"), 0, 99, pSize, 0)

  fonter()

  for (let i = 0; i < points.length - nexter; i++) {
    pt = points[i]
    systems[i] = new ParticleSystem(createVector(pt.x, pt.y))
  }
}

function particleChecker() {

  particleShower()

  pGravity = createVector(windDirection, gDirection);

  for (let ps of systems) {

    ps.applyForce(pGravity);
    ps.addParticle();
    ps.run();
  }
}




////////////////// GUI ////////////////

function particleGui() {

  particlegui = QuickSettings.create(0, barHeight, "Particles")

    .hide()
    .setCollapsible(true)
    .setDraggable(true)
    .setWidth(140)
    .addButton("Randomize", function() {
      partRandom()
    })
    .addRange("Particle Speed", 0.1, 2, 1, 0.1, function(value) {
      pSpeed = value;
    })
    .addRange("Size", 0.5, 60, 10, 0.5, function(value) {
      pSize = value;
    })
    .addRange("Lifespan", 5, 50, 25, 0.5, function(value) {
      // plifeSpan = map(value, 5, 50, pSpeed * -2, 5);
      plifeSpan = value
    })
    .addRange("Variation", 0, 99, 70, 0.5, function(value) {
      pRandomSize = value;
    })
    .addRange("Wind Direction", -100, 100, 0, 0.01, function(value) {
      windDirection = value;
    })
    .addRange("Gravity Strength", -100, 50, 0.05, 0.01, function(value) {
      gDirection = value;
      // resetter()
    })
    .addButton("Reset", function() {
      resetter()
    })


  particlegui.overrideStyle("Reset", 'width', '130px');
  particlegui.overrideStyle("Randomize", 'width', '130px');

}

function partRandom() {

  particlegui.setBoolean("Particle Speed", random() >= 0.5)
  particlegui.setRangeValue("Particle Speed", random(0.1, 1))
  particlegui.setRangeValue("Size", random(1, 60))
  particlegui.setRangeValue("Lifespan", random(5, 50))
  particlegui.setRangeValue("Variation", random(0, 99))

  control.setRangeValue("Density", random(0.01, 0.10))
  control.setRangeValue("Trail", random(0, 250))
  resetter()

  particlegui.setRangeValue("Wind Direction", random(-25, 25))
  particlegui.setRangeValue("Gravity Strength", random(-25, 12))


}