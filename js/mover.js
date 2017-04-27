// Sources
// https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript 
// http://fabricjs.com/
// https://github.com/jhuckaby/webcamjs
// http://jsfiddle.net/illumine/Avvxn/

// TODO:
//		print/save
//		make it look good

//Stretch goals
//		picture upload

var img = new Image();
var img_uri;
Webcam.attach('#camera');

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function cropImage(){
		
	removeElement('retakeButton');
	var image = document.querySelector("#toCrop");
	var cropper = new Cropper(image, {
		dragMode: 'none',
		aspectRatio: 3 / 5,
		autoCropArea: 0.8,
		restore: false,
		guides: false,
		center: false,
		highlight: false,
		zoomable: false,
		cropBoxResizable: false,
		toggleDragModeOnDblclick: false,
	});

	document.getElementById('instructions').innerHTML = '<p class="lead text-center">Move the blue box over your face, and press \"Crop\"!</p>';
	confirmCropHTML = '<input class="btn btn-default" type="button" value="Crop"/>';
	addElement('buttons', 'p', 'confirmCrop', confirmCropHTML); 
	
	document.getElementById("confirmCrop").onclick = function () {
		var croppedCanvas;
		var croppedImage;
		// Crop
		croppedCanvas = cropper.getCroppedCanvas();
		// Show
		croppedImage = document.createElement('img');
		croppedImage.src = croppedCanvas.toDataURL()
		//removeElement('camera');
		//addElement('cropped', 'p', 'finalCanvas', '<canvas id=manvas></canvas>');
		
		document.getElementById("camera").innerHTML = "<canvas id=manvas></canvas>";

		document.getElementById("camera").style.width = "460px";
		document.getElementById("camera").style.height = "768px";
		removeElement('confirmCrop');
		attachCanvas(croppedCanvas.toDataURL());

	}

}

function clearImage(){
	document.getElementById("camera").innerHTML = "";
	document.getElementById('instructions').innerHTML = '<p class="lead text-center">Press the button to take your picture! There will be a 3 second timer before the picture is taken, so you don\'t look like you\'re trying to click a button. </p>';
	Webcam.attach('#camera');
	snapshotButtonHTML = '<input class="btn btn-default" type="button" onclick="take_snapshot();" value="Take Snapshot"/>';
	removeElement('retakeButton');
	addElement('buttons', 'p', 'takeSnapshot', snapshotButtonHTML);
}

function take_snapshot(){
	removeElement("takeSnapshot");

	//replace instructions div with countdown

	var timerDiv = document.createElement('div');
	timerDiv.id = 'timer';
	timerDiv.setAttribute("class", "timer");
    timerDiv.innerHTML = "3";

	document.getElementById('camera').appendChild(timerDiv);
		var $cam = $('video','#camera');
	var $tim = $('.timer');

$tim.css({
    top:$cam.offset().top + (($cam.height()/2) - ($tim.height()/2)),
    left:$cam.offset().left + (($cam.width()/2) - ($tim.width()/2))
});
	var seconds_left = 3;
	var interval = setInterval(function() {
    document.getElementById('timer').innerHTML = --seconds_left;




    if (seconds_left <= 0)
    {
		//replace buttons with accept/reject, replace timer with instructions
		Webcam.snap(function(data_uri){
			img_uri = data_uri;
			document.getElementById('instructions').innerHTML = '<p class="lead text-center">If you\'re happy with your picture, click \"Confirm\". Otherwise, click \"Retake\" to try again!</p>';

			document.getElementById("camera").innerHTML = "<img id=\"toCrop\" src=\"" + data_uri + "\"/>";
			confirm_buttons_html = '<input class="btn btn-default" type="button" value="Confirm" onclick="cropImage();"/> <input class="btn btn-default" type="button" value="Retake" onclick="clearImage();"/>'; 
			addElement('buttons', 'p', 'retakeButton', confirm_buttons_html);
		});

        clearInterval(interval);

    }
	}, 1000);



	}

function attachCanvas(face_uri){
img.src = face_uri; 

var canvas = new fabric.Canvas("manvas"); //create this @ "camera"

function wrapCanvasText(t, canvas, maxW, maxH) {

    if (typeof maxH === "undefined") {
        maxH = 0;
    }

    // var words = t.text.split(" ");
    var words = t.split(" ");
    var formatted = '';

    // clear newlines
    // var sansBreaks = t.text.replace(/(\r\n|\n|\r)/gm, "");  
    var sansBreaks = t.replace(/(\r\n|\n|\r)/gm, "");
    // calc line height
    var lineHeight = new fabric.Text(sansBreaks, {
        fontFamily: t.fontFamily,
        fontSize: 25 //t.fontSize
    }).height;

    // adjust for vertical offset
    var maxHAdjusted = maxH > 0 ? maxH - lineHeight : 0;
    var context = canvas.getContext("2d");

    context.font = t.fontSize + "px " + t.fontFamily;
    var currentLine = "";
    var breakLineCount = 0;

    for (var n = 0; n < words.length; n++) {

        var isNewLine = currentLine == "";
        var testOverlap = currentLine + ' ' + words[n];

        // are we over width?
        var w = context.measureText(testOverlap).width;

        if (w < maxW) { // if not, keep adding words
            currentLine += words[n] + ' ';
            formatted += words[n] += ' ';
        } else {

            // if this hits, we got a word that need to be hypenated
            if (isNewLine) {
                var wordOverlap = "";

                // test word length until its over maxW
                for (var i = 0; i < words[n].length; ++i) {

                    wordOverlap += words[n].charAt(i);
                    var withHypeh = wordOverlap;

                    if (context.measureText(withHypeh).width >= maxW) {
                        // add hyphen when splitting a word
                        withHypeh = wordOverlap.substr(0, wordOverlap.length - 1);
                        // update current word with remainder
                        words[n] = words[n].substr(wordOverlap.length - 1, words[n].length);
                        formatted += withHypeh; // add hypenated word
                        break;
                    }
                }
            }
            n--; // restart cycle
            formatted += '\n';
            breakLineCount++;
            currentLine = "";
        }
        if (maxHAdjusted > 0 && (breakLineCount * lineHeight) > maxHAdjusted) {
            // add ... at the end indicating text was cutoff
            formatted = formatted.substr(0, formatted.length - 3) + "...\n";
            break;
        }
    }
    // get rid of empy newline at the end
    formatted = formatted.substr(0, formatted.length - 1);

    return formatted;
}

function render(){
	canvas.setWidth(img.width);
	canvas.setHeight(img.height);
	canvas.renderAll();
}

function saveCanvas(){
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
	window.location.href=image; // it will save locally
}

img.onload = function(){

	canvas.setBackgroundImage(face_uri, render);

	var boundingBox = new fabric.Rect({
	  fill: 'rgba(0,0,0,0)',
	  width: img.width,
	  height: img.height,
	  hasBorders: false,
	  hasControls: false,
	  lockMovementX: true,
	  lockMovementY: true,
	  evented: false,
	});

	textfieldsHTML = '<div class="row"><div class="col-xs-2 col-md-offset-5"><input type="text" class="form-control" id="name" placeholder="Your Name"> <input type="text" class="form-control" id="major" placeholder="Your Major"></div>';
	saveprintButtonsHTML = '<input class="btn btn-default" type="button" value="Print" onclick="console.log(\'print\');"/> <a href="#" class="btn btn-default" role="button" id="savebutton" download="yourFace.png">Save</a>';

	addElement('buttons', 'p', 'textfields', textfieldsHTML);
	addElement('buttons', 'p', 'print', saveprintButtonsHTML);

	document.getElementById("savebutton").addEventListener("click", function(e){
		var dataURL = canvas.toDataURL('image/png');
		savebutton.href = dataURL;
	});

	document.getElementById('instructions').innerHTML = '<p class="lead text-center cropped-inst">Enter your name and Major in the boxes below then click \"Print\" to print your face, or \"Save\" to save your face to your device.</p>';

	var $major = document.getElementById('major');
	var $name = document.getElementById('name');

	var textSample = new fabric.Text(wrapCanvasText("", canvas, 90, img.height/4), {
		fontFamily: 'ocr',
		backgroundColor: "white",
		lockMovementX: true,
		lockMovementY: true,
		hasBorders: true,
		hasControls: false,
	  	textAlign: "center",
		originX: 'center',
		originY: 'bottom',
		top: img.height - 20,
		left: img.width/2
	});

	var nameText = new fabric.Text(wrapCanvasText("", canvas, 90, img.height/4), {
		fontFamily: 'ocr',
		backgroundColor: "white",
		lockMovementX: true,
		lockMovementY: true,
		hasBorders: false,
		hasControls: false,
	  	textAlign: "center",
		originX: 'center',
		top: 20,
		left: img.width/2
	});

	canvas.add(nameText);
	canvas.add(textSample);
	canvas.renderAll();

	$name.addEventListener("keyup", function(){
		canvas.setActiveObject(nameText);
		var activeObject = canvas.getActiveObject();
		activeObject.text = wrapCanvasText($name.value, canvas, 90, img.height/4);
		canvas.renderAll();
	}, false);

	$major.addEventListener("keyup", function(){
        canvas.setActiveObject(textSample);
		var activeObject = canvas.getActiveObject();
		activeObject.text = wrapCanvasText($major.value, canvas, 90, img.height/4);
		canvas.renderAll();
		
    
	}, false);

	canvas.add(boundingBox);

};
}
