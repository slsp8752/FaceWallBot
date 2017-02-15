var img = new Image();
var img_uri;
Webcam.attach('#camera');
function take_snapshot(){
	Webcam.snap(function(data_uri){
		img_uri = data_uri;
		console.log(data_uri);
	});
}
img.src = "dog.jpg"; 
var canvas = new fabric.Canvas("canvas");

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
		console.log(testOverlap);
		console.log(w);

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

function showfield(name){
  if(name=='Other')document.getElementById('div1').innerHTML='Other: <input type="text" name="other" />';
  else document.getElementById('div1').innerHTML='';
}

function render(){
	canvas.setWidth(img.width);
	canvas.setHeight(img.height);
	canvas.renderAll();
}

//TODO:
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

	var textSample = new fabric.Text(wrapCanvasText("", canvas, 100, img.height/4), {
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

	var nameText = new fabric.Text(wrapCanvasText("", canvas, 100, img.height/4), {
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
		activeObject.text = wrapCanvasText($name.value, canvas, 100, img.height/4);
		canvas.renderAll();
	}, false);

	$major.addEventListener("keyup", function(){
        canvas.setActiveObject(textSample);
		var activeObject = canvas.getActiveObject();
		activeObject.text = wrapCanvasText($major.value, canvas, 100, img.height/4);
		canvas.renderAll();
		
    
	}, false);

	canvas.add(boundingBox);

};

