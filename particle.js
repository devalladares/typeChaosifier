class Particle {
  constructor(position) {
    this.acceleration = createVector(0, -0.5);
    this.velocity = createVector(random(5, 2), random(-5, 5));
    this.position = position.copy();
    this.lifespan = 255;
    this.r = random(pRandomSizeF, pSize)
    this.xSpeed = random(-10, 10);
    this.ySpeed = random(-10, 10);
    this.speed = createVector(0, 0);
    this.topspeed = 8;
  }

  run() {
    if (!allChaos) {
      this.update();
    } else {
      this.moveParticle()
    }
    this.display();
  }

  applyForce(force) {
    let f = force.copy()
    f.div(this.r)
    this.acceleration.add(f)
  }

  moveParticle() {
    // if (this.position.x < 0 || this.position.x > width)
    //   this.xSpeed *= -1;
    // if (this.position.y < 0 || this.position.y > height)
    //   this.ySpeed *= -1;
    this.position.x += this.xSpeed * pSpeed;
    this.position.y += this.ySpeed * pSpeed;
    this.lifespan -= plifeSpan;
  }

  update() {
    this.velocity.mult(pSpeed)
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= plifeSpan;
  }

  display() {
    noStroke()
    let pFill = color(fillColor);
    pFill.setAlpha(this.lifespan)
    fill(pFill)
    ellipse(this.position.x, this.position.y, this.r);
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
    this.particles.push(new Particle(this.origin));
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  applyForce(f) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].applyForce(f);
    }
  }
}