const canvas = document.getElementById('polygramCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation variables
let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;
let mouseX = 0;
let mouseY = 0;
let autoRotate = true;

// Mouse interaction
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    autoRotate = false;
});

document.addEventListener('mouseleave', () => {
    autoRotate = true;
});

// Touch interaction for mobile
document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
    mouseY = (touch.clientY / window.innerHeight) * 2 - 1;
    autoRotate = false;
}, { passive: false });

