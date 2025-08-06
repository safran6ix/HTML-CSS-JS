// DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const captureButton = document.getElementById('captureButton');
const photosContainer = document.getElementById('photos');

let stream = null;

// Start camera
startButton.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
        video.srcObject = stream;

        startButton.disabled = true;
        stopButton.disabled = false;
        captureButton.disabled = false;
    } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access the camera. Please ensure you've granted permission.");
    }
});