
document.addEventListener('DOMContentLoaded', function () {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // File upload functionality for encoding
    const encodeUploadArea = document.getElementById('encode-upload');
    const encodeFileInput = document.getElementById('encode-file');
    const encodePreview = document.getElementById('encode-preview');
    const originalImage = document.getElementById('original-image');

    encodeUploadArea.addEventListener('click', () => {
        encodeFileInput.click();
    });

    encodeUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        encodeUploadArea.style.backgroundColor = '#f0f7ff';
    });

    encodeUploadArea.addEventListener('dragleave', () => {
        encodeUploadArea.style.backgroundColor = '';
    });

    encodeUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        encodeUploadArea.style.backgroundColor = '';

        if (e.dataTransfer.files.length) {
            encodeFileInput.files = e.dataTransfer.files;
            handleEncodeFileSelect(e.dataTransfer.files[0]);
        }
    });

    encodeFileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            handleEncodeFileSelect(this.files[0]);
        }
    });

    function handleEncodeFileSelect(file) {
        if (!file.type.match('image.*')) {
            showMessage('encode-message', 'Please select a valid image file.', 'error');
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            originalImage.src = e.target.result;
            encodePreview.classList.remove('hidden');
            showMessage('encode-message', 'Image loaded successfully. Now enter your secret message and click "Encode Message".', 'success');
        };

        reader.readAsDataURL(file);
    }

    // File upload functionality for decoding
    const decodeUploadArea = document.getElementById('decode-upload');
    const decodeFileInput = document.getElementById('decode-file');
    const decodePreview = document.getElementById('decode-preview');
    const encodedImagePreview = document.getElementById('encoded-image-preview');

    decodeUploadArea.addEventListener('click', () => {
        decodeFileInput.click();
    });

    decodeUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        decodeUploadArea.style.backgroundColor = '#f0f7ff';
    });

    decodeUploadArea.addEventListener('dragleave', () => {
        decodeUploadArea.style.backgroundColor = '';
    });

    decodeUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        decodeUploadArea.style.backgroundColor = '';

        if (e.dataTransfer.files.length) {
            decodeFileInput.files = e.dataTransfer.files;
            handleDecodeFileSelect(e.dataTransfer.files[0]);
        }
    });

    decodeFileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            handleDecodeFileSelect(this.files[0]);
        }
    });

    function handleDecodeFileSelect(file) {
        if (!file.type.match('image.*')) {
            showMessage('decode-message', 'Please select a valid image file.', 'error');
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            encodedImagePreview.src = e.target.result;
            decodePreview.classList.remove('hidden');
            showMessage('decode-message', 'Image loaded successfully. Click "Decode Message" to extract the hidden text.', 'success');
        };

        reader.readAsDataURL(file);
    }

    // Encode button functionality
    const encodeBtn = document.getElementById('encode-btn');
    const downloadEncodedBtn = document.getElementById('download-encoded');
    const secretMessage = document.getElementById('secret-message');
    const encodedImage = document.getElementById('encoded-image');

    encodeBtn.addEventListener('click', function () {
        if (!originalImage.src) {
            showMessage('encode-message', 'Please upload an image first.', 'error');
            return;
        }

        if (!secretMessage.value.trim()) {
            showMessage('encode-message', 'Please enter a secret message to encode.', 'error');
            return;
        }

        encodeMessage(originalImage.src, secretMessage.value);
    });

    // Decode button functionality
    const decodeBtn = document.getElementById('decode-btn');
    const decodedMessage = document.getElementById('decoded-message');

    decodeBtn.addEventListener('click', function () {
        if (!encodedImagePreview.src) {
            showMessage('decode-message', 'Please upload an encoded image first.', 'error');
            return;
        }

        decodeMessage(encodedImagePreview.src);
    });

    // Steganography functions
    function encodeMessage(imageSrc, message) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Add delimiter to mark end of message
            message += "%%%";

            // Convert message to binary
            let binaryMessage = '';
            for (let i = 0; i < message.length; i++) {
                const charCode = message.charCodeAt(i);
                const binaryChar = charCode.toString(2).padStart(8, '0');
                binaryMessage += binaryChar;
            }

            // Check if message fits in image
            if (binaryMessage.length > data.length * 4) {
                showMessage('encode-message', 'Message is too long for this image. Try a shorter message or a larger image.', 'error');
                return;
            }

            // Encode message in image pixels
            let messageIndex = 0;
            for (let i = 0; i < data.length; i += 4) {
                // For each pixel (RGBA), modify the least significant bit
                for (let j = 0; j < 3; j++) { // Only modify RGB, not Alpha
                    if (messageIndex < binaryMessage.length) {
                        // Clear the least significant bit and set it to the message bit
                        data[i + j] = (data[i + j] & 0xFE) | parseInt(binaryMessage[messageIndex]);
                        messageIndex++;
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // Display the encoded image
            encodedImage.src = canvas.toDataURL();

            // Enable download button
            downloadEncodedBtn.disabled = false;
            downloadEncodedBtn.addEventListener('click', function () {
                const link = document.createElement('a');
                link.download = 'encoded-image.png';
                link.href = canvas.toDataURL();
                link.click();
            });

            showMessage('encode-message', 'Message successfully encoded into the image! You can now download the encoded image.', 'success');
        };

        img.src = imageSrc;
    }

    function decodeMessage(imageSrc) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Extract binary message from image
            let binaryMessage = '';
            for (let i = 0; i < data.length; i += 4) {
                for (let j = 0; j < 3; j++) { // Only read from RGB, not Alpha
                    // Get the least significant bit
                    binaryMessage += data[i + j] & 1;
                }
            }

            // Convert binary to text
            let message = '';
            for (let i = 0; i < binaryMessage.length; i += 8) {
                const byte = binaryMessage.substr(i, 8);
                if (byte.length < 8) break;

                const charCode = parseInt(byte, 2);
                const character = String.fromCharCode(charCode);

                // Check for delimiter
                if (message.endsWith('%%%')) {
                    message = message.slice(0, -3);
                    break;
                }

                message += character;
            }

            if (message) {
                decodedMessage.value = message;
                showMessage('decode-message', 'Message successfully decoded from the image!', 'success');
            } else {
                decodedMessage.value = '';
                showMessage('decode-message', 'No hidden message found in this image.', 'error');
            }
        };

        img.src = imageSrc;
    }

    // Utility function to show messages
    function showMessage(elementId, text, type) {
        const messageElement = document.getElementById(elementId);
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }
});
