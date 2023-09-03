function resetBranch() {

  count = 0
  nexter2 = 2

  if (strokeSquarer2 === true) {
    strokeCap(SQUARE)

  } else {
    strokeCap(ROUND)
  }

  tree.splice(root)
  leaves.splice(leaf)

  fonter()
}

function branchChecker() {

  strokeWeight(SWF)
  fractalgui()


  let strokeCa = color(strokeColor);
  strokeCa.setAlpha(lineOpacityF)
  stroke(strokeCa)

  for (let i = 0; i < pointsF.length - nexter2; i++) {
    let pt = pointsF[i]
    let pt2 = pointsF[i + 1]
    let pt3 = pointsF[i + 2]
    let pt0 = pointsF[pointsF.length - 1]
    let d1 = dist(pt.x, pt.y, pt2.x, pt2.y)
    let d2 = dist(pt.x, pt.y, pt3.x, pt3.y)

    if (d1 < d2 / 1.2) {

      point1 = createVector(pt.x, pt.y)
      point2 = createVector(pt2.x, pt2.y)
      point3 = createVector(pt3.x, pt3.y)
      point0 = createVector(pt0.x, pt0.y)
      root = new Branch(point1, point2)
    } else {
      // root = new Branch(point0, point1)
    }
    tree[i] = root
  }

  for (let i = tree.length - 1; i >= 0; i--) {

    tree[i].show(i)
    tree[i].angler(fAngle)

    if (staticboi === false) {
      tree[i].mover(i)
    }
    if (allChaos === true & leavesOnly === false) {
      tree[i].jitter()
    }
  }


  if (frameCount % 10 === 0 && count < fLayers) {
    count++

    for (let i = tree.length - 1; i >= 0; i--) {
      if (!tree[i].finished) {

        tree.push(tree[i].branchA())
        tree.push(tree[i].branchB())

        leaf = tree[i].nextPoint.copy()
        leaves.push(leaf)
      }
      tree[i].finished = true
    }
  }

  for (let i = 0; i < leaves.length; i++) {
    if (leaveBois === true) {
      if (fractals.getBoolean("Leaf Stroke") === false) {
        noStroke()
      } else {
        strokeWeight(SWF / 2)
      }
      fill(fillColor)

      ellipse(leaves[i].x, leaves[i].y, TextSize / 200)

      if (allChaos === true) {
        let leaveMover = 0.5
        if (i % 8 === 0) {
          leaves[i].x += random(0.1, leaveMover)
          leaves[i].y += random(leaveMover, 0.1)
        } else if (i % 8 === 1) {
          leaves[i].x += random(leaveMover, 0.1)
          leaves[i].y += random(-leaveMover, 0.1)
        } else if (i % 8 === 2) {
          leaves[i].x += random(0.1, -leaveMover)
          leaves[i].y += random(leaveMover, 0.1)
        } else if (i % 8 === 3) {
          leaves[i].x += random(-leaveMover, 0.1)
          leaves[i].y += random(0.1, -leaveMover)
        } else if (i % 8 === 4) {
          leaves[i].x += random(0.1, leaveMover * 2)
          leaves[i].y += random(leaveMover / 2, 0.1)
        } else if (i % 8 === 5) {
          leaves[i].x += random(leaveMover * 2, 0.1)
          leaves[i].y += random(-leaveMover / 2, 0.1)
        } else if (i % 8 === 6) {
          leaves[i].x += random(0.1, -leaveMover * 2)
          leaves[i].y += random(leaveMover / 2, 0.1)
        } else if (i % 8 === 7) {
          leaves[i].x += random(-leaveMover / 2, 0.1)
          leaves[i].y += random(0.1, -leaveMover * 2)
        }
      }
    }
  }
}

function fractalGui() {

  fractals = QuickSettings.create(0, barHeight, "Fractal")

    .hide()
    .setCollapsible(true)
    .setDraggable(true)
    .setWidth(140)
    .addButton("Randomize", function() {
      fractalRandom()
    })
    .addRange("Angle", 0, PI, PI / 8, 0.01, function(value) {
      fAngle = value;
      resetter()
    })
    .addDropDown("Direction", ["Both", "Outwards", "Inwards"], resetter)
    .addRange("Length", 0.1, 1, 0.6, 0.1, function(value) {
      multer = value;
      resetter()
    })
    .addRange("Layers", 0, 7, 5, 1, function(value) {
      fLayers = value;
      resetter()
    })
    .addBoolean("Leaves", false, function(value) {
      leaveBois = value;
      fractals.showControl("Leaf Stroke")
      chaosify.showControl("Leaves Only")
      resetter()
    })
    .addBoolean("Leaf Stroke", false, function(value) {})
    .addRange("Stroke Weight", 0, 10, 1.5, 0.1, function(value) {
      SWF = value
    })
    .addBoolean("Square Caps", true, function(value) {
      strokeSquarer2 = value;
      resetter()
    })
    .addRange("Opacity", 0, 255, 50, 1, function(value) {
      lineOpacityF = value
    })
    .addButton("Reset", function() {
      resetter()
    })
    .hideControl("Leaf Stroke")
    .showControl("Stroke Weight")

  fractals.overrideStyle("Reset", 'width', '130px');
  fractals.overrideStyle("Randomize", 'width', '130px');
}

function fractalRandom() {

  fractals.setBoolean("Leaves", random() >= 0.5)
  fractals.setBoolean("Leaf Stroke", random() >= 0.5)
  fractals.setBoolean("Square Caps", random() >= 0.5)
  fractals.setRangeValue("Angle", random(0, PI))
  fractals.setDropDownIndex("Direction", round(random(0, 2)))
  fractals.setRangeValue("Length", random(0.3, 0.7))
  fractals.setRangeValue("Layers", random(1, 7))
  fractals.setRangeValue("Stroke Weight", random(0.1, 10))
  fractals.setRangeValue("Opacity", random(5, 255))

  control.setRangeValue("Density", random(0.01, 0.10))
  control.setRangeValue("Trail", random(0, 250))
  resetter()

}

let tree = []
let angle = 0;
let root
let leaf
let branch
let count = 0
let leaves = []
let leaver = p5.Vector.random2D()
let fractalDensity