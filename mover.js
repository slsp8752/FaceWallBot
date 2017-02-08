var img = new Image();
img.src = "dog.jpg"; 
var canvas = new fabric.Canvas("canvas");

function showfield(name){
  if(name=='Other')document.getElementById('div1').innerHTML='Other: <input type="text" name="other" />';
  else document.getElementById('div1').innerHTML='';
}

function render(){
	canvas.setWidth(img.width);
	canvas.setHeight(img.height);
	canvas.renderAll();
}

//TODO: Add second text box
//		Make dropdown for Majors
//		change font
//		Save button
//		Download button

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

	var $major = document.getElementById('major');
	var $name = document.getElementById('name');
	$major.value = "Your Major Here";
	$name.value = "Your Name Here";

	$name.addEventListener("keyup", function(){
		console.log(this.value);
		movingBox2.setText(this.value);
		canvas.renderAll();
	}, false);

	$major.addEventListener("keyup", function(){
		console.log(this.value);
		movingBox.setText(this.value);
		canvas.renderAll();
	}, false);

	var movingBox = new fabric.Text("",{//fabric.Rect({
		fontFamily: 'ocr',
		backgroundColor: "white",
		lockMovementX: true,
		lockMovementY: true,
		hasBorders: true,
		hasControls: false,
		originX: 'center',
		originY: 'bottom',
		top: img.height - 20,
		left: img.width/2
	});

	var movingBox2 = new fabric.Text("",{//fabric.Rect({
		fontFamily: 'ocr',
		backgroundColor: "white",
		lockMovementX: true,
		lockMovementY: true,
		hasBorders: false,
		hasControls: false,
		originX: 'center',
		top: 20,
		left: img.width/2
	});

	canvas.on("object:moving", function() {
	  var top = movingBox.top;
	  var bottom = top + movingBox.height;
	  var left = movingBox.left;
	  var right = left + movingBox.width;

      var top2 = movingBox2.top;
	  var bottom2 = top2 + movingBox2.height;
	  var left2 = movingBox2.left;
	  var right2 = left2 + movingBox2.width;

	  var topBound = boundingBox.top;
	  var bottomBound = topBound + boundingBox.height;
	  var leftBound = boundingBox.left;
	  var rightBound = leftBound + boundingBox.width;

	  movingBox.setLeft(Math.min(Math.max(left, leftBound), rightBound - movingBox.width));
	  movingBox2.setLeft(Math.min(Math.max(left2, leftBound), rightBound - movingBox.width));
	  movingBox.setTop(Math.min(Math.max(top, topBound), bottomBound - movingBox.height));
	  movingBox2.setTop(Math.min(Math.max(top2, topBound), bottomBound - movingBox.height));
});

	canvas.add(boundingBox);
	canvas.add(movingBox);
	canvas.add(movingBox2);
//var x = document.createElement("INPUT");
//x.setAttribute("type", "text");
//x.setAttribute("value", "Hello World!");
//x.setAttribute("id", "majorInp");
//x.setAttribute("onkeyup", "updateText(this);");



};

