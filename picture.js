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
                    var withHypeh = wordOverlap + "-";

                    if (context.measureText(withHypeh).width >= maxW) {
                        // add hyphen when splitting a word
                        withHypeh = wordOverlap.substr(0, wordOverlap.length - 2) + "-";
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
