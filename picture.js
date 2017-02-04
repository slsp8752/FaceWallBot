window.onload = function(){
	//var canvas = document.getElementById("myCanvas");
	var canvas = document.createElement('canvas');
	var context = canvas.getContext("2d");
	var img = new Image();
 
	img.onload = function(){
	var height = img.height;
	var width = img.width;	

	canvas.id = "myCanvas";
	canvas.width = width;
	canvas.height = height;


	context.drawImage(img, 0, 0);
	context.textAlign = "center";
	context.textBaseline="bottom"; 

	var name = "Slaton Spangler";
	var major = "Computer Science";

	var fontSize = 30;
	var font = 'ocr';
	console.log(fontSize + "px " + font);
	context.font = fontSize + "px " + font;
	context.beginPath();
	var majorWidth = context.measureText(major).width;
	var nameWidth = context.measureText(name).width;

	var majorHeightPadding = 10;
	var majorRectPadding = majorHeightPadding + fontSize + 3; //TODO: Remove magic numbers (why 3?)
	var widthPadding = 5;

	var nameHeightPadding = 10;
	var nameRectPadding = nameHeightPadding + fontSize + 3; 

	context.rect(width/2 - majorWidth/2 - 3, height-majorRectPadding, majorWidth + widthPadding, fontSize + widthPadding);
	context.rect(width/2 - nameWidth/2 - 3, 10, nameWidth + 5, fontSize + 5); 

	context.fillStyle = 'white';
	context.fill();
	context.fillStyle = 'black';
	context.textBaseline="bottom"; 
	context.fillText(major, width/2, height-10);
	context.textBaseline="top"; 
	context.fillText(name, width/2, 10);
	cc = document.body.appendChild(canvas);
	cc.download = "Test.png";
	var a = $("<a>").attr("href", cc.toDataURL()).attr("download", "img.png").appendTo("body");
	a[0].click();
	a.remove();
	};
	img.src = "dog.jpg"; 

};
