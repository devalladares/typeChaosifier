function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  gui()
  fonter()
  resetVehicle()
  resetBranch()
  resetParticle()
  resetJelly()
  resetRain()
  resetSpace()
  resetSwarm()
}

function draw() {

  bgbg = color(bgColor);
  bgbg.setAlpha(tAlpha);
  background(bgbg)

  if (list1.value() == 'Particles') {
    particleChecker()
  } else if (list1.value() == 'Mesh' || list1.value() == 'Orbit') {
    vehicleChecker()
  } else if (list1.value() == 'Fractals') {
    branchChecker()
  } else if (list1.value() == 'Jellyfish') {
    jellyChecker()
  } else if (list1.value() == 'Rain') {
    rainChecker()
  } else if (list1.value() == 'Space') {
    spaceChecker()
  } else if (list1.value() == 'Swarm') {
    swarmChecker()
  }
  list1.changed(listChanger);
}

function listChanger() {
  resetter()
  if (list1.value() == 'Space' || list1.value() == 'Particles') {
    tAlpha = 50
  } else {
    tAlpha = tAlpha2
  }
}

function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}