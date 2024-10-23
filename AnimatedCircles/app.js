var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

// Setting the canvas width to the width of the window
canvas.width = window.innerWidth;
// Setting the canvas height to the height of the window
canvas.height = window.innerHeight;

// x, y, width, height - cube
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(300, 300, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(400, 100, 100, 100);

// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// Arc/Circle x, y, r, startAngle - where would you like to start the arc, endAngle - how long would you like the arc to go on for, drawCounterClockwide: Bool - True or False
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// Using for loop to create multiple circles
// for (var i = 0; i < 100; i++) {
// // Make the circles appear in random places each time
// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// c.beginPath();
// c.arc(x, y, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();
// };

var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 40;
// var minRadius = 2;

var colorArray = [
  '#ffaa33',
  '#99ffaaa',
  '#00ff00',
  '#4411aa',
  '#ff1100',

];

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Defining the circle in a function makes it easier to create multiple circles down the line
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    // A conditional that states once the circle has reached the innerWidth it will move in the opposite direct
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    // A conditonal that states once the has reached the innerHeight it will move in the opposite direction
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
      
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

// Making 100 circles
var circleArray = [];

// Ensures that the circles all spawn within the height and width of the canvas, and also that they spawn in different locations each refresh
for (var i = 0; i < 150; i++) {
  var radius = Math.random() * 3 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = Math.random() - 0.5;
  var dy = Math.random() - 0.5;

  circleArray.push(new Circle(x, y, dx, dy, radius));
}

// Animating the circles
// Getting the objects to move around
function animate() {
  requestAnimationFrame(animate);
  // Clears the canvas each time so the circles on the screen are singular and not worm like
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
