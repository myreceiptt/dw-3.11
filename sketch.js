let seeds = [];
let ripples = [];
let pingSounds = [];
let grainLayer;

function fxMinterRandomness(min, max) {
  return $fx.randminter() * (max - min) + min;
}

function fxHashRandomness(min, max) {
  return $fx.rand() * (max - min) + min;
}

function preload() {
  for (let i = 1; i <= $fx.getParam("num_pings"); i++) {
    pingSounds.push(loadSound(`assets/ping${i}.mp3`));
  }
}

function setup() {
  createCanvas(windowWidth - 47, windowHeight - 74);

  grainLayer = createGraphics(width, height);
  grainLayer.noStroke();
  drawGrain();

  for (let i = 0; i < $fx.getParam("num_cells"); i++) {
    let x = fxMinterRandomness(0, width);
    let y = fxHashRandomness(0, height);
    let ukuran = fxMinterRandomness(11, 111);
    let pulseSpeed = fxHashRandomness(0.0011, 0.0111);
    seeds.push(new Seed(x, y, ukuran, pulseSpeed));
  }
}

function draw() {
  background(111);
  image(grainLayer, 0, 0);

  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].display();
    if (ripples[i].isFaded()) {
      ripples.splice(i, 1);
    }
  }

  for (let seed of seeds) {
    seed.update();
    seed.display();
  }
}

function drawGrain() {
  for (let i = 0; i < 1111; i++) {
    let x = fxMinterRandomness(0, width);
    let y = fxHashRandomness(0, height);
    let alpha = fxMinterRandomness(
      $fx.getParam("min_size"),
      $fx.getParam("max_size")
    );
    grainLayer.fill(0, alpha);
    grainLayer.ellipse(x, y, fxHashRandomness(1, 11));
  }
}

$fx.preview();

class Seed {
  constructor(x, y, baseSize, pulseSpeed) {
    this.x = x;
    this.y = y;
    this.baseSize = baseSize;
    this.pulseSize = baseSize;
    this.pulseSpeed = pulseSpeed;
    this.pulseAngle = fxMinterRandomness(0, TWO_PI);
    this.color = fxHashRandomness(0, 255);
    this.xDir = fxMinterRandomness(-1, 1) * 1.1;
    this.yDir = fxHashRandomness(-1, 1) * 1.1;
    this.xOffset = fxMinterRandomness(11, 1111);
    this.yOffset = fxHashRandomness(11, 1111);
  }

  update() {
    this.x += this.xDir + (noise(this.xOffset) - 0.11) * 1.1;
    this.y += this.yDir + (noise(this.yOffset) - 0.11) * 1.1;

    this.xOffset += 0.0111;
    this.yOffset += 0.0111;

    if (this.x - this.baseSize < 0 || this.x + this.baseSize > width)
      this.xDir *= -1;
    this.xDir -= fxMinterRandomness(-0.0011, 0.0011);
    if (this.y - this.baseSize < 0 || this.y + this.baseSize > height)
      this.yDir *= -1;
    this.yDir -= fxHashRandomness(-0.0011, 0.0011);

    this.pulseSize =
      this.baseSize + sin(this.pulseAngle) * (this.baseSize * 0.0011);
    this.pulseAngle += this.pulseSpeed;

    if (this.pulseAngle > TWO_PI) {
      this.pulseAngle = 0;
      ripples.push(new Ripple(this.x, this.y, this.pulseSize * 0.11));
      // Deterministic random index for pingSounds
      let randomIndex = Math.floor(fxMinterRandomness(0, pingSounds.length));
      let randomSound = pingSounds[randomIndex];
      randomSound.play();
    }

    this.x = constrain(this.x, this.baseSize, width - this.baseSize);
    this.y = constrain(this.y, this.baseSize, height - this.baseSize);
  }

  display() {
    push();
    translate(this.x, this.y);

    beginShape();
    let numPoints = 111;
    let deformFactor = 0.11;
    for (let i = 0; i < numPoints; i++) {
      let angle = map(i, 0, numPoints, 0, TWO_PI);
      let offset =
        this.pulseSize * (1 + fxHashRandomness(-deformFactor, deformFactor));
      let vx = cos(angle) * offset;
      let vy = sin(angle) * offset;
      fill(this.color + map(i, 0, numPoints, -11, 11));
      vertex(vx, vy);
    }
    endShape(CLOSE);

    fill(74, 0, 11);
    ellipse(0, 0, this.pulseSize * 0.47);
    pop();
  }
}

class Ripple {
  constructor(x, y, initialRadius) {
    this.x = x;
    this.y = y;
    this.radius = initialRadius;
    this.alpha = 111;
    this.growthRate = 1.11;
  }

  update() {
    this.radius += this.growthRate;
    this.alpha -= 1;
  }

  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(0, 0, 11, this.alpha);
    strokeWeight(4.74);
    ellipse(0, 0, this.radius * 11);
    pop();
  }

  isFaded() {
    return this.alpha <= 0;
  }
}
