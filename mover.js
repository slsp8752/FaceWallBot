var img = new Image();
img.src = "dog.jpg"; 
var canvas = new fabric.Canvas("canvas");

var x = document.createElement("INPUT");
x.setAttribute("type", "text");
x.setAttribute("value", "Hello World!");
x.setAttribute("id", "majorInp");
x.setAttribute("onkeyup", "updateText(this);");



document.body.appendChild(x);
//TODO update canvas text
function updateText(inputElement)
{
    console.log(inputElement.value);
	Bar.setText("my_text");
	canvas.renderAll();

}


function render(){
	canvas.setWidth(img.width);
	canvas.setHeight(img.height);
	canvas.renderAll();
}
//TODO: Make rectangles sized based on text input
//		Draw text
//		Move text with rectangle

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

	var movingBox = new fabric.Text(document.getElementById("majorInp").value,{//fabric.Rect({
		backgroundColor: "white",
		hasBorders: false,
		hasControls: false
	  //width: 100,
	  //height: 100,
	  //hasBorders: false,
	  //hasControls: false,
	  //fill: "white"
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
