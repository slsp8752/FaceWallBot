console.log("TEST");
Webcam.attach( '#my_camera' );

function take_snapshot() {
	Webcam.snap( function(data_uri) {
		console.log(data_uri);
	} );
}
