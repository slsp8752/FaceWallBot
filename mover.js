var img = new Image();
img.src = "dog.jpg"; 
var canvas = new fabric.Canvas("canvas");

function render(){
	canvas.setWidth(img.width);
	canvas.setHeight(img.height);
	canvas.renderAll();
}

img.onload = function(){
	canvas.setBackgroundImage("dog.jpg", render);

	var boundingBox = new fabric.Rect({
	  fill: 'rgba(0,0,0,0)',
	  width: img.width,
	  height: img.height,
	  hasBorders: false,
	  hasControls: false,
	  lockMovementX: true,
	  lockMovementY: true,
	  evented: false,
	  stroke: "red"
	});

	var movingBox = new fabric.Rect({
	  width: 100,
	  height: 100,
	  hasBorders: false,
	  hasControls: false,
	  fill: "white"
	});

	canvas.on("object:moving", function() {
	  var top = movingBox.top;
	  var bottom = top + movingBox.height;
	  var left = movingBox.left;
	  var right = left + movingBox.width;

	  var topBound = boundingBox.top;
	  var bottomBound = topBound + boundingBox.height;
	  var leftBound = boundingBox.left;
	  var rightBound = leftBound + boundingBox.width;

	  movingBox.setLeft(Math.min(Math.max(left, leftBound), rightBound - movingBox.width));
	  movingBox.setTop(Math.min(Math.max(top, topBound), bottomBound - movingBox.height));
	});

	canvas.add(boundingBox);
	canvas.add(movingBox);
};
