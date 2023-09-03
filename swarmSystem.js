class Path {

  constructor() {
    this.radius = disFl;
    this.points = [];
  }
  addPoint(x, y) {
    let point = createVector(x, y);
    this.points.push(point);
  }
}

class VehicleSwarm {

  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    if (!rSizeFl) {
      this.r = random(cSize, 1);
    } else {
      this.r = cSize
    }

    this.maxspeed = ms;
    this.maxforce = mf;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(this.maxspeed, 0);
  }

  // A function to deal with path following and separation
  applyBehaviors(vehiclesSwarm, path) {
    // Follow path force
    let f = this.follow(path);
    // Separate from other boids force
    let s = this.separate(vehiclesSwarm);
    // Arbitrary weighting
    f.mult(3);
    s.mult(1);
    // Accumulate in acceleration
    this.applyForce(f);
    this.applyForce(s);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  run() {
    this.update();
    this.render();
  }

  follow(path) {
    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(10);
    let predictpos = p5.Vector.add(this.position, predict);

    let normal = null;
    let target = null;
    let worldRecord = 100000;
    if (!allChaos) {
    worldRecord = 100000;
  }
  else {
    worldRecord = 20;
  }

  for (let i = 0; i < path.points.length; i++) {

    let a = path.points[i];
    let b = path.points[(i + 1) % path.points.length]; // Note Path has to wraparound

    let normalPoint = getNormalPoint(predictpos, a, b);

    let dir = p5.Vector.sub(b, a);

    if (normalPoint.x < min(a.x, b.x) || normalPoint.x > max(a.x, b.x) || normalPoint.y < min(a.y, b.y) || normalPoint.y > max(a.y, b.y)) {
      normalPoint = b.copy();

      a = path.points[(i + 1) % path.points.length];
      b = path.points[(i + 2) % path.points.length]; // Path wraps around
      dir = p5.Vector.sub(b, a);
    }

    let d = p5.Vector.dist(predictpos, normalPoint);
    if (d < worldRecord) {
      worldRecord = d;
      normal = normalPoint;
      dir.normalize();

      dir.mult(25);
      target = normal.copy();
      target.add(dir);
    }
  }

  if (debug) {
    stroke(strokeColor)
    fill(strokeColor)
    line(this.position.x, this.position.y, predictpos.x, predictpos.y);
    ellipse(predictpos.x, predictpos.y, 4, 4);

    // Draw   position
    stroke(strokeColor)
    fill(strokeColor)
    ellipse(normal.x, normal.y, 4, 4);
    // Draw actual target (red if steering towards it)
    line(predictpos.x, predictpos.y, target.x, target.y);
    if (worldRecord > path.radius) fill(255, 0, 0);
    noStroke();
    ellipse(target.x, target.y, 8, 8);
  }

  // Only if the distance is greater than the path's radius do we bother to steer
  if (worldRecord > path.radius) {
    return this.seek(target);
  } else {
    return createVector(0, 0);
  }
}

// Separation
// Method checks for nearby boids and steers away
separate(boids) {

  let desiredseparation = this.r * 2;

  let steer = createVector(0, 0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let other = boids[i];
    let d = p5.Vector.dist(this.position, other.position);

    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, other.position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}


// Method to update position
update() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
seek(target) {
  let desired = p5.Vector.sub(target, this.position); // A vector pointing from the position to the target

  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Vepositionity
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force

  return steer;
}

render() {
  // Simpler boid is just a circle
  fill(fillColor)
  // stroke(0);
  noStroke()
  push();
  translate(this.position.x, this.position.y);
  ellipse(0, 0, this.r, this.r);
  pop();
}
}

// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, b) {
  // Vector from a to p
  let ap = p5.Vector.sub(p, a);
  // Vector from a to b
  let ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}