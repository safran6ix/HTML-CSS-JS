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

// Stop camera
stopButton.addEventListener('click', () => {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;

        startButton.disabled = false;
        stopButton.disabled = true;
        captureButton.disabled = true;
    }
});


// Capture photo
captureButton.addEventListener('click', () => {
    if (!stream) return;

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/png');

    // Create and display thumbnail
    const img = document.createElement('img');
    img.src = imageDataUrl;
    photosContainer.appendChild(img);

    // You could also download the image or send it to a server here
});

// Initialize button states
stopButton.disabled = true;
captureButton.disabled = true;