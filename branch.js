class Branch {

  constructor(begin, end) {
    this.pos = begin
    this.nextPoint = end
    this.len = multer
    this.vel = p5.Vector.random2D()
  }

  show(i) {
     line(this.pos.x, this.pos.y, this.nextPoint.x, this.nextPoint.y)
  }

  jitter() {
    this.nextPoint.x += -random(-1, 1)
    this.nextPoint.y += -random(-1, 1)
  }
  
    mover(i) {
    this.i = i
    this.nextPoint.x += sin(this.i + frameCount / 10) / 5
  }

  angler(f) {
    this.angle = f
  }

  branchA() {
    let dir = p5.Vector.sub(this.nextPoint, this.pos)

    switch (fractals.getDropDownValue("Direction").value) {
      case 'Both':
        dir.rotate(this.angle)
        break;
      case 'Inwards':
        dir.rotate(this.angle)
        break;
      case 'Outwards':
        dir.rotate(this.angle-this.angle)
        break;
    }
     
    dir.mult(this.len)
    let newEnd = p5.Vector.add(this.nextPoint, dir)
    let a = new Branch(this.nextPoint, newEnd)
    return a
  }

  branchB() {
    let dir = p5.Vector.sub(this.nextPoint, this.pos)
    
    switch (fractals.getDropDownValue("Direction").value) {
      case 'Both':
        dir.rotate(-this.angle)
        break;
      case 'Inwards':
        dir.rotate(-this.angle+this.angle)
        break;
      case 'Outwards':
        dir.rotate(-this.angle-this.angle)
        break;
    }
    
    dir.mult(this.len)
    let newEnd = p5.Vector.add(this.nextPoint, dir)
    let b = new Branch(this.nextPoint, newEnd)
    return b
  }
  
   update() {
    this.pos.add(this.vel)
     this.vel.mult(0)
  }
  
}

