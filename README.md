![Facewall Studio Logo](images/logo.png)

# Facewall Studio

Facewall Studio is a tool for labeling and printing photos of faces. It's used to maintain a physical database of BTU Lab members. Instead of tasking a single person to label every person's photo with their name and affiliation, each member is in control of their photo and respective labels, getting rid of needless busy-work!

## Setup

### Preamble
Facewall Studio is built as a web app, with the original intention to be wrapped with [Electron](https://electron.atom.io/) to turn it into a desktop app. In it's current state, Electron is not used. Instead a startup script is used to host the app via python's SimpleHTTPServer on startup. Ideally this is a temporary solution.

### Dependencies
Facewall Studio's only dependency is Python, if you intend to run it as described below. Otherwise, you can host it as a regular webpage.

### Running Facewall Studio
You can run Facewall Studio locally by running the following in the main directory:

 ```shell
python -m SimpleHTTPServer
 ```

### Startup Script

To have Facewall Studio accessible without always running the SimpleHTTPServer command, a startup script (startup.sh) is used.

To run this at startup on OSX, place com.facewallstudio.app.plist in the /Library/LaunchDaemons directory. You'll need to replace line 10 (/PATH/TO/STARTUP.SH) [with the path to startup.sh

## Usage

Open a web browser (Facewall Studio was mainly tested in Google Chrome) and navigate to localhost:8000 (or another port number, if you specified one in startup.sh)

After pressing the "Get Started" button, instructions will appear at the bottom of the screen.

## Known Bugs

There is an issue with the taken picture being resized incorrectly for certain webcam resolutions. This has to do with the size of the "camera" div, which is initially hard-coded to 1280x720 at line 29 in studio.html

On the labeling screen, the picture preview isn't centered on the screen.

## Acknowledgments

Facewall Studio was made possible by the following frameworks and libraries:

[Bootstrap](http://getbootstrap.com/)

[FabricJS](http://fabricjs.com/)

[WebcamJS](https://github.com/jhuckaby/webcamjs)
