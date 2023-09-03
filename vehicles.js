class Vehicle {

  constructor(x, y, ss, nx, ny, rndm, sw, mxs, mxf, op, lrp, iVal, sinSpeed, sinAmt) {

    this.pos = createVector(x, y)
    this.posOG = createVector(x, y)
    this.target = createVector(nx, ny)
    this.acc = createVector()
    this.vel = createVector()
    this.mass = random(rndm, ss)
    this.r = sqrt(this.mass) * 10
    this.maxspeed = mxs
    this.maxforce = mxf
    this.nextPoint = createVector(nx, ny)
    this.stroke = sw
    this.opacity = op
    this.lrp = lrp
    this.i = iVal
    this.sinSpeed = sinSpeed
    this.sinAmt = sinAmt

    this.startAngle = 0.1;
    this.angleVel = 0.1;
  }

  //CIRCLE ORIGINAL
  show1(i) {
    stroke(strokeColor)
    fill(fillColor)
    strokeWeight(this.stroke)

 
    if (sinwWaver === true) {
      this.sinAmtMapped = map(this.sinAmt, 0, 100, 0, this.r)
      this.sinSpeed2 = map(this.sinSpeed, 0, 20, 20, 1)

      this.rSin = this.r + sin(this.i + frameCount / this.sinSpeed2) * this.sinAmtMapped
      ellipse(this.pos.x, this.pos.y, this.rSin)
    } else {
      ellipse(this.pos.x , this.pos.y, this.r)
    }
  }

  //RECT ORIGINAL
  show2() {
    stroke(strokeColor)
    fill(fillColor)
    strokeWeight(this.stroke)

    if (sinwWaver === true) {
      this.sinAmtMapped = map(this.sinAmt, 0, 100, 0, this.r)
      this.sinSpeed2 = map(this.sinSpeed, 0, 20, 20, 1)

      this.rSin = this.r + sin(this.i + frameCount / this.sinSpeed2) * this.sinAmtMapped
      rect(this.pos.x, this.pos.y, this.rSin, this.rSin)
    } else {
      rect(this.pos.x, this.pos.y, this.r, this.r)
    }
  }

  //LINE ORIGINAL
  show3() {
    if (strokeSquarer === true) {
      strokeCap(SQUARE)
    } else {
      strokeCap(ROUND)
    }

    let strokeCa = color(strokeColor)
    strokeCa.setAlpha(this.opacity)
    stroke(strokeCa)


    noFill()
    strokeWeight(this.stroke)
    this.sinAmtMapped = map(this.sinAmt, 0, 100, 0, this.r)
    this.sinSpeed2 = map(this.sinSpeed, 0, 20, 20, 0)

    this.rSinX = this.pos.x + sin(this.i + frameCount / this.sinSpeed2) * this.sinAmtMapped
    this.rSinY = this.pos.y + sin(this.i + frameCount / this.sinSpeed2) * this.sinAmtMapped

    this.lerpX = lerp(this.pos.x, this.nextPoint.x, this.lrp)
    this.lerpY = lerp(this.pos.y, this.nextPoint.y, this.lrp)

    if (sinwWaver === true) {
      line(this.rSinX, this.rSinY, this.lerpX, this.lerpY)
    } else {
      line(this.pos.x, this.pos.y, this.lerpX, this.lerpY)
    }
  }

  update() {
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
  }

  behaviors() {
    let arrive = this.arrive(this.target)
    this.applyForce(arrive);
  }

  mover(ix, iy) {
    this.target.set(ix, iy)
  }

  flee(target) {

    let desired = p5.Vector.sub(target, this.pos)
    let d = desired.mag()
    if (d < 100 && mouselove === true && mouser === true) {
      desired.setMag(this.maxspeed / 2)
      desired.mult(5)
      let steer = p5.Vector.sub(desired, this.vel)
      steer.limit(this.maxforce)
      return steer
    } else if (d < 200 && mouselove === false && mouser === true) {
      desired.setMag(this.maxspeed)
      desired.mult(-2)
      let steer = p5.Vector.sub(desired, this.vel)
      steer.limit(this.maxforce)
      return steer
    } else {
      return createVector(0, 0)
    }
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos)
    let d = desired.mag()
    let speed = this.maxspeed
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed)
    }
    desired.setMag(speed)
    let steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxforce)
    return steer
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass)
    // f.div(1.5)
    this.acc.add(f)
  }

  edges() {
    if (this.pos.y >= height - this.r / 2) {
      this.pos.y = height - this.r / 1.9
      this.vel.y *= -1
    }
    if (this.pos.x >= width - this.r / 2) {
      this.pos.x = width - this.r / 1.9
      this.vel.x *= -1
    }
    if (this.pos.y <= 0 + this.r / 2) {
      this.pos.y = 0 + this.r / 1.9
      this.vel.y *= -1
    }
    if (this.pos.x <= 0 + this.r / 2) {
      this.pos.x = 0 + this.r / 1.9
      this.vel.x *= -1
    }
  }

  fleeboi() {
    let mouse = createVector(mouseX, mouseY)
    let flee = this.flee(mouse)
    flee.mult(5)
    this.applyForce(flee);
  }

  friction() {
    let diff = height - (this.pos.y + this.r)
    if (diff < 1) {
      let friction = this.vel.copy();
      friction.normalize()
      friction.mult(-1)
      let mu = 0.4
      let normal = this.mass
      friction.setMag(mu * normal)
      this.applyForce(friction)
    }
  }

  frictionR() {
    let diff = this.pos.y - this.r
    if (diff < 1) {
      let friction = this.vel.copy();
      friction.normalize()
      friction.mult(-1)
      let mu = 0.8
      let normal = this.mass
      friction.setMag(mu * normal)
      this.applyForce(friction)
    }
  }

  drag() {

    let drag = this.vel.copy();
    drag.normalize()
    drag.mult(-1)

    let c = 0.1
    let speedSq = this.vel.magSq()
    let surfaceArea = this.r * 0.05

    drag.setMag(c * speedSq * surfaceArea)

    this.applyForce(drag)

  }

}